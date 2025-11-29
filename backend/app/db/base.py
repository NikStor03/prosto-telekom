# app/db/base.py
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# импортируем модели, чтобы они попали в metadata
from app.models.user import User  # noqa
