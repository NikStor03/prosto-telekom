from pydantic import BaseModel
from typing import List, Optional, Dict


class CrudData(BaseModel):
    api_key_instagram: Optional[str]
    whatsapp_verify_token: Optional[str]
    whatsapp_token: Optional[str]
    whatsapp_phone_number_id: Optional[str]


class FormFieldData(BaseModel):
    name: str
    value: Optional[str] = None


class FormData(BaseModel):
    name: str
    form_fields: List[FormFieldData]


class NotesData(BaseModel):
    contents: str


class AICreateData(BaseModel):
    name: str
    type: str
    business_id: int
    crud: CrudData
    form: Dict[str, FormData]
    notes: NotesData
