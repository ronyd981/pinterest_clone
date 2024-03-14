from pymongo import MongoClient
from decouple import config

client = MongoClient(config("MONGO_URI"))
