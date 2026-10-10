import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { checkBackendHealth } from "./services/api";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking");
  const [backendMessage, setBackendMessage] = useState(
    "Checking the backend connection..."
  );

  const checkConnection = useCallback(async () => {
    setBackendStatus("Checking");
    setBackendMessage("Checking the backend connection...");

    try {
      const data = await checkBackendHealth();

      setBackendStatus("Connected");
      setBackendMessage(data.message || "Backend is running successfully.");
    } catch (error) {
      setBackendStatus("Disconnected");
      setBackendMessage(
        error.message || "Unable to connect to the backend."
      );
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const statusClass =
    backendStatus === "Connected"
      ? "connected"
      : backendStatus === "Checking"
        ? "checking"
        : "disconnected";

  return (
    <div className="app">
      <header className="navbar">
        <h1>AI Context Bridge</h1>

        <span className={`status ${statusClass}`}>
          ● {backendStatus}
        </span>
      </header>

      <main className="dashboard">
        <section className="welcome-card">
          <p className="eyebrow">YOUR AI WORKSPACE</p>

          <h2>Continue your AI journey.</h2>

          <p>
            Move your conversations and context between AI platforms
            without starting from scratch.
          </p>

          <button type="button" disabled>
            Get Started — Coming Soon
          </button>
        </section>

        <section className="connection-card">
          <h3>System Status</h3>

          <p>
            Backend: <strong>{backendStatus}</strong>
          </p>

          <p>{backendMessage}</p>

          <button
            type="button"
            onClick={checkConnection}
            disabled={backendStatus === "Checking"}
          >
            {backendStatus === "Checking"
              ? "Checking..."
              : "Retry Connection"}
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;