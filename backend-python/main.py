from fastapi import FastAPI, HTTPException
from schemas import Device
from database import devices_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/devices", response_model=list[Device])
def get_devices():
    return devices_db

@app.post("/devices", response_model=Device)
def add_device(device: Device):
    for d in devices_db:
        if d["id"] == device.id:
            raise HTTPException(status_code=400, detail="ID ya existe")
    devices_db.append(device.model_dump())
    return device