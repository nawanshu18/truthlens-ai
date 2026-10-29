import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import About from "./pages/About";

import {
  analyzeVideo,
  getHistory,
} from "./services/api";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Fetch analysis history
  const fetchHistory = async () => {
    try {
      const data = await getHistory();

      setHistory(data);
    } catch (error) {
      console.error("History fetch error:", error);
    }
  };

  // Load history when app starts
  useEffect(() => {
    fetchHistory();
  }, []);

  // Analyze uploaded video
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video");
      return;
    }

    try {
      setLoading(true);

      const data = await analyzeVideo(file);

      setResult(data);

      // Refresh history after analysis
      await fetchHistory();

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <Dashboard
              file={file}
              setFile={setFile}
              handleUpload={handleUpload}
              loading={loading}
              result={result}
              history={history}
            />
          }
        />

        {/* History */}
        <Route
          path="/history"
          element={
            <History
              history={history}
            />
          }
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={
            <Analytics
              history={history}
            />
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;