from services.scheduler_api import get_available_slot

class SchedulingAgent:
    
    def schedule(self, intent="ACCEPT"):
        if intent != "ACCEPT":
            return {"status": "DEFERRED"}
        return get_available_slot()