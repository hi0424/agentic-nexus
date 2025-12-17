from ueba.policies import AGENT_POLICIES

def ueba_check(agent: str, resource: str):
    allowed = AGENT_POLICIES.get(agent, [])
    if resource not in allowed:
        return {
            "status": "BLOCKED",
            "alert": f"UEBA ALERT: {agent} tried unauthorized access to {resource}"
        }
    return {"status": "OK"}