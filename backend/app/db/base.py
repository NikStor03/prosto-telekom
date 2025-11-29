# app/db/base.py
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass

from app.models import user, customers, forms, ai, notes, buisness, credetials
