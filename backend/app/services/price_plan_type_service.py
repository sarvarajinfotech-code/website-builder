from sqlalchemy.orm import Session
from app.models.price_plan_type_model import PricePlanType

def create_price_plan_type(db: Session, plan_type: str):
    new_plan = PricePlanType(PLAN_TYPE=plan_type)
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan

def get_price_plan_type(db: Session, plan_id: int):
    return db.query(PricePlanType).filter(PricePlanType.ID == plan_id).first()

def get_all_price_plans(db: Session):
    return db.query(PricePlanType).all()

def update_price_plan_type(db: Session, plan_id: int, plan_type: str):
    plan = db.query(PricePlanType).filter(PricePlanType.ID == plan_id).first()
    if plan:
        plan.PLAN_TYPE = plan_type
        db.commit()
        db.refresh(plan)
        return plan
    return None

def delete_price_plan_type(db: Session, plan_id: int):
    plan = db.query(PricePlanType).filter(PricePlanType.ID == plan_id).first()
    if plan:
        db.delete(plan)
        db.commit()
        return plan
    return None
