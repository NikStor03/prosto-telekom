# app/db/base.py
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass

from app.models import *
from app.models.buisness import Businesses
from app.models.credetials import Credential
from app.models.user import *
from app.models.forms import *
from app.models.chat import *
from app.models.ai import *
from app.models.notes import *
