from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import FastAPI, Request, HTTPException

from app.core.config import settings

router = APIRouter()

VERIFY_TOKEN = settings.VERIFY_TOKEN

# Verification endpoint (GET)
@router.get("/webhook")
async def verify(hub_verify_token: str = None, hub_challenge: str = None):
    if hub_verify_token == VERIFY_TOKEN:
        return hub_challenge
    raise HTTPException(status_code=403, detail="Invalid token")

# Webhook endpoint (POST)
@router.post("/webhook")
async def webhook(request: Request):
    data = await request.json()
    print("Incoming message:", data)

    # Example for WhatsApp messages
    try:
        message = data["entry"][0]["changes"][0]["value"]["messages"][0]
        sender = message["from"]
        text = message["text"]["body"]
        print(f"User {sender} said: {text}")

        # Optional: send auto-reply
        """
        requests.post(
            f"https://graph.facebook.com/v20.0/YOUR_PHONE_NUMBER_ID/messages",
            headers={"Authorization": f"Bearer YOUR_ACCESS_TOKEN"},
            json={
                "messaging_product": "whatsapp",
                "to": sender,
                "text": {"body": "Hi! I got your message."}
            }
        )
        """
    except Exception as e:
        print("No message found or error:", e)

    return {"status": "received"}