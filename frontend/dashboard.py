import streamlit as st
import requests
import pandas as pd

st.set_page_config(
    page_title="AutoAI | Predictive Maintenance",
    layout="wide",
    initial_sidebar_state="collapsed"
)

st.markdown("""
<style>
.stApp {
    background-color: #0b0f14;
    color: #e6f1ff;
}

h1, h2, h3 {
    color: #5ef2d6;
}

[data-testid="stMetricValue"] {
    color: #5ef2d6;
    font-size: 28px;
}

[data-testid="stMetricLabel"] {
    color: #9baec8;
}

.card {
    background: linear-gradient(145deg, #0f1620, #0b0f14);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 0 20px rgba(94,242,214,0.08);
}

hr {
    border-color: #1f2937;
}
</style>
""", unsafe_allow_html=True)

if "data" not in st.session_state:
    st.session_state.data = None

if "vehicle_id" not in st.session_state:
    st.session_state.vehicle_id = None

tabs = st.tabs([
    "🏠 Home",
    "📊 Live Dashboard",
    "🎙️ Voice Agent",
    "🏭 Manufacturing",
    "🔐 Security & UEBA",
    "✨ Innovation"
])


def run_backend(vehicle_id):
    try:
        res = requests.get(
            f"http://localhost:8000/run/{vehicle_id}",
            timeout=10
        )
        if res.status_code == 200:
            st.session_state.data = res.json()
        else:
            st.error("Backend error")
            st.text(res.text)
    except Exception as e:
        st.error("Backend not reachable")
        st.exception(e)

with tabs[0]:
    st.markdown("## AutoAI")
    st.caption("AI-powered predictive maintenance & agentic orchestration platform")

    col1, col2 = st.columns([2, 1])

    with col1:
        st.markdown("""
        **AutoAI** enables OEMs and service networks to:
        - Predict failures before breakdown
        - Engage customers autonomously
        - Secure agent actions using UEBA
        - Feed RCA insights back to manufacturing
        """)

    with col2:
        vehicle = st.selectbox(
            "Select Vehicle",
            [f"V00{i}" for i in range(1, 11)],
            index=3
        )
        if st.button("▶ Run End-to-End Flow"):
            st.session_state.vehicle_id = vehicle
            run_backend(vehicle)

    if not st.session_state.data:
        st.info("Run a vehicle flow to start the demo.")

with tabs[1]:
    st.markdown("## Live Dashboard")
    st.caption("Real-time vehicle health & agent activity")

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Active Vehicles", "6", "+2 this week")
    c2.metric("Active Alerts", "8", "3 resolved today")
    c3.metric("Avg Health Score", "82%", "+5% improvement")
    c4.metric("AI Agents Active", "6 / 6", "Operational")

    st.divider()

    view = st.radio("View Mode", ["Fleet View", "Single Vehicle"], horizontal=True)

    if view == "Single Vehicle" and st.session_state.data:
        d = st.session_state.data

        col1, col2, col3 = st.columns(3)
        col1.metric("Brake Wear", f"{int(d['telemetry']['brake_wear']*100)}%")
        diagnosis = d.get("diagnosis")
        if diagnosis:
            col2.metric("Predicted Failure", diagnosis.get("failure", "Unknown"))
            col3.metric("Days to Failure", diagnosis.get("days_to_failure", "-"))
        else:
            col2.metric("Predicted Failure", "No issues detected")
            col3.metric("Days to Failure", "N/A")

        df = pd.DataFrame({
            "Time": ["-3h", "-2h", "-1h", "Now"],
            "Brake Wear": [0.62, 0.66, 0.70, d["telemetry"]["brake_wear"]]
        })
        st.line_chart(df.set_index("Time"))


with tabs[2]:
    st.markdown("## Voice & Chat Agent")
    st.caption("Natural language service orchestration")

    scenario = st.radio(
        "Demo Scenario",
        [
            "Critical Failure",
            "Declined & Reschedule",
            "Fleet Scheduling",
            "RCA to Manufacturing"
        ],
        horizontal=True
    )

    if st.session_state.data:
        st.chat_message("assistant").write(
            st.session_state.data["message"]
        )
        st.success("UEBA verified & encrypted conversation")


with tabs[3]:
    st.markdown("## Manufacturing Insights")
    st.caption("AI-generated RCA / CAPA feedback loop")

    st.bar_chart({
        "Brake Pads": 65000,
        "Battery Cells": 185000,
        "Suspension": 82000,
        "Coolant Pump": 42000,
        "Sensors": 25000
    })

    if st.session_state.data:
        st.info(st.session_state.data["rca"])

with tabs[4]:
    st.markdown("## Security & UEBA")
    st.caption("Agent behavior monitoring & anomaly detection")

    if st.session_state.data and st.session_state.data.get("ueba_alert"):
        st.error(st.session_state.data["ueba_alert"])
    else:
        st.success("All agents operating within expected behavioral parameters")

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Security Score", "98 / 100")
    c2.metric("Threats Blocked", "127")
    c3.metric("Anomalies Detected", "12")
    c4.metric("Response Time", "<50ms")

with tabs[5]:
    st.markdown("## Innovation Features")
    st.caption("Next-gen roadmap")

    st.info("""
    - AR-assisted diagnostics  
    - Voice-first service experience  
    - Closed-loop manufacturing intelligence  
    - Autonomous fleet-level scheduling  
    """)

st.divider()
st.caption(
    "AutoAI | LangGraph-based Agentic AI with UEBA Security | EY Techathon 6.0"
)
