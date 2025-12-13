class DataAnalysisAgent:
    def analyze(self, telemetry):
        if telemetry["brake_wear"] > 0.75:
            return {
                "signal": "BRAKE_WEAR_HIGH",
                "confidence": 0.85
            }
        return None
