from decouple import config
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = config("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
database = client.pinterest
collection_user = database.user
collection_pin = database.pin
collection_comments = database.comments
