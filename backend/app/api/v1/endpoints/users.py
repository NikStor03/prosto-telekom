# app/api/v1/endpoints/users.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.schemas.user import UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserOut)
def read_users_me(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    # можно дополнительно что-то брать из БД, если нужно
    return current_user
