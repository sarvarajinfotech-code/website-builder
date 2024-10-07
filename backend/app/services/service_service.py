from sqlalchemy.orm import Session
from app.models.service_model import ServiceModel

# Create a new service
def create_service(db: Session, service_name: str, service_category: str, svg_icon: str, service_description: str, learn_more: bool, learn_more_link: str):
    new_service = ServiceModel(
        SERVICE_NAME=service_name,
        SERVICE_CATEGORY=service_category,
        SVG_ICON=svg_icon,
        SERVICE_DESCRIPTION=service_description,
        LEARN_MORE=learn_more,
        LEARN_MORE_LINK=learn_more_link if learn_more else None
    )
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service

# Get service by ID
def get_service(db: Session, service_id: int):
    return db.query(ServiceModel).filter(ServiceModel.ID == service_id).first()

# Get all services
def get_all_services(db: Session):
    return db.query(ServiceModel).all()

# Update service by ID
def update_service(db: Session, service_id: int, service_name: str, service_category: str, svg_icon: str, service_description: str, learn_more: bool, learn_more_link: str):
    service = db.query(ServiceModel).filter(ServiceModel.ID == service_id).first()
    if service:
        service.SERVICE_NAME = service_name
        service.SERVICE_CATEGORY = service_category
        service.SVG_ICON = svg_icon
        service.SERVICE_DESCRIPTION = service_description
        service.LEARN_MORE = learn_more
        service.LEARN_MORE_LINK = learn_more_link if learn_more else None
        db.commit()
        db.refresh(service)
        return service
    return None

# Delete service by ID
def delete_service(db: Session, service_id: int):
    service = db.query(ServiceModel).filter(ServiceModel.ID == service_id).first()
    if service:
        db.delete(service)
        db.commit()
        return service
    return None
