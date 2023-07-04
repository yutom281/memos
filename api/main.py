from fastapi import FastAPI
from dotenv import dotenv_values
from routes import router as memo_router
from mongo_util import mongo_client

config = dotenv_values()

app = FastAPI()

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = mongo_client()
    app.database = app.mongodb_client[config["DB_NAME"]]

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(memo_router, tags=["memos"], prefix="/memo")