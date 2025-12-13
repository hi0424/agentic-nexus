import pandas as pd
import os

class DiagnosisAgent:
    def diagnose(self, vehicle_id, signal):
        BASE_DIR = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__))
        )
        data_path = os.path.join(BASE_DIR, "data", "maintenance_history.csv")

        history = pd.read_csv(data_path)
        past = history[history["vehicle_id"] == vehicle_id]

        return {
            "failure": "Brake Pad Degradation",
            "priority": "HIGH",
            "days_to_failure": 7,
            "past_issues": past.to_dict(orient="records")
        }
