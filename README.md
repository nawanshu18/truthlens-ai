🔍 TruthLens AI

Real-Time Misinformation Detection on Short-Form Videos

📌 About the Project

TruthLens AI is an AI-powered web application that analyzes short-form videos to identify potentially misleading information. It uses speech recognition, OCR, and machine learning to analyze video content and present results through an interactive dashboard.

✨ Features

* 🎥 Video Upload and Analysis
* 🎙️ Speech-to-Text using Faster Whisper
* 📝 Text Extraction using EasyOCR
* 🤖 Machine Learning-Based Text Classification
* 🔎 Suspicious Keyword Detection
* 📊 Risk Assessment and Trust Score
* 📜 Analysis History
* 📈 Analytics Dashboard
* 📄 PDF Report Generation

🛠️ Tech Stack

* Frontend: React.js, Vite, JavaScript, CSS
* Backend: Python, FastAPI
* Machine Learning: Scikit-learn, TF-IDF, PyTorch
* OCR: EasyOCR
* Speech Recognition: Faster Whisper
* Video Processing: FFmpeg, OpenCV
* Database: SQLite
* Deployment: Render and Vercel (if configured)

🏗️ Project Architecture

User
  |
  v
React Frontend
  |
  v
FastAPI Backend
  |
  v
Video Processing
  |
  +--> Audio Extraction --> Faster Whisper
  |
  +--> Frame Text Extraction --> EasyOCR
  |
  v
Text Processing
  |
  v
Machine Learning Classification
  |
  v
Analysis Results and Reports

⚙️ Installation and Setup

1. Clone the Repository

git clone -b deploy-clean https://github.com/nawanshu18/truthlens-ai.git
cd truthlens-ai

2. Set Up the Backend

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

3. Run the Backend

uvicorn app.main:app --reload

Backend: http://127.0.0.1:8000

API Documentation: http://127.0.0.1:8000/docs

4. Run the Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Open the local URL displayed by Vite, usually http://localhost:5173.

📡 API Endpoints

Method	Endpoint	Description
GET	/	Check API status
POST	/analyze-video	Analyze a video
GET	/history	View analysis history
GET	/generate-report/{video_id}	Generate a report

⚠️ Limitations

* Predictions may be inaccurate and require independent verification.
* Transcription and OCR depend on audio and video quality.
* Large videos may require significant processing resources.
* Deepfake detection should not be considered functional unless a working detector is integrated and tested.

🔮 Future Enhancements

* Integration with trusted fact-checking sources
* Multilingual video analysis
* Improved model accuracy
* Dedicated deepfake detection
* Cloud storage and database integration

👨‍💻 Contributors

Add your project team members’ names and roll numbers here.

📄 License

No license has been specified for this project.

⸻

TruthLens AI — Analyze Responsibly. Verify Independently.
