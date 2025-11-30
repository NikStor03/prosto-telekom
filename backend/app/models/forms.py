from __future__ import annotations
from datetime import datetime, UTC
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, DateTime
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

    answers: Mapped[list["Answers"]] = relationship(
        "Answers",
        back_populates="form",
        cascade="all, delete-orphan"
    )


class FormFields(Base):
    __tablename__ = "formfields"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=True)
    value: Mapped[str] = mapped_column(String(1024), nullable=True)

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

    ai_id: Mapped[int] = mapped_column(ForeignKey("ai.id"))
    ai: Mapped["AI"] = relationship("AI")

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

    answer_id: Mapped[int] = mapped_column(ForeignKey("answers.id"), nullable=False)
    answers: Mapped["Answers"] = relationship("Answers", back_populates="field_answers")

    field_id: Mapped[int] = mapped_column(ForeignKey("formfields.id"), nullable=False)
    field: Mapped["FormFields"] = relationship("FormFields", back_populates="field_answers")