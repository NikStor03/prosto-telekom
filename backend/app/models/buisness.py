from __future__ import annotations

from app.db.base import Base

from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Businesses(Base):
    __tablename__ = "businesses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    id_user: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    placement: Mapped[str] = mapped_column(String, nullable=False)
    phone_number: Mapped[str] = mapped_column(String, nullable=False)
    website: Mapped[str] = mapped_column(String, nullable=False)

    customers: Mapped[list["Customer"]] = relationship(
        "Customer",
        back_populates="business",
        cascade="all, delete-orphan"
    )

    ai_items: Mapped[list["AI"]] = relationship(
        "AI",
        back_populates="business",
        cascade="all, delete-orphan"
    )