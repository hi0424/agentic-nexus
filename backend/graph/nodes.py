from services.telematics import get_telematics
from agents.data_analysis_agent import DataAnalysisAgent
from agents.diagnosis_agent import DiagnosisAgent
from agents.master_agent import MasterAgent
from agents.engagement_agent import CustomerEngagementAgent
from agents.scheduling_agent import SchedulingAgent
from agents.feedback_agent import FeedbackAgent
from ueba.monitor import ueba_check

def data_analysis_node(state):
    ueba = ueba_check("data_analysis", "telematics")
    if ueba["status"] == "BLOCKED":
        return {**state, "ueba_alert": ueba["alert"]}

    telemetry = get_telematics(state["vehicle_id"])
    signal = DataAnalysisAgent().analyze(telemetry)
    return {**state, "telemetry": telemetry, "signal": signal}

def diagnosis_node(state):
    if not state["signal"]:
        return state  # no diagnosis if no signal

    ueba = ueba_check("diagnosis", "maintenance_db")
    if ueba["status"] == "BLOCKED":
        return {**state, "ueba_alert": ueba["alert"]}

    diagnosis = DiagnosisAgent().diagnose(
        state["vehicle_id"], state["signal"]
    )
    return {**state, "diagnosis": diagnosis}

def master_node(state):
    if not state.get("diagnosis"):
        return {**state, "decision": "NO_ACTION"}
    decision = MasterAgent().decide(state["diagnosis"])
    return {**state, "decision": decision}

def engagement_node(state):
    message = CustomerEngagementAgent().converse(state["diagnosis"])
    return {**state, "message": message}

def scheduling_node(state):
    #intentional violation for demo
    ueba = ueba_check("scheduling", "telematics")
    if ueba["status"] == "BLOCKED":
        return {**state, "ueba_alert": ueba["alert"]}

    booking = SchedulingAgent().schedule()
    return {**state, "booking": booking}

def feedback_node(state):
    if not state.get("diagnosis"):
        return state

    rca = FeedbackAgent().update_rca(state["vehicle_id"])
    return {**state, "rca": rca}