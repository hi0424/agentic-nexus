const API_BASE = "http://localhost:8000";

/**
 * Core backend call
 */
export async function fetchVehicleRun(vehicleId: string) {
  const res = await fetch(`${API_BASE}/run/${vehicleId}`);

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}

export async function fetchVehicles() {
  return [
    { vehicle_id: "V001" },
    { vehicle_id: "V002" },
    { vehicle_id: "V003" },
    { vehicle_id: "V004" },
    { vehicle_id: "V005" },
    { vehicle_id: "V006" },
    { vehicle_id: "V007" },
    { vehicle_id: "V008" },
    { vehicle_id: "V009" },
    { vehicle_id: "V010" }
  ];
}

export async function fetchTelemetry(vehicleId: string) {
  const data = await fetchVehicleRun(vehicleId);
  return data.telemetry;
}

export async function fetchHistory(vehicleId: string, count = 12) {
  const data = await fetchVehicleRun(vehicleId);
  return (data.diagnosis?.past_issues || []).slice(0, count);
}
