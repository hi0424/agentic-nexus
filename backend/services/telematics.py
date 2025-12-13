import random
import time

def get_telematics(vehicle_id: str):
    if vehicle_id in ["V003", "V004", "V009"]:
        brake_wear = 0.85  # force anomaly for demo
    else:
        brake_wear = 0.4

    return {
        "vehicle_id": vehicle_id,
        "brake_wear": brake_wear,
        "timestamp": time.time()
    }

