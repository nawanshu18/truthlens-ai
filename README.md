🔍 TruthLens AI

Real-Time Misinformation Detection on Short-Form Videos

<p align="center">
  <strong>AI-Powered Video Analysis • Speech Recognition • OCR • Machine Learning</strong>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11-blue?logo=python" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Machine%20Learning-Scikit--learn-orange?logo=scikitlearn" alt="Scikit-learn">
  <img src="https://img.shields.io/badge/Status-Development-yellow" alt="Development">
</p>

⸻

📌 Overview

TruthLens AI is an AI-powered web application designed to analyze short-form videos and identify potentially misleading information.

The system extracts spoken content and visible text from uploaded videos, processes the extracted information, and applies machine learning techniques to classify textual content. It presents analysis results through an interactive dashboard, helping users investigate potentially suspicious content.

The project combines speech recognition, Optical Character Recognition (OCR), Natural Language Processing (NLP), and machine learning in a single video analysis platform.

⚠️ Disclaimer: TruthLens AI provides preliminary, automated assessments. Its predictions are not definitive proof that information is true or false. Results should be independently verified using reliable sources.

⸻

✨ Features

* 🎥 Video Upload — Upload videos for automated analysis.
* 🎙️ Speech-to-Text — Extract spoken content using Faster Whisper.
* 📝 Text Extraction (OCR) — Identify visible text in video frames using EasyOCR.
* 🤖 Misinformation Classification — Analyze extracted text using a trained machine learning model.
* 🔎 Suspicious Keyword Detection — Identify potentially misleading keywords and phrases.
* 📊 Risk Assessment — Display classification results and application-generated trust scores.
* 🗂️ Category Detection — Categorize analyzed content.
* 📜 Analysis History — Review previously analyzed videos.
* 📈 Analytics Dashboard — Visualize analysis statistics and trends.
* 📄 PDF Reports — Generate reports containing analysis results.
* 🖥️ Interactive Interface — Navigate through dashboard, history, analytics, and project information.

⸻

🛠️ Technology Stack

Frontend

* React.js
* Vite
* JavaScript
* Tailwind CSS
* CSS
* Recharts
* Lucide React

Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* SQLite

Artificial Intelligence & Machine Learning

* Faster Whisper — Speech-to-text transcription
* EasyOCR — Optical Character Recognition
* Scikit-learn — Machine learning classification
* TF-IDF — Text feature extraction
* Logistic Regression / configured trained classifier
* PyTorch — Machine learning framework

Video & Data Processing

* FFmpeg — Audio and video processing
* OpenCV — Frame and image processing
* NumPy — Numerical computing
* Pandas — Data processing

Development & Deployment

* Git and GitHub
* Visual Studio Code
* Render — Backend hosting configuration
* Vercel — Frontend hosting, if configured

⸻

🏗️ System Architecture

                      ┌──────────────────────┐
                      │         User         │
                      └──────────┬───────────┘
                                 │
                                 ▼
                      ┌──────────────────────┐
                      │    React Frontend    │
                      │   Vite Web Interface │
                      └──────────┬───────────┘
                                 │
                                 ▼
                      ┌──────────────────────┐
                      │    FastAPI Backend   │
                      │   Video Upload API   │
                      └──────────┬───────────┘
                                 │
                  ┌──────────────┼──────────────┐
                  │              │              │
                  ▼              ▼              ▼
          ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
          │    Audio    │ │     OCR     │ │   Video     │
          │ Extraction  │ │ Text Extract│ │ Processing  │
          └──────┬──────┘ └──────┬──────┘ └─────────────┘
                 │               │
                 ▼               │
          ┌─────────────┐        │
          │ Faster      │        │
          │ Whisper     │        │
          └──────┬──────┘        │
                 │               │
                 └───────┬───────┘
                         │
                         ▼
                ┌──────────────────┐
                │  Text Processing │
                │  & Preprocessing │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Machine Learning │
                │   Classification │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Results, History │
                │  & PDF Reports   │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   User Dashboard │
                └──────────────────┘

⸻

📂 Project Structure

TruthLens-AI/
│
├── app/
│   ├── main.py
│   │
│   ├── database/
│   │   └── db.py
│   │
│   ├── models/
│   │   ├── fake_news_model.pkl
│   │   └── vectorizer.pkl
│   │
│   ├── routes/
│   │   └── upload.py
│   │
│   └── services/
│       ├── audio_extractor.py
│       ├── category_detector.py
│       ├── classifier.py
│       ├── deepfake_detector.py
│       ├── explainer.py
│       ├── keyword_checker.py
│       ├── ocr_extractor.py
│       ├── preprocessing.py
│       ├── report_generator.py
│       └── transcriber.py
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── charts/
│       │   ├── dashboard/
│       │   ├── layout/
│       │   └── ui/
│       ├── lib/
│       ├── pages/
│       ├── services/
│       │   └── api.js
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── requirements.txt
├── render.yaml
├── train_model.py
└── README.md

⸻

⚙️ Installation

📋 Prerequisites

Install the following tools before running the project:

* Python 3.11
* Node.js and npm
* Git
* FFmpeg

Install FFmpeg on macOS:

