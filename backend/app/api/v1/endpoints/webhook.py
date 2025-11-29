from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import FastAPI, Request, HTTPException

from app.core.config import settings
from app.modules.whatsapp import WhatsApp

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

        """
        Incoming message: {'object': 'whatsapp_business_account', 'entry': [{'id': '726862520452522', 'changes': [{'value': {'messaging_product': 'whatsapp', 'metadata': {'display_phone_number': '15551642126', 'phone_number_id': '914328498426772'}, 'contacts': [{'profile': {'name': 'Mykyta'}, 'wa_id': '380999723755'}], 'messages': [{'from': '380999723755', 'id': 'wamid.HBgMMzgwOTk5NzIzNzU1FQIAEhgUM0E2NDU5MjUzM0VBMjQxNjQ2NTEA', 'timestamp': '1764447530', 'text': {'body': 'Vhdn'}, 'type': 'text'}]}, 'field': 'messages'}]}]}
        User 380999723755 said: Vhdn
        """
        whats_app = WhatsApp(data)
        print(whats_app.process_whatsapp_message())

    except Exception as e:
        print("No message found or error:", e)

    return {"status": "received"}