class DataAnalysisAgent:
    def analyze(self, telemetry):
        wear = telemetry["brake_wear"]

        confidence = min(1.0, round((wear - 0.6) / 0.4, 2))

        if wear > 0.7:
            return {
                "signal": "BRAKE_WEAR_HIGH",
                "confidence": confidence,
                "severity": "CRITICAL" if wear > 0.85 else "MODERATE"
            }
        return None
