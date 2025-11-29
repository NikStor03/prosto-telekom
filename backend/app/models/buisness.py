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
    id_user: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    placement: Mapped[str] = mapped_column(String, nullable=False)
    phone_number: Mapped[str] = mapped_column(String, nullable=False)
    website: Mapped[str] = mapped_column(String, nullable=False)

    # One business has many customers
    customers: Mapped[list["Customer"]] = relationship(
        "Customer",  # string name, no import needed
        back_populates="business",
        cascade="all, delete-orphan"
    )

    # One business has many AI items
    ai_items: Mapped[list["AI"]] = relationship(
        "AI",  # string name
        back_populates="business",
        cascade="all, delete-orphan"
    )