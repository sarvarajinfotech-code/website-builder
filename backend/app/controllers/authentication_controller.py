from fastapi import APIRouter, HTTPException,BackgroundTasks
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.utils.database import get_db
from fastapi import Depends
from dotenv import load_dotenv
from app.services import user_service
from app.services.mail_service import send_reset_email

load_dotenv()

# Define the router
router = APIRouter()

# Configuration for JWT token
SECRET_KEY = "1234567890poiuytrewqasdfghjklzxcvbnm"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Utility functions
def create_reset_token(email: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    encoded_jwt = jwt.encode({"sub": email, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Request models
class ResendEmailRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    password: str

# Routes
@router.post("/resend-reset-email")
async def resend_reset_email(request: ResendEmailRequest ,background_tasks: BackgroundTasks,db: Session = Depends(get_db)):
    user = user_service.get_user_by_name(db,request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Create a new token and set it in the user record
    token = create_reset_token(request.email)

    # Simulate sending an email (replace with your email sending logic)
    reset_link = f"http://localhost:5173/admin/reset-password?token={token}"
    background_tasks.add_task(
        send_reset_email,
        request.email,
        reset_link,
        db
           )
    print(f"Send this link to {request.email}: {reset_link}")

    return {"message": "Password reset email sent successfully"}

@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest,db: Session = Depends(get_db)):
    try:
        # Decode the token
        payload = jwt.decode(request.token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=400, detail="Invalid token")

        # Verify the token hasn't expired or been used
        user = user_service.get_user_by_name(db,email)
        if not user:
            raise HTTPException(status_code=400, detail="Invalid or expired token")

        # Update the password
        user_service.update_user_with_pass(db,email,hash_password(request.password))

        return {"message": "Password reset successfully"}

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=400, detail="Invalid token")
