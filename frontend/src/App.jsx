import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("Connecting...");
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        return response.json();
      })
      .then((data) => {
        setBackendStatus("Connected");
        setBackendMessage(data.message);
      })
      .catch(() => {
        setBackendStatus("Disconnected");
        setBackendMessage("Unable to connect to the backend.");
      });
  }, []);

  return (
    <div className="app">
      <header className="navbar">
        <h1>AI Context Bridge</h1>

        <span
          className={`status ${
            backendStatus === "Connected" ? "connected" : "disconnected"
          }`}
        >
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
        </section>
      </main>
    </div>
  );
}

export default App;