# app/core/config.py
from pydantic_settings import BaseSettings
from pydantic import AnyUrl


class Settings(BaseSettings):
    PROJECT_NAME: str = "Prosto Telekom API"
    API_V1_STR: str = "/api/v1"

    SECRET_KEY: str = "supersecretkey123"
    ACCESS_TOKEN_EXPIRE_HOURS: int = 60
    ALGORITHM: str = "HS256"

    DATABASE_URL: AnyUrl = "postgresql+psycopg2://postgres:postgres@localhost:5432/postgres"
    VERIFY_TOKEN: str = "SDfanqhqwekDjhafhakfkka"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
