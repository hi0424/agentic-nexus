# Agentic Nexus - System Documentation

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Complete Workflow](#complete-workflow)
4. [Technology Stack](#technology-stack)
5. [Component Details](#component-details)
6. [API Endpoints](#api-endpoints)
7. [Features](#features)

---

## Overview

**Agentic Nexus** is an autonomous predictive maintenance system for automotive fleets that uses AI agents to analyze vehicle data, predict failures, and automatically engage customers for service scheduling.

### Key Capabilities
- Real-time vehicle telemetry analysis
- Predictive failure detection
- Automated customer engagement
- Service scheduling
- Manufacturing insights (RCA/CAPA)
- UEBA security monitoring
- PDF report generation

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + TypeScript)                     │
│                     http://localhost:3000/3004                       │
│                                                                       │
│  Components:                                                          │
│  • Landing Page • Dashboard • Manufacturing Insights                 │
│  • Security & UEBA • Innovation Features • Voice Agent               │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTP Request
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (FastAPI + Python)                        │
│                      http://localhost:8000                           │
│                                                                       │
│  API Endpoint: GET /run/{vehicle_id}                                │
│  • Receives vehicle ID                                               │
│  • Initializes state with telemetry data                            │
│  • Invokes LangGraph workflow                                        │
│  • Returns comprehensive analysis                                    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   LANGGRAPH WORKFLOW ENGINE                          │
│                   (AI Agent State Machine)                           │
│                                                                       │
│  Sequential Agent Execution:                                         │
│  1. Data Analysis Agent                                              │
│  2. Diagnosis Agent                                                  │
│  3. Master Agent (Decision Maker)                                    │
│  4. Engagement Agent (if needed)                                     │
│  5. Scheduling Agent (if needed)                                     │
│  6. Feedback Agent (if needed)                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Complete Workflow

### Step-by-Step Process

#### 1. **Data Analysis Agent**
```
Input: Vehicle ID, Telemetry Data
Process:
  - Reads vehicles.csv
  - Reads maintenance_history.csv
  - Calls telematics API
  - Analyzes speed, brake temperature, battery voltage
Output: Enriched state with historical context
```

#### 2. **Diagnosis Agent**
```
Input: Analyzed data
Process:
  - Detects potential failures
  - Calculates priority (HIGH/MEDIUM/LOW)
  - Predicts days to failure
  - Identifies failure type (e.g., "Brake Pad Degradation")
  - Looks up past maintenance issues
Output: Diagnosis with failure prediction
```

#### 3. **Master Agent** (Decision Point)
```
Input: Diagnosis
Decision Logic:
  IF priority == "HIGH":
    decision = "ENGAGE_CUSTOMER"
    → Continue to Engagement Agent
  ELSE:
    decision = "NO_ACTION"
    → End workflow
Output: Decision
```

#### 4. **Engagement Agent** (Conditional)
```
Triggered: Only if priority is HIGH
Process:
  - Generates customer notification message
  - Prepares communication content
  - Includes failure details and urgency
Output: Customer message
```

#### 5. **Scheduling Agent** (Conditional)
```
Triggered: After Engagement
Process:
  - Calls scheduler API
  - Finds available service slots
  - Books appointment
  - Confirms booking details
Output: Booking confirmation
```

#### 6. **Feedback Agent** (Conditional)
```
Triggered: After Scheduling
Process:
  - Summarizes all actions taken
  - Logs outcome
  - Prepares final response
Output: Complete action summary
```

---

## Technology Stack

### Frontend
- **Framework:** React 18.3.1
- **Language:** TypeScript
- **Build Tool:** Vite 6.4.1
- **Styling:** TailwindCSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Animations:** Motion (Framer Motion)
- **PDF Generation:** jsPDF + html2canvas
- **Port:** 3000-3004 (auto-increments)

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.x
- **Server:** Uvicorn
- **AI Framework:** LangGraph + LangChain
- **Data Processing:** Pandas
- **Port:** 8000

### Data Sources
- **vehicles.csv** - Fleet vehicle information
- **maintenance_history.csv** - Historical service records
- **Telematics API** - Real-time vehicle data
- **Scheduler API** - Service appointment booking

---

## Component Details

### Frontend Components

#### 1. **Landing Page** (`LandingPage.tsx`)
- Hero section with system overview
- Call-to-action buttons
- Feature highlights

#### 2. **Dashboard** (`Dashboard.tsx`)
- Fleet overview cards
- Real-time vehicle status
- Agent workflow visualization
- Interactive vehicle selection

#### 3. **Manufacturing Insights** (`ManufacturingInsights.tsx`)
- Top 5 component failures (bar chart)
- Failure trend analysis (line chart)
- Root cause distribution (pie chart)
- RCA/CAPA action items
- Design improvement suggestions
- PDF download functionality

#### 4. **Security & UEBA** (`Security.tsx`)
- User behavior analytics
- Access pattern monitoring
- Threat detection alerts
- Risk scoring

#### 5. **Innovation Features** (`InnovationFeatures.tsx`)
- AI capabilities showcase
- Future roadmap

#### 6. **Voice Agent** (`VoiceAgent.tsx`)
- Voice interaction interface
- Natural language processing

### Backend Modules

#### 1. **Main API** (`main.py`)
- FastAPI application setup
- CORS middleware configuration
- `/run/{vehicle_id}` endpoint
- State initialization

#### 2. **Workflow** (`graph/workflow.py`)
- LangGraph state machine definition
- Agent node connections
- Conditional routing logic
- Workflow compilation

#### 3. **State** (`graph/state.py`)
- VehicleState type definition
- State structure:
  ```python
  {
    vehicle_id: str,
    telemetry: dict,
    signal: dict,
    diagnosis: dict,
    decision: str,
    message: str,
    booking: dict,
    rca: dict,
    ueba_alert: dict
  }
  ```

#### 4. **Agents**
- `data_analysis_agent.py` - Data aggregation and analysis
- `diagnosis_agent.py` - Failure prediction
- `master_agent.py` - Decision making
- `engagement_agent.py` - Customer communication
- `scheduling_agent.py` - Appointment booking
- `feedback_agent.py` - Action summarization

#### 5. **Services**
- `telematics.py` - Vehicle data retrieval
- `scheduler_api.py` - Service booking API

#### 6. **UEBA** (User Entity Behavior Analytics)
- `monitor.py` - Behavior tracking
- `policies.py` - Security policy enforcement

---

## API Endpoints

### GET `/run/{vehicle_id}`

**Description:** Triggers the complete AI agent workflow for a specific vehicle.

**Parameters:**
- `vehicle_id` (path parameter, string): Unique vehicle identifier (e.g., "V007")

**Response:**
```json
{
  "vehicle_id": "V007",
  "telemetry": {
    "speed": 72,
    "brake_temp": 310,
    "battery_voltage": 12.1
  },
  "signal": {
    "confidence": 0.82,
    "severity": "CRITICAL"
  },
  "diagnosis": {
    "failure": "Brake Pad Degradation",
    "priority": "HIGH",
    "days_to_failure": 6,
    "past_issues": [...]
  },
  "decision": "ENGAGE_CUSTOMER",
  "message": "Your vehicle requires immediate attention...",
  "booking": {
    "appointment_id": "APT-2025-001",
    "date": "2025-12-20",
    "time": "10:00 AM"
  },
  "rca": {...},
  "ueba_alert": {
    "title": "Rapid Access Pattern Detected",
    "description": "Multiple requests detected...",
    "action": "User verified via 2FA",
    "risk_score": 72,
    "status": "verified"
  }
}
```

---

## Features

### 1. **Autonomous Predictive Maintenance**
- Analyzes real-time vehicle telemetry
- Predicts component failures before they occur
- Calculates time-to-failure estimates
- Prioritizes maintenance actions

### 2. **Multi-Agent System**
- 6 specialized AI agents working in coordination
- State-based workflow using LangGraph
- Conditional branching based on severity
- Automated decision making

### 3. **Customer Engagement Automation**
- Automatic notification generation
- Personalized messaging
- Proactive service scheduling
- Reduces manual intervention

### 4. **Manufacturing Insights (RCA/CAPA)**
- Root Cause Analysis visualization
- Corrective and Preventive Actions tracking
- Design improvement recommendations
- Cost savings calculations
- Downloadable PDF reports

### 5. **Security & UEBA**
- Real-time behavior monitoring
- Anomaly detection
- Risk scoring
- 2FA verification for suspicious activities
- Session monitoring

### 6. **Interactive Dashboard**
- Real-time fleet status
- Visual workflow representation
- Vehicle health indicators
- Historical trend analysis

### 7. **PDF Report Generation**
- Comprehensive RCA/CAPA reports
- Charts and visualizations included
- Multi-page support
- Professional formatting

---

## Data Flow Diagram

```
User Selects Vehicle
        ↓
Frontend calls /run/V007
        ↓
Backend initializes state
        ↓
┌───────────────────────┐
│  Data Analysis Agent  │
│  - Load CSV data      │
│  - Fetch telemetry    │
│  - Enrich state       │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│   Diagnosis Agent     │
│  - Detect failures    │
│  - Calculate priority │
│  - Predict timeline   │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│    Master Agent       │
│  Decision Point:      │
│  HIGH → Engage        │
│  LOW → End            │
└──────────┬────────────┘
           ↓
     [IF HIGH PRIORITY]
           ↓
┌───────────────────────┐
│  Engagement Agent     │
│  - Create message     │
│  - Notify customer    │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│  Scheduling Agent     │
│  - Find slots         │
│  - Book appointment   │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│   Feedback Agent      │
│  - Summarize actions  │
│  - Log results        │
└──────────┬────────────┘
           ↓
Response returned to frontend
           ↓
Dashboard displays results
```

---

## UEBA Security Flow

```
User Action
    ↓
Monitor captures event
    ↓
Behavior Analysis
    ↓
Pattern Detection
    ↓
Risk Assessment
    ↓
Policy Check
    ↓
┌─────────────────┐
│  Risk > 70?     │
└────┬────────────┘
     ↓ YES        ↓ NO
2FA Required    Allow Access
     ↓              ↓
Verify User     Normal Flow
     ↓
Session Monitored
```

---

## Key Algorithms

### Priority Calculation
```
IF brake_temp > 300 OR battery_voltage < 12.0:
  priority = HIGH
  days_to_failure = 3-7 days
ELIF brake_temp > 250 OR battery_voltage < 12.5:
  priority = MEDIUM
  days_to_failure = 7-14 days
ELSE:
  priority = LOW
  days_to_failure = >14 days
```

### Confidence Scoring
```
confidence = (
  sensor_reliability * 0.3 +
  historical_accuracy * 0.3 +
  data_quality * 0.2 +
  model_certainty * 0.2
)
```

### UEBA Risk Scoring
```
risk_score = (
  access_frequency * 30 +
  unusual_timing * 25 +
  permission_anomaly * 25 +
  geographic_deviation * 20
)

IF risk_score > 70:
  trigger_2FA()
  monitor_session()
```

---

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm 8+

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access
- Frontend: http://localhost:3000 (or auto-incremented port)
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## File Structure

```
agentic-nexus/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── agents/                 # AI agent implementations
│   │   ├── data_analysis_agent.py
│   │   ├── diagnosis_agent.py
│   │   ├── master_agent.py
│   │   ├── engagement_agent.py
│   │   ├── scheduling_agent.py
│   │   └── feedback_agent.py
│   ├── graph/                  # LangGraph workflow
│   │   ├── workflow.py
│   │   ├── state.py
│   │   └── nodes.py
│   ├── services/               # External services
│   │   ├── telematics.py
│   │   └── scheduler_api.py
│   ├── ueba/                   # Security monitoring
│   │   ├── monitor.py
│   │   └── policies.py
│   └── data/                   # Data files
│       ├── vehicles.csv
│       └── maintenance_history.csv
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx            # Entry point
│   │   ├── App.tsx             # Main app component
│   │   ├── components/         # React components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ManufacturingInsights.tsx
│   │   │   ├── Security.tsx
│   │   │   ├── VoiceAgent.tsx
│   │   │   └── ui/             # UI components
│   │   ├── api/                # API clients
│   │   └── styles/             # CSS files
│   ├── package.json            # Dependencies
│   ├── tsconfig.json           # TypeScript config
│   └── vite.config.ts          # Vite config
│
└── README.md
```

---

## Future Enhancements

1. **Machine Learning Models**
   - Advanced failure prediction using ML
   - Anomaly detection models
   - Time series forecasting

2. **Extended Features**
   - Multi-vehicle batch processing
   - Fleet-wide analytics dashboard
   - Mobile app integration
   - SMS/Email notifications

3. **Integration**
   - OEM telematics platforms
   - Workshop management systems
   - ERP integration
   - Payment gateway

4. **Enhanced Security**
   - Advanced threat detection
   - Blockchain audit trails
   - Zero-trust architecture

---

## Conclusion

Agentic Nexus represents a cutting-edge approach to autonomous vehicle maintenance, combining AI agents, predictive analytics, and automated workflows to reduce downtime, improve customer satisfaction, and optimize fleet operations.

**Key Benefits:**
- ✅ Reduced vehicle downtime
- ✅ Proactive maintenance scheduling
- ✅ Automated customer engagement
- ✅ Cost savings through early detection
- ✅ Enhanced security with UEBA
- ✅ Data-driven insights for manufacturing

---

**Document Version:** 1.0  
**Last Updated:** December 17, 2025  
**Author:** Agentic Nexus Team
