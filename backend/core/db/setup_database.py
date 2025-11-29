from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

router = APIRouter()

DATABASE_URL = "sqlite+aiosqlite:///./users.db"

engine = create_async_engine(DATABASE_URL, echo=True)
new_session = async_sessionmaker(engine, expire_on_commit=False)

async def get_session():
    async with new_session() as session:
        yield session


class Base(DeclarativeBase):
    pass

Session_dep = Annotated[AsyncSession, Depends(get_session)]


@router.post("/clean_database", tags=["Database"])
async def clean_database():
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.drop_all)
    return {"status": "database cleaned"}


@router.post("/update_database", tags=["Database"])
async def update_database():
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    return {"status": "database updated"}