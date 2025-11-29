# app/models/form.py
from __future__ import annotations

from datetime import datetime, UTC

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime

from app.models.user import User
from app.db.base import Base
from .customers import Customer
from .ai import AI

class Form(Base):
    __tablename__ = "forms"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    form_fields: Mapped[list["FormFields"]] = relationship(
        "FormFields",
        back_populates="form",
        cascade="all, delete-orphan"
    )

    ai: Mapped["AI"] = relationship("AI", back_populates="form", uselist=False)

    answers: Mapped[list["Answers"]] = relationship(
        "Answers",
        back_populates="form",
        cascade="all, delete-orphan"
    )


class FormFields(Base):
    __tablename__ = "formfields"  # renamed to match ForeignKey

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

    form_id: Mapped[int] = mapped_column(ForeignKey("forms.id"), nullable=False)
    form: Mapped["Form"] = relationship("Form", back_populates="form_fields")

    field_answers: Mapped[list["FieldAnswer"]] = relationship(
        "FieldAnswer",
        back_populates="field",
        cascade="all, delete-orphan"
    )


class Answers(Base):
    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    form_id: Mapped[int] = mapped_column(ForeignKey("forms.id"), nullable=False)
    form: Mapped["Form"] = relationship("Form", back_populates="answers")

    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"), nullable=False)
    customer: Mapped["Customer"] = relationship("Customer", back_populates="answers")

    ai: Mapped["AI"] = relationship("AI", back_populates="form", uselist=False)

    field_answers: Mapped[list["FieldAnswer"]] = relationship(
        "FieldAnswer",
        back_populates="answers",
        cascade="all, delete-orphan"
    )

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(UTC), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(UTC), onupdate=datetime.now(UTC), nullable=False)


class FieldAnswer(Base):
    __tablename__ = "field_answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    value: Mapped[str] = mapped_column(String(255), nullable=False)

    form_id: Mapped[int] = mapped_column(ForeignKey("forms.id"), nullable=False)
    field_id: Mapped[int] = mapped_column(ForeignKey("formfields.id"), nullable=False)

    form: Mapped["Answers"] = relationship("Answers", back_populates="field_answers")
    field: Mapped["FormFields"] = relationship("FormFields", back_populates="field_answers")
