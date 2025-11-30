from __future__ import annotations

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
class AI(Base):
    __tablename__ = "ai"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    form_id: Mapped[int] = mapped_column(ForeignKey("form.id"), nullable=False)

    credential_id: Mapped[int] = mapped_column(ForeignKey("credentials.id"))
    credential: Mapped["Credential"] = relationship(back_populates="ai")

    business_id: Mapped[int | None] = mapped_column(ForeignKey("businesses.id"))
    business: Mapped["Businesses | None"] = relationship(
        back_populates="ai_items",
        uselist=False
    )

    notes: Mapped["Notes | None"] = relationship(
        "Notes",
        back_populates="ai",
        uselist=False
    )
