from fastapi import APIRouter, Depends, HTTPException

from app import schemas
from app.api.deps import get_db
from sqlalchemy.orm import Session

from app.models.business import Businesses
from app.models.user import User
from app.schemas.business import BusinessCreate, Business, BusinessReadByIdResponse, BusinessCreateResponse, \
    BusinessReadAllResponse, BusinessReadAll

router = APIRouter(prefix="/businesses", tags=["businesses"])


@router.post("/businesses/create", response_model=BusinessCreateResponse)
def create_business(data: BusinessCreate, db: Session = Depends(get_db)):
    new_business = Business(
        name=data.name,
        credential_id=999,
        placement=data.placement,
        phone_number=data.phone_number,
        website=data.website if data.website else " ",
    )
    db.add(new_business)
    db.commit()
    db.refresh(new_business) # get id

    return new_business


@router.get("/businesses/read_by_id", response_model=BusinessReadByIdResponse)
def read_business_by_id(business_id: int, db: Session = Depends(get_db)):

    business = db.query(Businesses).filter(
        Businesses.id == business_id
    ).first()

    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    print("TYPE:", type(business))
    print("NAME TYPE:", type(business.name))

    return BusinessReadByIdResponse(
        id=business.id,
        name=business.name,
        placement=business.placement,
        phone_number=business.phone_number,
    )


@router.get("/businesses", response_model=BusinessReadAllResponse)
def read_all_businesses_for_user(data: BusinessReadAll, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.hashed_password == data.hashed_password,
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    businesses = db.query(Business).filter(Business.id_user == user.id).all()

    businesses_count = db.query(Business).filter(Business.id_user == user.id).count()


    if not businesses:
        raise HTTPException(status_code=404, detail="Business not found")

    return BusinessReadAllResponse(
        businesses=[businesses],
        total=businesses_count,
    )