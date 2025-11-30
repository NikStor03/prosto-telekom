from datetime import datetime, timezone
from sndhdr import whathdr
from typing import get_origin
import requests
from sqlalchemy import select

from app.db import session
from app.db.session import SessionLocal
from app.models import Customer, Chat, Message
from app.models.buisness import Businesses
from app.models.credetials import Credential
from app.models.ai import AI

class WhatsApp:
    def __init__(self, message: dict = None, access_tokens: str = '', user_phone_number: str = '', business_phone_number: str = '914328498426772'):

        self.message = message
        if message is not None:
            self.business = self.__fetch_buisness()
            print(self.business.name)
        else:
            self.business = None
        self.access_tokens = access_tokens
        self.user_phone_number = user_phone_number
        self.business_phone_number = business_phone_number
        self.api_version = "v22.0"


    def __fetch_buisness(self):
        phone_number_id = self.message['entry'][0]['changes'][0]['value']['metadata']['phone_number_id']
        print(phone_number_id)

        stmt = (
            select(Businesses)
            .join(AI, AI.business_id == Businesses.id)
            .join(Credential, Credential.id == AI.credential_id)
            .where(Credential.whatsapp_phone_number_id == phone_number_id)
        )

        with SessionLocal() as session:
            result = session.execute(stmt).scalars().first()
            return result

    def get_or_create_customer(self):
        entry = self.message['entry'][0]['changes'][0]['value']
        contact = entry['contacts'][0]
        phone_number = contact['wa_id']
        name = contact['profile']['name']

        phone_number_id = entry['metadata']['phone_number_id']

        with SessionLocal() as session:
            business = (
                session.query(Businesses)
                .join(Businesses.ai_items)
                .join(AI.credential)
                .filter(Credential.whatsapp_phone_number_id == phone_number_id)
                .first()
            )
            if not business:
                raise ValueError(f"No business found for phone_number_id={phone_number_id}")

            customer = (
                session.query(Customer)
                .filter(Customer.phone_number == phone_number, Customer.business_id == business.id)
                .first()
            )

            if not customer:
                customer = Customer(
                    name=name,
                    phone_number=phone_number,
                    business_id=business.id
                )
                session.add(customer)
                session.commit()
                session.refresh(customer)

            return customer

    def get_or_create_customer_chat(self):
        entry = self.message['entry'][0]['changes'][0]['value']
        contact = entry['contacts'][0]
        phone_number = contact['wa_id']
        name = contact['profile']['name']
        phone_number_id = entry['metadata']['phone_number_id']

        with SessionLocal() as session:
            business = (
                session.query(Businesses)
                .join(Businesses.ai_items)
                .join(AI.credential)
                .filter(Credential.whatsapp_phone_number_id == phone_number_id)
                .first()
            )
            if not business:
                raise ValueError(f"No business found for phone_number_id={phone_number_id}")

            customer = self.get_or_create_customer()

            chat = (
                session.query(Chat)
                .filter(Chat.customer_id == customer.id)
                .first()
            )
            if not chat:
                chat = Chat(
                    customer_id=int(customer.id),
                    business_id=business.id
                )
                session.add(chat)
                session.commit()
                session.refresh(chat)

            return customer, chat

    def process_whatsapp_message(self):
        entry = self.message['entry'][0]['changes'][0]['value']
        contact = entry['contacts'][0]
        phone_number = contact['wa_id']
        name = contact['profile']['name']
        phone_number_id = entry['metadata']['phone_number_id']

        msg_data = entry['messages'][0]
        msg_text = msg_data['text']['body']
        msg_sender = msg_data['from']
        msg_timestamp = datetime.fromtimestamp(int(msg_data['timestamp']), tz=timezone.utc)

        with SessionLocal() as session:
            business = (
                session.query(Businesses)
                .join(Businesses.ai_items)
                .join(AI.credential)
                .filter(Credential.whatsapp_phone_number_id == phone_number_id)
                .first()
            )
            if not business:
                raise ValueError(f"No business found for phone_number_id={phone_number_id}")

            customer = self.get_or_create_customer()

            chat = self.get_or_create_customer_chat()
            chat = chat[1]

            message = Message(
                chat_id=int(chat.id),
                sender=msg_sender,
                content=msg_text,
                created_at=msg_timestamp
            )
            session.add(message)
            session.commit()
            session.refresh(message)

            return customer, chat, message

    def send_message(self, customer: Customer, chat: str):

        url = f"https://graph.facebook.com/{self.api_version}/{self.business_phone_number}/messages"

        headers = {
            "Authorization": f"Bearer {self.access_tokens}",
            "Content-Type": "application/json"
        }

        payload = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": str(customer.phone_number),
            "type": "text",
            "text": {
                "preview_url": True,
                "body": chat
            }
        }

        response = requests.post(url, headers=headers, json=payload)

        print(response.status_code)
        print(response.json())
