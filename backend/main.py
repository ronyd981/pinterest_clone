from fastapi import FastAPI, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, user, pin, comments

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=['Auth'])
app.include_router(user.router, tags=['User'])
app.include_router(pin.router, tags=['Pin'])
app.include_router(comments.router, tags=['Comments'])
