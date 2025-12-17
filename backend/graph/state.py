from typing import TypedDict, Optional

class VehicleState(TypedDict):
    vehicle_id: str
    telemetry: Optional[dict]
    signal: Optional[dict]
    diagnosis: Optional[dict]
    decision: Optional[str]
    message: Optional[str]
    booking: Optional[dict]
    rca: Optional[str]
    ueba_alert: Optional[str]