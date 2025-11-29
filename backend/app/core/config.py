# app/core/config.py
from pydantic_settings import BaseSettings
from pydantic import AnyUrl


class Settings(BaseSettings):
    PROJECT_NAME: str = "Prosto Telekom API"
    API_V1_STR: str = "/api/v1"

    SECRET_KEY: str = "CHANGE_ME"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALGORITHM: str = "HS256"

    DATABASE_URL: AnyUrl = "postgresql://postgres:postgres@localhost:5432/postgres"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
