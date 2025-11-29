# app/models/ai.py
from __future__ import annotations

from sqlalchemy import Integer, String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
class AI(Base):
    __tablename__ = "ai"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    credential_id: Mapped[int] = mapped_column(ForeignKey("credentials.id"))
    credential: Mapped["Credential"] = relationship(back_populates="ai")

    business_id: Mapped[int | None] = mapped_column(ForeignKey("businesses.id"))
    business: Mapped["Businesses | None"] = relationship(
        back_populates="ai_items",
        uselist=False
    )

    # ✅ NO FK COLUMN HERE ANYMORE
    form: Mapped["Form | None"] = relationship(
        "Form",
        back_populates="ai",
        uselist=False
    )

    # ✅ Notes relationship (already fixed)
    notes: Mapped["Notes | None"] = relationship(
        "Notes",
        back_populates="ai",
        uselist=False
    )