# AutoAI: Agentic Predictive Maintenance Platform  
EY Techathon 6.0 | Round 2 Submission

AutoAI is an **agentic AI prototype** for predictive vehicle maintenance, designed to demonstrate how autonomous AI agents can be orchestrated, secured, and monitored in an automotive ecosystem.

The project focuses on **agentic orchestration, security (UEBA), and realistic system workflows**, in line with EY Techathon evaluation criteria.

---

## Problem Context

Automotive maintenance workflows today face multiple challenges:
- Failures are detected reactively rather than predictively
- Customer engagement and service scheduling are largely manual
- Aftersales insights rarely feed back into manufacturing
- Autonomous AI systems lack behavioral security monitoring

AutoAI explores how **agentic AI systems** can address these gaps through autonomous, explainable workflows.

---

## Solution Overview

AutoAI implements a closed-loop predictive maintenance workflow where AI agents:

1. Monitor vehicle telematics and maintenance history  
2. Predict component failures and urgency  
3. Decide whether customer engagement is required  
4. Initiate service scheduling autonomously  
5. Generate RCA/CAPA insights for manufacturing  
6. Continuously monitor agent behavior using UEBA principles  

The workflow mirrors **real-world OEM aftersales processes**, including early warning detection, proactive customer engagement, and service center coordination.

All decisions are coordinated by a **Master Agent**, with specialized **Worker Agents** executing domain-specific tasks.

---

## Agentic Architecture

Agent execution, state transitions, and decision flow are orchestrated using **LangGraph**, enabling deterministic and explainable multi-agent workflows.

### Master Agent (Orchestrator)
- Controls end-to-end workflow
- Decides escalation paths
- Coordinates worker agents
- Enforces security and access boundaries

### Worker Agents
| Agent | Responsibility |
|------|----------------|
| Data Analysis Agent | Analyzes telematics and historical data |
| Diagnosis Agent | Predicts failure type and priority |
| Customer Engagement Agent | Explains predicted failures in natural language and persuades customers to book preventive service |
| Scheduling Agent | Proposes and confirms service appointments |
| Feedback Agent | Captures post-service feedback |
| Manufacturing Insights Agent | Generates RCA/CAPA insights |

---

## UEBA Security Layer

AutoAI integrates a **UEBA-style security layer** to monitor AI agent behavior.

- Establishes behavioral baselines for each agent
- Detects anomalous or unauthorized actions
- Prevents agents from accessing resources outside their scope

**Demonstration scenario:**  
For vehicle `V004`, the Scheduling Agent intentionally attempts an unauthorized telematics access, which is detected and flagged by UEBA.  
All other vehicles operate under normal behavioral baselines.

This demonstrates **behavior-based security**, not hardcoded alerts.

---

## End-to-End Demonstration Flow

1. Synthetic vehicle telemetry ingested  
2. Failure risk predicted by agents  
3. Master Agent decides next action  
4. Customer engagement triggered (if required)  
5. Service scheduling executed autonomously  
6. UEBA monitors and flags anomalous agent behavior  
7. RCA/CAPA insights generated for manufacturing teams  

---

## Data & System Assumptions

- Synthetic vehicle data for multiple vehicles
- Mock telematics feed
- Dummy maintenance history records
- Simulated service center scheduling
- Rule-based predictive logic for failure estimation
- UEBA behavior simulation for agent monitoring

The goal is to demonstrate **system realism**, not production deployment.

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Agent Orchestration | LangGraph |
| Backend | Python, FastAPI |
| Frontend | React, TypeScript, Tailwind CSS |
| Data Processing | CSV-based synthetic datasets, Pandas |
| Security | UEBA (behavioral simulation) |
| APIs | Mock Telematics API, Mock Service Scheduling API|

---

## Project Structure

```bash
agentic-nexus/
├── backend/
│   ├── agents/        # Master & Worker agent logic
│   ├── graph/         # LangGraph workflow
│   ├── data/          # Synthetic datasets
│   ├── services/      # Scheduler & telematics mocks
│   ├── ueba/          # Security layer
│   └── main.py        # FastAPI entrypoint
├── frontend/
│   ├── src/    # frontend
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── requirements.txt
└── README.md
```
---

## Running the Demo
```bash
git clone https://github.com/hi0424/agentic-nexus.git
cd agentic-nexus

python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

pip install -r requirements.txt
uvicorn backend.main:app --reload
```
```bash
cd frontend
npm run dev
```
---

## Team
Built by a student team focused on:
- Agentic AI system design
- Backend orchestration
- Data-driven workflows
- UX-to-engineering translation


