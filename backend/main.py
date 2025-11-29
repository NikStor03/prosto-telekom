import setup_user
import uvicorn
from fastapi import FastAPI

from backend.core.db import setup_database

app = FastAPI()
app.include_router(setup_database.router)
app.include_router(setup_user.router)

if __name__ == "__main__":
     uvicorn.run("main:app", reload=True)
