import uvicorn
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from breeds import usecase


app = FastAPI()


@app.get("/health")
def check_health():
    return {"status": "ok"}


@app.get("/breeds/{name}")
def get_breed_info(name: str):
    if name not in usecase.BREED_INFO_MAP:
        raise HTTPException(
            status_code=404, detail="Breed info not found for: {}".format(name))

    breed_info = usecase.get_breed_info(usecase.BREED_INFO_MAP[name])
    if breed_info.error:
        raise HTTPException(
            status_code=500, detail="Internal server error on fetching breed info")

    return {"markdown": breed_info.content}

###
# serve static file for frontend
###


@app.get("/garden")
async def main():
    return FileResponse("../frontend/build/index.html")


@app.get("/")
async def main():
    return FileResponse("../frontend/build/index.html")


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000,
                log_level="info", reload=True)
