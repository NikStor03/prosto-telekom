from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import Mapped

from backend.core.db.setup_database import Base


class UserModel(Base):
    __tablename__ = "users"
    id: Mapped[int] = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email: Mapped[str] = Column(String, unique=True)
    password: Mapped[str] = Column(String)
    disabled: Mapped[bool] = Column(Boolean)

class UserSchema(BaseModel):
    username: str
    email: str | None = None
    disabled: bool | None = None

class UserCreate(UserSchema):
    password: str

class UserInDB(BaseModel):
    username: str
    email: str | None = None
    disabled: bool | None = None
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None



