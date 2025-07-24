from fastapi import APIRouter, Depends,UploadFile,File, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.utils.database import get_db
from app.services import user_service
from passlib.context import CryptContext
import shutil
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Pydantic model for incoming request body
class UserCreate(BaseModel):
    user_name: str
    password: str
    role: str

class UserUpdate(BaseModel):
    user_name: str
    role: str    

class UserLogin(BaseModel):
    user_name: str
    password: str

class ChangePassword(BaseModel):
    old_password: str
    new_password: str   

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
    

@router.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = user_service.get_user_by_name(db, user.user_name)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    return user_service.create_user(db, user.user_name, user.password, user.role)

@router.get("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = user_service.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/{user_id}")
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    updated_user = user_service.update_user(db, user_id, user.user_name, user.role)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = user_service.delete_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}


@router.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_name(db, user.user_name)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    if not verify_password(user.password, db_user.PASSWORD):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    return {"message": "Login successful", "user": db_user.USER_NAME}

# Change password route
@router.put("/users/{user_id}/change-password/")
def change_password(user_id: int, passwords: ChangePassword, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Verify old password
    if not verify_password(passwords.old_password, db_user.PASSWORD):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    
    # Hash the new password and update
    new_hashed_password = user_service.hash_password(passwords.new_password)
    db_user.PASSWORD = new_hashed_password
    db.commit()
    db.refresh(db_user)

    return {"message": "Password changed successfully"}


@router.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    # Ensure the uploaded file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    # Define the path where the file will be saved in the public folder
    file_location = os.path.join(REACT_PUBLIC_FOLDER, file.filename)

    # Save the uploaded file to the public folder
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return {"info": f"File '{file.filename}' uploaded successfully"}