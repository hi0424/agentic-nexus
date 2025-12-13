class MasterAgent:
    def decide(self, diagnosis):
        # If no diagnosis, no action
        if diagnosis is None:
            return "NO_ACTION"

        if diagnosis.get("priority") == "HIGH":
            return "ENGAGE_CUSTOMER"

        return "NO_ACTION"
