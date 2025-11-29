from pydantic import BaseModel

class Business(BaseModel):
    credential_id: int
    name: str
    placement: str
    phone_number: str
    website: str


class BusinessCreate(BaseModel):
    name: str
    placement: str
    phone_number: str
    website: str


class BusinessCreateResponse(BaseModel):
    id: int
    name: str
    placement: str
    phone_number: str

class BusinessReadById(BaseModel):
    id: int

class BusinessReadByIdResponse(BaseModel):
    id: int
    name: str
    placement: str
    phone_number: str


    class Config:
        orm_mode = True


class BusinessReadAll(BaseModel):
    hashed_password: str


class BusinessReadAllResponse(BaseModel):
    businesses: list[BusinessReadAll] = []
    total: int = 0