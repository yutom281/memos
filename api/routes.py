from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Memo, MemoUpdate

router = APIRouter()

@router.get("/", response_description="List all memos", response_model=List[Memo])
def list_memos(request: Request):
    memos = list(request.app.database["memos"].find(limit=100))
    return memos


@router.get("/{topic}", response_description="Get memos by topic, using regex", response_model=List[Memo])
def find_memo(topic: str, request: Request):
    memos = list(request.app.database["memos"].find({"topic": {"$regex": f".*{topic}.*", "$options": "i"}}))
    return memos


@router.post("/", response_description="Create a new memo", status_code=status.HTTP_201_CREATED, response_model=Memo)
def create_memo(request: Request, memo: Memo = Body(...)):
    memo = jsonable_encoder(memo)
    new_memo = request.app.database["memos"].insert_one(memo)
    created_memo = request.app.database["memos"].find_one(
        {"_id": new_memo.inserted_id}
    )
    return created_memo


@router.put("/{id}", response_description="Update a memo", response_model=Memo)
def update_memo(id: str, request: Request, memo: MemoUpdate = Body(...)):
    memo = {k: v for k, v in memo.dict().items() if v is not None}
    if len(memo) >= 1:
        update_result = request.app.database["memos"].find_one(
            {"_id": id}, {"$set": memo}
        )

        if update_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Memo with ID {id} not found")
        
    if (
        existing_memo := request.app.database["memos"].find_one({"_id": id})
    ) is not None:
        return existing_memo
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Memo with ID {id} not found")


@router.delete("/{id}", response_description="Delete a memo")
def delete_memo(id: str, request: Request, response: Response):
    delete_result = request.app.database["memos"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Memo with ID {id} not found")
