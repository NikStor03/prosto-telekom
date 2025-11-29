from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.db.models.user_model import UserCreate, UserModel, Token, UserSchema
from backend.core.db.setup_database import get_session
from security import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, \
    get_current_active_user

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto", bcrypt__rounds=12)
Session_dep = Annotated[AsyncSession, Depends(get_session)]

@router.post("/add_user", tags=["Users"])
async def add_user(user: UserCreate, session: Session_dep):
    result = await session.execute(select(UserModel).where(UserModel.email == user.email))
    existing_user = result.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    # pass hash
    if not hasattr(user, "password") or not user.password:
        raise HTTPException(status_code=400, detail="Password is required")
    hashed_password = pwd_context.hash(user.password)

    new_user = UserModel(
        username=user.username,
        email=user.email,
        password=hashed_password,
        disabled=False
    )
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return {"status": "user added", "email": new_user.email}


@router.get("/get_user/{user_id}", tags=["Users"])
async def get_user(user_id: int, session: Session_dep):
    result = await session.execute(select(UserModel).where(UserModel.id == user_id))
    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "disabled": user.disabled,
    }


@router.get("/get_all_users/", tags=["Users"])
async def get_all_users(session: Session_dep):
    result = await session.execute(select(UserModel))
    users = result.scalars().all()
    if not users:
        raise HTTPException(status_code=404, detail="Users not found")
    return users


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session_dep,
):
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/users/me", response_model=UserSchema)
async def read_users_me(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)]
):
    return current_user


@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)]
):
    return [{"item_id": "Foo", "owner": current_user.username}]