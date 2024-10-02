from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import user_controller
from app.controllers import header_controller
from app.controllers import price_plan_type_controller
from app.controllers import price_controller
from app.controllers import product_category_controller
from app.controllers import blog_category_controller
from app.controllers import product_controller
from app.controllers import social_media_controller
from app.controllers import footer_header_controller
from app.controllers import footer_section_controller
from app.controllers import email_settings_controller
from app.controllers import banner_controller
from app.controllers import color_theme_controller
from app.controllers import favicon_settings_controller
from app.controllers import navigation_settings_controller
from app.controllers import home_page_settings_controller
from app.controllers import client_controller
from app.controllers import team_controller
from app.controllers import testimonial_controller
from app.controllers import blog_controller
from app.utils.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins =['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_controller.router)
app.include_router(header_controller.router)
app.include_router(price_plan_type_controller.router)
app.include_router(price_controller.router)
app.include_router(product_category_controller.router)
app.include_router(blog_category_controller.router)
app.include_router(product_controller.router)
app.include_router(social_media_controller.router)
app.include_router(footer_header_controller.router)
app.include_router(footer_section_controller.router)
app.include_router(email_settings_controller.router)
app.include_router(banner_controller.router)
app.include_router(color_theme_controller.router)
app.include_router(favicon_settings_controller.router)
app.include_router(navigation_settings_controller.router)
app.include_router(home_page_settings_controller.router)
app.include_router(client_controller.router)
app.include_router(team_controller.router)
app.include_router(testimonial_controller.router)
app.include_router(blog_controller.router)



