from langgraph.graph import StateGraph, END
from graph.state import VehicleState
from graph.nodes import *

graph = StateGraph(VehicleState)

graph.add_node("data_analysis", data_analysis_node)
graph.add_node("diagnosis", diagnosis_node)
graph.add_node("master", master_node)
graph.add_node("engagement", engagement_node)
graph.add_node("scheduling", scheduling_node)
graph.add_node("feedback", feedback_node)

graph.set_entry_point("data_analysis")
graph.add_edge("data_analysis", "diagnosis")
graph.add_edge("diagnosis", "master")

def route(state):
    if state["decision"] == "ENGAGE_CUSTOMER":
        return "engagement"
    return END

graph.add_conditional_edges("master", route)
graph.add_edge("engagement", "scheduling")
graph.add_edge("scheduling", "feedback")
graph.add_edge("feedback", END)

workflow = graph.compile()
