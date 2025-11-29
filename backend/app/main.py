# app/main.py
from fastapi import FastAPI

from app.core.config import settings
from app.db.session import engine
from app.db import base  # noqa: F401
from app.api.v1.endpoints import auth, users, webhook


def create_app() -> FastAPI:
    app = FastAPI(title=settings.PROJECT_NAME)

    # создаём таблицы (в реальном проекте лучше Alembic)
    base.Base.metadata.create_all(bind=engine)

    # подключаем роутеры
    app.include_router(auth.router, prefix=settings.API_V1_STR)
    app.include_router(users.router, prefix=settings.API_V1_STR)
    app.include_router(webhook.router)

    return app


app = create_app()
