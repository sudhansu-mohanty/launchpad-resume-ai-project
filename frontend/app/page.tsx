type HealthResponse = {
  status?: string;
};

async function getHealthStatus() {
  try {
    const response = await fetch("http://api:8000/health", {
      cache: "no-store"
    });

    if (!response.ok) {
      return { connected: false, message: `API error: ${response.status}` };
    }

    const data = (await response.json()) as HealthResponse;
    if (data.status === "ok") {
      return { connected: true, message: "Backend Connected" };
    }

    return { connected: false, message: "Backend returned unexpected payload" };
  } catch {
    return { connected: false, message: "Backend Not Reachable" };
  }
}

export default async function HomePage() {
  const health = await getHealthStatus();

  return (
    <main className="page">
      <section className="card">
        <h1>LaunchPad Resume AI</h1>
        <p>Phase 0 Infrastructure Check</p>
        <p className={health.connected ? "ok" : "error"}>{health.message}</p>
      </section>
    </main>
  );
}

