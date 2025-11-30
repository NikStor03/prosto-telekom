from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_db
from sqlalchemy.orm import Session

from app.models import Businesses, User
from app.schemas.businesses import BusinessCreate, BusinessCreateResponse, Business, BusinessReadByIdResponse, \
    BusinessReadAllResponse

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
    db.refresh(new_business)
    return new_business


@router.get("/businesses/read_by_id", response_model=BusinessReadByIdResponse)
def read_business_by_id(user_id: int, db: Session = Depends(get_db)):

    business = db.query(Businesses).filter(
        Businesses.id_user == user_id
    ).first()

    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    return BusinessReadByIdResponse(
        id=business.id,
        name=business.name,
        placement=business.placement,
        phone_number=business.phone_number,
    )


@router.get("/businesses/read_all_businesses_for_user", response_model=BusinessReadAllResponse)
def read_all_businesses_for_user(data: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.hashed_password == data).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    businesses = db.query(Businesses).filter(Businesses.id_user == user.id).all()
    total = len(businesses)

    if not businesses:
        raise HTTPException(status_code=404, detail="No businesses found")

    return BusinessReadAllResponse(
        businesses=businesses,
        total=total
    )