from fastapi import APIRouter
from fastapi import Request, HTTPException

from app.core.config import settings
from app.modules.whatsapp import WhatsApp

router = APIRouter()

VERIFY_TOKEN = settings.VERIFY_TOKEN

@router.get("/webhook")
async def verify(hub_verify_token: str = None, hub_challenge: str = None):
    if hub_verify_token == VERIFY_TOKEN:
        return hub_challenge
    raise HTTPException(status_code=403, detail="Invalid token")

@router.post("/webhook")
async def webhook(request: Request):
    data = await request.json()
    print("Incoming message:", data)

    try:
        message = data["entry"][0]["changes"][0]["value"]["messages"][0]
        sender = message["from"]
        text = message["text"]["body"]
        print(f"User {sender} said: {text}")
        whats_app = WhatsApp(data)
        print(whats_app.process_whatsapp_message())

    except Exception as e:
        print("No message found or error:", e)

    return {"status": "received"}