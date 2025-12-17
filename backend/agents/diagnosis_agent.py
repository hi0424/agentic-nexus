import pandas as pd
import os

class DiagnosisAgent:
    def __init__(self):
        BASE_DIR = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__))
        )
        self.data_path = os.path.join(
            BASE_DIR, "data", "maintenance_history.csv"
        )

    def diagnose(self, vehicle_id: str, signal: dict):
        """
        Uses current signal + historical maintenance data
        to predict likely failure and urgency.
        """

        wear_confidence = signal.get("confidence", 0)
        severity = signal.get("severity", "MODERATE")

        # Load maintenance history safely
        if os.path.exists(self.data_path):
            history = pd.read_csv(self.data_path)
            past = history[history["vehicle_id"] == vehicle_id]
            past_issues = past.to_dict(orient="records")
        else:
            past_issues = []

        # Failure reasoning
        if wear_confidence >= 0.85 or severity == "CRITICAL":
            failure = "Brake Disc Failure"
            days_to_failure = 3
            priority = "HIGH"
        elif wear_confidence >= 0.7:
            failure = "Brake Pad Degradation"
            days_to_failure = 7
            priority = "HIGH"
        else:
            failure = "Early Brake Wear"
            days_to_failure = 14
            priority = "MEDIUM"

        return {
            "vehicle_id": vehicle_id,
            "failure": failure,
            "priority": priority,
            "days_to_failure": days_to_failure,
            "confidence": round(wear_confidence, 2),
            "past_issues": past_issues
        }