# app/models/credential.py
from __future__ import annotations
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
# from app.models.buisness import Businesses


class Credential(Base):
    __tablename__ = "credentials"

    id: Mapped[int] = mapped_column(primary_key=True)
    api_key_instagram: Mapped[str] = mapped_column(String(255))
    whatsapp_verify_token: Mapped[str] = mapped_column(String(255))
    whatsapp_token: Mapped[str] = mapped_column(String(255))
    whatsapp_phone_number_id: Mapped[str] = mapped_column(String(255))

    # One Credential has one AI
    ai: Mapped["AI"] = relationship(back_populates="credential", uselist=False)