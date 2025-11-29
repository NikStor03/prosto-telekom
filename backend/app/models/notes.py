# app/models/notes.py
from __future__ import annotations

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

from app.db.base import Base
from .ai import AI


class Notes(Base):
    __tablename__ = "notes"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(4046), nullable=False)

    # ✅ THE ONLY FK
    ai_id: Mapped[int | None] = mapped_column(ForeignKey("ai.id"), nullable=True)

    ai: Mapped["AI"] = relationship(
        "AI",
        back_populates="notes",
        uselist=False
    )