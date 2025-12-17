from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph.workflow import workflow

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/run/{vehicle_id}")
def run(vehicle_id: str):
    # -----------------------------
    # BASE STATE
    # -----------------------------
    state = {
        "vehicle_id": vehicle_id,
        "telemetry": {
            "speed": 72,
            "brake_temp": 310,
            "battery_voltage": 12.1,
        },
        "signal": {
            "confidence": 0.82 if vehicle_id == "V007" else 0.35,
            "severity": "CRITICAL" if vehicle_id == "V007" else "LOW",
        },
        "diagnosis": {
            "failure": "Brake Pad Degradation" if vehicle_id == "V007" else None,
            "priority": "HIGH" if vehicle_id == "V007" else "LOW",
            "days_to_failure": 6 if vehicle_id == "V007" else None,
        },
        "decision": None,
        "message": None,
        "booking": None,
        "rca": None,
        "ueba_alert": None,
    }

    # -----------------------------
    # UEBA DRAMA (CONTROLLED)
    # -----------------------------
    if vehicle_id == "V007":
        state["ueba_alert"] = {
            "title": "Rapid Access Pattern Detected",
            "description": (
                "Multiple emergency diagnostic requests detected from the same "
                "user session within a short time window."
            ),
            "action": "User identity verified via 2FA. Session allowed and monitored.",
            "risk_score": 72,
            "status": "verified",
        }

    result = workflow.invoke(state)
    return result