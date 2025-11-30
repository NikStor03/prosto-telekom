from pydantic import BaseModel
from typing import Optional, Dict


class CredentialData(BaseModel):
    api_key_instagram: str
    whatsapp_verify_token: str
    whatsapp_token: str
    whatsapp_phone_number_id: str


class FormFieldData(BaseModel):
    name: str
    value: str


class FormData(BaseModel):
    name: str
    form_fields: list[FormFieldData]


class NotesData(BaseModel):
    contents: str


class AICreateData(BaseModel):
    name: str
    business_id: int
    crud: CredentialData
    form: Dict[str, FormData]
    notes: NotesData


class AICreateResponse(BaseModel):
    status: str
    ai_id: int
    credential_id: int
    form_ids: list[int]
    note_id: int


class AIReadByIdResponse(BaseModel):
    id: int
    name: str
    form_id: int
    credential_id: int
    business_id: Optional[int]


class AIUpdateData(BaseModel):
    name: Optional[str] = None
    crud: Optional[CredentialData] = None
    notes: Optional[NotesData] = None


class AIDeleteResponse(BaseModel):
    status: str
    message: str