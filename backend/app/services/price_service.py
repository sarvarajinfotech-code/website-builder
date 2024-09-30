from sqlalchemy.orm import Session
from app.models.price_model import PriceModel

from sqlalchemy.orm import Session
from app.models.price_model import PriceModel

def create_price(db: Session, price_data: dict):
    new_price = PriceModel(
        PRICE_TAGLINE=price_data['price_tagline'],
        PLAN_TYPE=price_data['plan_type'],
        CURRENCY_TYPE=price_data['currency_type'],
        PRICE=price_data['price'],
        OFFER=price_data['offer'],
        OFFER_PRICE=price_data.get('offer_price', None),
        FEATURES_INCLUDED=price_data.get('features_included', None),
        FEATURES_EXCLUDED=price_data.get('features_excluded', None),
        CTA_BUTTON_TEXT=price_data.get('cta_button_text', None),
        CTA_BUTTON_LINK=price_data.get('cta_button_link', None)
    )
    db.add(new_price)
    db.commit()
    db.refresh(new_price)
    return new_price

def update_price(db: Session, price_id: int, price_data: dict):
    price = db.query(PriceModel).filter(PriceModel.ID == price_id).first()
    if price:
        price.PRICE_TAGLINE = price_data['price_tagline']
        price.PLAN_TYPE = price_data['plan_type']
        price.CURRENCY_TYPE = price_data['currency_type']
        price.PRICE = price_data['price']
        price.OFFER = price_data['offer']
        price.OFFER_PRICE = price_data.get('offer_price', None)
        price.FEATURES_INCLUDED = price_data.get('features_included', None)
        price.FEATURES_EXCLUDED = price_data.get('features_excluded', None)
        price.CTA_BUTTON_TEXT = price_data.get('cta_button_text', None)
        price.CTA_BUTTON_LINK = price_data.get('cta_button_link', None)
        
        db.commit()
        db.refresh(price)
        return price
    return None

def get_price(db: Session, price_id: int):
    return db.query(PriceModel).filter(PriceModel.ID == price_id).first()

def get_all_prices(db: Session):
    return db.query(PriceModel).all()

def update_price(db: Session, price_id: int, price_data: dict):
    price = db.query(PriceModel).filter(PriceModel.ID == price_id).first()
    if price:
        for key, value in price_data.items():
            setattr(price, key, value)
        db.commit()
        db.refresh(price)
        return price
    return None

def delete_price(db: Session, price_id: int):
    price = db.query(PriceModel).filter(PriceModel.ID == price_id).first()
    if price:
        db.delete(price)
        db.commit()
        return price
    return None
