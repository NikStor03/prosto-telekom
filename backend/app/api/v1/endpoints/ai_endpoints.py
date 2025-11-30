from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models import Credential, AI, Form, FormFields, Notes
from app.schemas.ai import (
    AICreateData,
    AICreateResponse,
    AIReadByIdResponse,
    AIUpdateData,
    AIDeleteResponse
)

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/create", response_model=AICreateResponse)
def create(data: AICreateData, db: Session = Depends(get_db)):
    try:
        credentials = Credential(
            api_key_instagram=data.crud.api_key_instagram,
            whatsapp_verify_token=data.crud.whatsapp_verify_token,
            whatsapp_token=data.crud.whatsapp_token,
            whatsapp_phone_number_id=data.crud.whatsapp_phone_number_id,
        )
        db.add(credentials)
        db.flush()

        created_forms_ids = []
        first_form_id = None

        for key, form_in in data.form.items():
            form = Form(
                name=form_in.name,
            )
            db.add(form)
            db.flush()

            created_forms_ids.append(form.id)

            if first_form_id is None:
                first_form_id = form.id

            for field_in in form_in.form_fields:
                ff = FormFields(
                    name=field_in.name,
                    value=field_in.value,
                    form_id=form.id
                )
                db.add(ff)

        ai = AI(
            name=data.name,
            credential_id=credentials.id,
            business_id=data.business_id,
            form_id=first_form_id,
        )
        db.add(ai)
        db.flush()

        note = Notes(
            content=data.notes.contents,
            ai_id=ai.id
        )
        db.add(note)

        db.commit()
        db.refresh(ai)

        return AICreateResponse(
            status="success",
            ai_id=ai.id,
            credential_id=credentials.id,
            form_ids=created_forms_ids,
            note_id=note.id,
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create AI: {str(e)}")


@router.get("/read_by_id/{ai_id}", response_model=AIReadByIdResponse)
def read_by_id(ai_id: int, db: Session = Depends(get_db)):
    ai = db.query(AI).filter(AI.id == ai_id).first()

    if not ai:
        raise HTTPException(status_code=404, detail="AI not found")

    return AIReadByIdResponse(
        id=ai.id,
        name=ai.name,
        form_id=ai.form_id,
        credential_id=ai.credential_id,
        business_id=ai.business_id,
    )


@router.get("/read_all_for_business/{business_id}")
def read_all_for_business(business_id: int, db: Session = Depends(get_db)):
    ai_list = db.query(AI).filter(AI.business_id == business_id).all()

    if not ai_list:
        raise HTTPException(status_code=404, detail="No AI found for this business")

    return {
        "total": len(ai_list),
        "ai_list": [
            {
                "id": ai.id,
                "name": ai.name,
                "form_id": ai.form_id,
                "credential_id": ai.credential_id,
                "business_id": ai.business_id,
            }
            for ai in ai_list
        ]
    }


@router.put("/update/{ai_id}")
def update(ai_id: int, data: AIUpdateData, db: Session = Depends(get_db)):
    ai = db.query(AI).filter(AI.id == ai_id).first()

    if not ai:
        raise HTTPException(status_code=404, detail="AI not found")

    try:
        if data.name:
            ai.name = data.name

        if data.crud:
            credential = db.query(Credential).filter(
                Credential.id == ai.credential_id
            ).first()

            if credential:
                if data.crud.api_key_instagram:
                    credential.api_key_instagram = data.crud.api_key_instagram
                if data.crud.whatsapp_verify_token:
                    credential.whatsapp_verify_token = data.crud.whatsapp_verify_token
                if data.crud.whatsapp_token:
                    credential.whatsapp_token = data.crud.whatsapp_token
                if data.crud.whatsapp_phone_number_id:
                    credential.whatsapp_phone_number_id = data.crud.whatsapp_phone_number_id

        if data.notes:
            note = db.query(Notes).filter(Notes.ai_id == ai.id).first()
            if note:
                note.content = data.notes.contents

        db.commit()
        db.refresh(ai)

        return {
            "status": "success",
            "ai_id": ai.id,
            "message": "AI updated successfully"
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to update AI: {str(e)}")


@router.delete("/delete/{ai_id}", response_model=AIDeleteResponse)
def delete(ai_id: int, db: Session = Depends(get_db)):
    ai = db.query(AI).filter(AI.id == ai_id).first()

    if not ai:
        raise HTTPException(status_code=404, detail="AI not found")

    try:
        db.delete(ai)
        db.commit()

        return AIDeleteResponse(
            status="success",
            message=f"AI with id {ai_id} deleted successfully"
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete AI: {str(e)}")
