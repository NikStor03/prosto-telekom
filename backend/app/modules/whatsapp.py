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
        # Extract WhatsApp info
        entry = self.message['entry'][0]['changes'][0]['value']
        contact = entry['contacts'][0]
        phone_number = contact['wa_id']
        name = contact['profile']['name']

        # Get phone_number_id from metadata
        phone_number_id = entry['metadata']['phone_number_id']

        with SessionLocal() as session:
            # Step 1: Find the business via Credential
            business = (
                session.query(Businesses)
                .join(Businesses.ai_items)
                .join(AI.credential)
                .filter(Credential.whatsapp_phone_number_id == phone_number_id)
                .first()
            )
            if not business:
                raise ValueError(f"No business found for phone_number_id={phone_number_id}")

            # Step 2: Check if customer already exists
            customer = (
                session.query(Customer)
                .filter(Customer.phone_number == phone_number, Customer.business_id == business.id)
                .first()
            )

            # Step 3: Create customer if not exist
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
            # Step 1: Find the business via Credential
            business = (
                session.query(Businesses)
                .join(Businesses.ai_items)
                .join(AI.credential)
                .filter(Credential.whatsapp_phone_number_id == phone_number_id)
                .first()
            )
            if not business:
                raise ValueError(f"No business found for phone_number_id={phone_number_id}")

            # Step 2: Get or create customer
            customer = self.get_or_create_customer()

            # Step 3: Get or create chat
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

        # Only handling the first message in this example
        msg_data = entry['messages'][0]
        msg_text = msg_data['text']['body']
        msg_sender = msg_data['from']
        msg_timestamp = datetime.fromtimestamp(int(msg_data['timestamp']), tz=timezone.utc)

        with SessionLocal() as session:
            # Step 1: Find the business via Credential
            business = (
                session.query(Businesses)
                .join(Businesses.ai_items)
                .join(AI.credential)
                .filter(Credential.whatsapp_phone_number_id == phone_number_id)
                .first()
            )
            if not business:
                raise ValueError(f"No business found for phone_number_id={phone_number_id}")

            # Step 2: Get or create customer
            customer = self.get_or_create_customer()

            # Step 3: Get or create chat
            chat = self.get_or_create_customer_chat()
            chat = chat[1]

            # Step 4: Create message
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


if __name__ == '__main__':
    waht = WhatsApp({
            'object': 'whatsapp_business_account',
            'entry': [{
                'id': '726862520452522',
                'changes': [{
                    'value': {
                        'messaging_product': 'whatsapp',
                        'metadata': {
                            'display_phone_number': '15551642126',
                            'phone_number_id': '914328498426772'
                        }, 'contacts': [{
                            'profile': {
                                'name': 'Mykyta'
                            }, 'wa_id': '380999723755'
                        }], 'messages': [{
                            'from': '380999723755',
                            'id': 'wamid.HBgMMzgwOTk5NzIzNzU1FQIAEhgUM0E2NDU5MjUzM0VBMjQxNjQ2NTEA',
                            'timestamp': '1764447530',
                            'text': {'body': 'Vhdn'},
                            'type': 'text'}
                        ]},
                    'field': 'messages'}]}]})

    print(waht.process_whatsapp_message())

