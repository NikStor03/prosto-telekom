from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import auth, users, webhook, business_endpoint, ai_endpoints


def create_app() -> FastAPI:
    app = FastAPI(title=settings.PROJECT_NAME)

    app.include_router(auth.router, prefix=settings.API_V1_STR)
    app.include_router(users.router, prefix=settings.API_V1_STR)
    app.include_router(webhook.router)
    app.include_router(business_endpoint.router)

    app.include_router(ai_endpoints.router)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app

app = create_app()
