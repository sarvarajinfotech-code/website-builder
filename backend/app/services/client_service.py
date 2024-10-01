from sqlalchemy.orm import Session
from app.models.client_model import ClientModel

# Create new client
def create_client(db: Session, client_name: str, client_logo: str):
    new_client = ClientModel(
        CLIENT_NAME=client_name,
        CLIENT_LOGO=client_logo
    )
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client

# Get client by ID
def get_client(db: Session, client_id: int):
    return db.query(ClientModel).filter(ClientModel.ID == client_id).first()

# Get all clients
def get_all_clients(db: Session):
    return db.query(ClientModel).all()

# Update client by ID
def update_client(db: Session, client_id: int, client_name: str, client_logo: str):
    client = db.query(ClientModel).filter(ClientModel.ID == client_id).first()
    if client:
        client.CLIENT_NAME = client_name
        client.CLIENT_LOGO = client_logo
        db.commit()
        db.refresh(client)
        return client
    return None

# Delete client by ID
def delete_client(db: Session, client_id: int):
    client = db.query(ClientModel).filter(ClientModel.ID == client_id).first()
    if client:
        db.delete(client)
        db.commit()
        return client
    return None