brew install ffmpeg

🚀 1. Clone the Repository

git clone -b deploy-clean https://github.com/nawanshu18/truthlens-ai.git

Navigate to the project directory:

cd truthlens-ai

🐍 2. Configure the Backend

Create a virtual environment:

python3 -m venv venv

Activate it on macOS/Linux:

source venv/bin/activate

Install the dependencies:

pip install -r requirements.txt

▶️ 3. Start the Backend

From the project root, execute:

uvicorn app.main:app --reload

The backend will run at:

* Backend API: http://127.0.0.1:8000
* Interactive API Documentation: http://127.0.0.1:8000/docs

Keep the backend terminal open.

⚛️ 4. Configure the Frontend

Open a new terminal window and run:

cd truthlens-ai/frontend

Install the frontend dependencies:

npm install

Start the development server:

npm run dev

Open the local URL displayed by Vite, usually:

http://localhost:5173

⸻

🔄 How It Works

Step 1: Video Upload

The user uploads a video through the React-based interface.

Step 2: Audio Extraction

The backend extracts the video’s audio for speech processing.

Step 3: Speech Recognition

Faster Whisper converts spoken audio into text.

Step 4: OCR Processing

EasyOCR extracts visible text from selected video frames.

Step 5: Text Preprocessing

The extracted text is cleaned and prepared for machine learning analysis.

Step 6: Machine Learning Classification

The trained model analyzes the processed text and generates a classification prediction.

Step 7: Risk Assessment

The application presents its classification, suspicious keyword findings, and associated risk indicators.

Step 8: Results and Reporting

The dashboard displays the results. Users can review analysis history and generate reports.

⸻

📡 API Endpoints

The backend provides the following principal endpoints:

Method	Endpoint	Description
GET	/	Check backend availability
POST	/analyze-video	Upload and analyze a video
GET	/history	Retrieve analysis history
GET	/generate-report/{video_id}	Generate an analysis report

For request parameters and response formats, start the backend and visit:

http://127.0.0.1:8000/docs

⸻

🧠 Machine Learning Model

TruthLens AI includes serialized model artifacts:

* fake_news_model.pkl
* vectorizer.pkl

The text-processing pipeline uses the configured vectorizer and trained classifier to analyze extracted textual content.

The resulting prediction depends on the training dataset, text preprocessing, model limitations, and the content being analyzed.

Important: A classifier prediction is not the same as independent verification against reliable sources. A high model score does not guarantee that a claim is accurate.

⸻

🔐 Data & Privacy

* Uploaded videos are processed by the backend.
* Analysis history is stored using SQLite.
* Temporary audio and generated reports may be saved during processing.
* Local files and database contents may not persist on hosting platforms that use ephemeral storage.
* Production deployments should use appropriate access controls and persistent storage.

Avoid uploading sensitive videos unless you understand how the application processes and stores them.

⸻

🚀 Deployment

Backend Deployment — Render

The repository includes a render.yaml configuration.

Build command:

pip install -r requirements.txt

Start command:

uvicorn app.main:app --host 0.0.0.0 --port $PORT

The backend must start successfully and stay within the hosting provider’s memory and processing limits.

Frontend Deployment — Vercel

1. Import the repository into Vercel.
2. Set the root directory to frontend.
3. Set the build command to npm run build.
4. Set the output directory to dist.
5. Configure the frontend API base URL to point to the deployed backend.
6. Ensure the backend CORS configuration permits requests from the deployed frontend origin.

The frontend’s API service must support the configured backend URL. Confirm this before deploying.

⸻

⚠️ Limitations

* Predictions may be incorrect or incomplete.
* The system does not independently verify every claim against authoritative sources.
* Speech transcription accuracy depends on audio quality, language, and background noise.
* OCR accuracy depends on text visibility, video resolution, and frame quality.
* Large videos can require significant memory and processing time.
* Free hosting plans may not have sufficient memory for all AI dependencies.
* SQLite data, uploaded videos, and generated reports may be lost when ephemeral hosting storage is reset.
* A dedicated, tested deepfake detection model is required before claiming reliable deepfake detection.

⸻

🔮 Future Enhancements

* 🌐 Multilingual misinformation analysis
* 🔎 Integration with trusted fact-checking sources
* 🧾 Automated claim extraction and evidence retrieval
* 🧠 Improved model explainability and confidence calibration
* 🎭 Integration of a dedicated deepfake detection model
* ☁️ Persistent cloud storage
* 🗄️ Production database integration
* ⚡ Faster inference and optimized model loading
* 🔐 User authentication and access control
* 📊 Advanced analytics and evaluation metrics

⸻

👨‍💻 Contributors

Project: TruthLens AI

Add the final project team’s details below:

Name	Roll Number	Role
Project Member 1	Add roll number	Development
Project Member 2	Add roll number	Development
Project Member 3	Add roll number	Testing / Documentation

Replace the placeholders with the actual team information before submission.

⸻

📄 License

No license has been specified. Add an appropriate license if you intend to permit others to reuse or redistribute this project.

⸻

<p align="center">
  <strong>🔍 TruthLens AI</strong><br>
  Analyze responsibly. Verify independently.
</p>
