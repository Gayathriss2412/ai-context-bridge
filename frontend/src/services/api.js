const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function checkBackendHealth() {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Backend health check failed.");
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Connection timed out. Please try again.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}