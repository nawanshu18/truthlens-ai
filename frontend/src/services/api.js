const API_BASE_URL = "http://127.0.0.1:8000";

/* ----------------------------- */
/* Analyze Video */
/* ----------------------------- */

export async function analyzeVideo(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/analyze-video`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Video analysis failed.");
  }

  return await response.json();
}


/* ----------------------------- */
/* Get Analysis History */
/* ----------------------------- */

export async function getHistory() {
  const response = await fetch(
    `${API_BASE_URL}/history`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch analysis history.");
  }

  const data = await response.json();

  return data.data || [];
}


/* ----------------------------- */
/* Download PDF Report */
/* ----------------------------- */

export async function downloadReport(videoId) {
  if (!videoId) {
    throw new Error("Video ID is missing.");
  }

  const response = await fetch(
    `${API_BASE_URL}/generate-report/${videoId}`
  );

  if (!response.ok) {
    throw new Error("Failed to generate report.");
  }

  return await response.blob();
}


/* ----------------------------- */
/* API Base URL */
/* ----------------------------- */

export { API_BASE_URL };