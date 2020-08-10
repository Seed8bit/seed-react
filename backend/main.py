import uvicorn
from typing import Optional
from fastapi import FastAPI, HTTPException
from breeds.usecase import get_breed_info_from_azure, BREED_INFO_MAP

app = FastAPI()


@app.get("/health")
def check_health():
    return {"status": "ok"}


@app.get("/breeds/{name}")
def get_breed_info(name: str):
    if name not in BREED_INFO_MAP:
        raise HTTPException(
            status_code=404, detail="Breed info not found for: {}".format(name))
    return {"markdown": get_breed_info_from_azure(name)}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000,
                log_level="info", reload=True)
