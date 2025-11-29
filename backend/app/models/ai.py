# app/models/ai.py
from __future__ import annotations

from sqlalchemy import Integer, String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
# from .forms import Form
# from app.enums.ai import AIType
# from buisness import Businesses
# from .notes import Notes
# from .credetials import Credential

class AI(Base):
    __tablename__ = "ai"

    id: Mapped[int] = mapped_column(primary_key=True)
    # type: Mapped[AIType] = mapped_column(Enum(AIType), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    # Link to Credential (one-to-one)
    credential_id: Mapped[int] = mapped_column(ForeignKey("credentials.id"), unique=True)
    credential: Mapped["Credential"] = relationship(back_populates="ai")

    # Link to Form (one-to-one)
    form_id: Mapped[int] = mapped_column(ForeignKey("forms.id"), nullable=False)
    form: Mapped["Form"] = relationship(back_populates="ai", uselist=False)

    # Link to Notes (one-to-one)
    notes_id: Mapped[int] = mapped_column(ForeignKey("notes.id"), nullable=False)
    notes: Mapped["Notes"] = relationship(back_populates="ai", uselist=False)