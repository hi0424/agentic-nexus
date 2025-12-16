# 🚗 AutoAI: Agentic AI for Predictive Vehicle Maintenance

AutoAI is a **LangGraph-orchestrated, multi-agent AI system** that demonstrates how autonomous agents can be used to predict vehicle failures, engage customers, schedule service, and generate manufacturing insights — all while being monitored by a **UEBA-style security layer**.

This project focuses on **system design, agent orchestration, and secure AI workflows**, not model training or frontend polish.

---

## What this project demonstrates

- Agentic AI orchestration using **LangGraph**
- Master–Worker agent architecture
- Autonomous decision flow (no hardcoded scripts)
- UEBA-style behavioral monitoring for AI agents
- End-to-end AI system integration (data → decision → action → feedback)

---

## System Architecture

### Master Agent
- Controls overall workflow
- Decides escalation and engagement
- Enforces security boundaries
- Coordinates all worker agents

### Worker Agents
| Agent | Responsibility |
|-----|----------------|
| Data Analysis Agent | Processes vehicle telemetry & history |
| Diagnosis Agent | Predicts failure type and priority |
| Customer Engagement Agent | AI-driven service conversation |
| Scheduling Agent | Books service appointments |
| Feedback Agent | Captures post-service feedback |
| Manufacturing Insights Agent | RCA / CAPA generation |

### UEBA Security Layer
- Establishes behavioral baselines for agents
- Detects anomalous or unauthorized actions
- Demonstrated via controlled policy violation

---

## End-to-End Flow

1. Vehicle telemetry ingested  
2. Failure risk predicted  
3. Master Agent decides action  
4. Customer engaged via AI  
5. Service scheduled autonomously  
6. UEBA detects abnormal agent behavior (edge case)  
7. RCA insights fed back to manufacturing  

---

## Tech Stack

| Layer | Technology |
|-----|------------|
| Agent Orchestration | LangGraph |
| Backend API | FastAPI |
| UI / Demo | Streamlit |
| Data Processing | Pandas |
| Security | UEBA (behavioral simulation) |
| Language | Python |

---

## Project Structure

```bash
agentic-nexus/
│
├── backend/
│   ├── agents/        # Master & Worker agent logic
│   ├── graph/         # LangGraph workflow
│   ├── data/          # Synthetic vehicle datasets
│   ├── services/      # Scheduler API & Telematics
│   ├── ueba/          # Security Layer
│   ├── main.py        # FastAPI entrypoint
│
├── frontend/
│   ├── dashboard.py   # Figma-aligned Streamlit UI
│
├── requirements.txt
├── README.md
