from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models import Credential, AI, Form, FormFields, Notes
from app.schemas.ai import AICreateData

router = APIRouter(prefix="/ai", tags=["ai"])

@router.post("/create")
def create(data: AICreateData, db: Session = Depends(get_db)):
    credentials = Credential(
        api_key_instagram=data.crud.api_key_instagram,
        whatsapp_verify_token=data.crud.whatsapp_verify_token,
        whatsapp_token=data.crud.whatsapp_token,
        whatsapp_phone_number_id=data.crud.whatsapp_phone_number_id,
    )
    db.add(credentials)
    db.flush()

    first_key = next(iter(data.form))
    form_in = data.form[first_key]

    form = Form(
        name=form_in.name,
    )
    db.add(form)
    db.flush()

    ai = AI(
        name=data.name,
        credential_id=credentials.id,
        business_id=data.business_id,
        form_id=form.id
    )
    db.add(ai)
    db.flush()

    for field_in in form_in.form_fields:
        ff = FormFields(
            name=field_in.name,
            value=field_in.value,
            form_id=form.id,
        )
        db.add(ff)

    note = Notes(
        content=data.notes.contents,
        ai_id=ai.id
    )
    db.add(note)

    db.commit()

    return {
        "status": "success",
        "ai_id": ai.id,
        "form_id": form.id,
        "credential_id": credentials.id,
        "note_id": note.id,
    }


@router.get("/ai/read_by_id")
def read_by_id():
    pass


@router.get("/ai/read_access_token")
def read_access_token():
    pass


@router.get("/ai/update")
def update():
    pass


@router.get("/ai/delete")
def delete():
    pass