from fastapi import FastAPI
from graph.workflow import workflow

app = FastAPI()

@app.get("/run/{vehicle_id}")
def run(vehicle_id: str):
    state = {
        "vehicle_id": vehicle_id,
        "telemetry": None,
        "signal": None,
        "diagnosis": None,
        "decision": None,
        "message": None,
        "booking": None,
        "rca": None,
        "ueba_alert": None
    }

    return workflow.invoke(state)
