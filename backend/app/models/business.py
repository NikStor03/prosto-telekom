# app/models/users.py
from __future__ import annotations
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.credetials import Credential

from sqlalchemy import Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Businesses(Base):
    __tablename__ = "businesses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    credential_id: Mapped[int] = mapped_column(
        ForeignKey("credentials.id"),
        unique=True
    )
    credential: Mapped["Credential"] = relationship(back_populates="business")

    name: Mapped[str] = mapped_column(String, nullable=False)
    placement: Mapped[str] = mapped_column(String, nullable=False)
    phone_number: Mapped[str] = mapped_column(String, nullable=False)
    website: Mapped[str] = mapped_column(String, nullable=False)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # One business has many customers
    customers: Mapped[list["Customer"]] = relationship(
        back_populates="business",
        cascade="all, delete-orphan"
    )

    # One business has many AI
    ai_items: Mapped[list["AI"]] = relationship(
        back_populates="business",
        cascade="all, delete-orphan"
    )

