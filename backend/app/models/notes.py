# app/models/notes.py
from __future__ import annotations

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String

from app.db.base import Base
from .ai import AI



class Notes(Base):
    __tablename__ = "notes"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(255), nullable=False)

    # One Note belongs to one AI
    ai: Mapped["AI"] = relationship(back_populates="notes", uselist=False)