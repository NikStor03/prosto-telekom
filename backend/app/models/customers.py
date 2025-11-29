from __future__ import annotations
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    surname: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phone_number: Mapped[str | None] = mapped_column(String(50), nullable=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)

    business_id: Mapped[int] = mapped_column(ForeignKey("businesses.id"), nullable=False)
    business: Mapped["Businesses"] = relationship("Businesses", back_populates="customers")

    answers: Mapped[list["Answers"]] = relationship(
        "Answers",
        back_populates="customer",
        cascade="all, delete-orphan"
    )
