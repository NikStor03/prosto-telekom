from __future__ import annotations
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base


class Credential(Base):
    __tablename__ = "credentials"

    id: Mapped[int] = mapped_column(primary_key=True)
    api_key_instagram: Mapped[str] = mapped_column(String(2048))
    whatsapp_verify_token: Mapped[str] = mapped_column(String(2048))
    whatsapp_token: Mapped[str] = mapped_column(String(2048))
    whatsapp_phone_number_id: Mapped[str] = mapped_column(String(2048))

    ai: Mapped[list["AI"]] = relationship(back_populates="credential")
