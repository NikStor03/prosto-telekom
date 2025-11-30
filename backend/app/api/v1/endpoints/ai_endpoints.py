from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models import Credential, AI, Form, FormFields, Notes
from app.schemas.ai import AICreateData

router = APIRouter(prefix="/ai")


@router.post("/create")
def create(data: AICreateData, db: Session = Depends(get_db)):
    # ----------------------------------------------------
    # 1. Создаём credentials
    # ----------------------------------------------------
    credentials = Credential(
        api_key_instagram=data.crud.api_key_instagram,
        whatsapp_verify_token=data.crud.whatsapp_verify_token,
        whatsapp_token=data.crud.whatsapp_token,
        whatsapp_phone_number_id=data.crud.whatsapp_phone_number_id,
    )
    db.add(credentials)
    db.flush()

    # ----------------------------------------------------
    # 2. Создаём AI
    # ----------------------------------------------------
    ai = AI(
        name=data.name,
        credential_id=credentials.id,
        business_id=data.business_id,
    )
    db.add(ai)
    db.flush()   # теперь есть ai.id

    # ----------------------------------------------------
    # 3. Создаём формы
    # ----------------------------------------------------
    created_forms_ids = []

    for key, form_in in data.form.items():
        form = Form(
            name=form_in.name,
        )
        db.add(form)
        db.flush()

        created_forms_ids.append(form.id)

        # ----------------------------------------------------
        # 4. Создаём поля формы
        # ----------------------------------------------------
        for field_in in form_in.form_fields:
            ff = FormFields(
                name=field_in.name,
                value=field_in.value,
                form_id=form.id
            )
            db.add(ff)

    # ----------------------------------------------------
    # 5. Создаём заметку
    # ----------------------------------------------------
    note = Notes(
        content=data.notes.contents,
        ai_id=ai.id
    )
    db.add(note)

    # ----------------------------------------------------
    # 6. Сохраняем всё
    # ----------------------------------------------------
    db.commit()

    return {
        "status": "success",
        "ai_id": ai.id,
        "credential_id": credentials.id,
        "form_ids": created_forms_ids,
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