# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.session import engine
from app.db import base  # noqa: F401
from app.api.v1.endpoints import auth, users, webhook, business_endpoint
from app.schemas import businesses


def create_app() -> FastAPI:
    app = FastAPI(title=settings.PROJECT_NAME)

    # создаём таблицы (в реальном проекте лучше Alembic)
    # base.Base.metadata.create_all(bind=engine)

    # подключаем роутеры
    app.include_router(auth.router, prefix=settings.API_V1_STR)
    app.include_router(users.router, prefix=settings.API_V1_STR)
    app.include_router(webhook.router)
    app.include_router(business_endpoint.router)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = create_app()
