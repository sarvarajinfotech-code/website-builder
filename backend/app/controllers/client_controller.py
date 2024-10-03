from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.services.client_service import (
    create_client,
    get_client,
    get_all_clients,
    update_client,
    delete_client
)
from app.utils.upload_file import save_file, delete_file
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for client input
class ClientCreate(BaseModel):
    client_name: str

# Create new client and upload the logo
@router.post("/clients/")
async def create_new_client(
    client_name: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    
    # Create new client
    new_client = create_client(db, client_name, "")

    # Save the uploaded logo file and generate the logo path
    logo_path = save_file(file, f"client_logo_{new_client.ID}.png")
    
    # Create new client
    new_client = update_client(db, new_client.ID,client_name, "/"+logo_path)

    return {"detail": "Client created successfully", "client_id": new_client.ID, "logo_path": logo_path}

# Get client by ID
@router.get("/clients/{client_id}")
async def read_client(client_id: int, db: Session = Depends(get_db)):
    client = get_client(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

# Get all clients
@router.get("/clients/")
async def read_all_clients(db: Session = Depends(get_db)):
    return get_all_clients(db)

# Update client by ID
@router.put("/clients/{client_id}")
async def update_client_entry(
    client_id: int,
    client_name: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    client = get_client(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    # Use the existing logo path if no new logo is uploaded
    logo_path = client.CLIENT_LOGO
    if file:
        logo_path = save_file(file, f"client_logo_{client_id}.png")

    # Update client in the database
    updated_client = update_client(db, client_id, client_name, "/"+logo_path)

    return {"detail": "Client updated successfully", "client": updated_client}

# Delete client by ID
@router.delete("/clients/{client_id}")
async def delete_client_entry(client_id: int, db: Session = Depends(get_db)):
    client = get_client(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    # Delete the client from the database
    deleted_client = delete_client(db, client_id)
    if not deleted_client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    # Delete the logo file from the public folder if it exists
    if client.CLIENT_LOGO:
        delete_file(client.CLIENT_LOGO)

    return {"detail": "Client deleted successfully"}
