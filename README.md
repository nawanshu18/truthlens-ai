TruthLens AI 🔍

Real-Time Misinformation Detection on Short-Form Videos

TruthLens AI is an AI-powered web application designed to analyze short-form videos and identify potentially misleading information. It processes video content using speech-to-text transcription, optical character recognition (OCR), text classification, and suspicious keyword analysis to generate an informative risk assessment.

The application provides an interactive dashboard where users can upload videos, review analysis results, explore previous analyses, and generate reports.

🚀 Features

* Video Upload: Upload short videos for automated analysis.
* Speech-to-Text: Extract spoken content using Faster Whisper.
* OCR Analysis: Extract visible text from video frames using EasyOCR.
* Misinformation Classification: Analyze extracted text using a trained machine learning model.
* Suspicious Keyword Detection: Identify potentially misleading keywords and phrases.
* Risk Assessment: Present classification results and an application-generated trust score.
* Category Detection: Categorize analyzed content.
* Analysis History: Review previous video analyses.
* Analytics Dashboard: Visualize analysis statistics and trends.
* PDF Reports: Generate downloadable reports containing analysis results.
* Responsive Interface: Access project features through a React-based web interface.

Disclaimer: TruthLens AI provides an automated preliminary assessment, not a definitive fact-check. Model predictions can be incorrect. Results should be independently verified using reliable sources. Deepfake detection is not a fully implemented feature.

🛠️ Technology Stack

Frontend

* React
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

Artificial Intelligence and Machine Learning

* Faster Whisper — speech transcription
* EasyOCR — text extraction from video frames
* Scikit-learn — machine learning classification
* TF-IDF — text feature extraction
* Logistic Regression / trained classification model
* PyTorch — underlying machine learning framework

Video and Data Processing

* FFmpeg — audio/video processing
* OpenCV — image and frame processing
* NumPy — numerical operations
* Pandas — data processing

Development and Deployment

* Git and GitHub
* Visual Studio Code
* Render — backend deployment
* Vercel — frontend deployment (if configured)

🏗️ Project Architecture

TruthLens-AI/
│
├── app/                          # FastAPI backend
│   ├── main.py                   # Application entry point
│   ├── database/
│   │   └── db.py                 # Database configuration
│   ├── models/
│   │   ├── fake_news_model.pkl   # Trained ML model
│   │   └── vectorizer.pkl        # TF-IDF vectorizer
│   ├── routes/
│   │   └── upload.py             # Video analysis API routes
│   └── services/
│       ├── audio_extractor.py    # Audio extraction
│       ├── category_detector.py  # Content categorization
│       ├── classifier.py         # Misinformation classification
│       ├── deepfake_detector.py  # Deepfake detection module
│       ├── explainer.py          # Analysis explanations
│       ├── keyword_checker.py    # Suspicious keyword analysis
│       ├── ocr_extractor.py      # Text extraction from frames
│       ├── preprocessing.py      # Text preprocessing
│       ├── report_generator.py   # Report generation
│       └── transcriber.py        # Speech transcription
│
├── frontend/                     # React + Vite frontend
│   ├── public/                   # Static assets
│   └── src/
│       ├── components/           # Reusable UI components
│       ├── pages/                # Application pages
│       ├── services/
│       │   └── api.js            # Backend API integration
│       ├── App.jsx               # Main React component
│       ├── App.css               # Application styling
│       └── index.css             # Global styling
│
├── requirements.txt              # Python dependencies
├── render.yaml                   # Render deployment configuration
├── train_model.py                # Model training script
└── README.md                     # Project documentation

The structure above summarizes the principal files. Your repository may contain additional configuration and supporting files.

⚙️ Installation and Setup

Prerequisites

Install the following:

* Python 3.11 (recommended for the configured deployment)
* Node.js and npm
* FFmpeg
* Git

1. Clone the Repository

git clone -b deploy-clean https://github.com/nawanshu18/truthlens-ai.git
cd truthlens-ai

2. Set Up the Backend

Create and activate a virtual environment.

macOS/Linux:

python3 -m venv venv
source venv/bin/activate

Install the Python dependencies:

pip install -r requirements.txt

If FFmpeg is not installed on macOS:

brew install ffmpeg

3. Start the Backend

From the project root, run:

uvicorn app.main:app --reload

The backend will be available at:

* API: http://127.0.0.1:8000
* Interactive API documentation: http://127.0.0.1:8000/docs

Keep the backend terminal running.

4. Set Up the Frontend

Open a second terminal:

cd frontend
npm install
npm run dev

Vite will display the local frontend address, typically:

http://localhost:5173

Open the displayed address in your browser.

🔄 How It Works

1. Upload: The user uploads a video through the web interface.
2. Audio Extraction: The application extracts audio from the uploaded video.
3. Transcription: Faster Whisper converts spoken audio into text.
4. OCR: EasyOCR extracts visible text from selected video frames.
5. Text Processing: Extracted text is processed and prepared for analysis.
6. Classification: The trained machine learning model analyzes the text and produces a prediction.
7. Risk Assessment: The application combines available analysis results into a risk-oriented presentation.
8. Results: The dashboard displays the analysis, classification, and associated indicators.
9. History and Reporting: Users can review previous analyses and generate reports.

The precise behavior and availability of individual steps depend on the implementation and the uploaded video.

📡 API Endpoints

The backend includes the following principal endpoints:

Method	Endpoint	Purpose
GET	/	Check whether the API is running
POST	/analyze-video	Upload and analyze a video
GET	/history	Retrieve analysis history
GET	/generate-report/{video_id}	Generate a report for a video analysis

Use the interactive API documentation at /docs to inspect request parameters and response formats.

🧠 Machine Learning Model

The project includes serialized machine learning artifacts:

* app/models/fake_news_model.pkl
* app/models/vectorizer.pkl

The model processes text using the configured vectorizer and classifier to predict whether the content resembles patterns learned from the training dataset.

The quality of predictions depends on the training data, preprocessing, model performance, and the content being analyzed. A model prediction alone does not establish whether a claim is true or false.

🔐 Data and Privacy

* Uploaded videos are processed by the backend.
* Analysis history is stored using SQLite in the configured local database.
* Temporary audio files and generated reports may be stored during processing.
* Deployment storage may be temporary, depending on the hosting configuration.

Do not upload confidential or sensitive videos unless you understand how they are processed and stored. Configure persistent storage and suitable access controls before using the application for production workloads.

🚀 Deployment

Backend — Render

The repository contains a render.yaml configuration for deploying the FastAPI backend.

Typical commands:

Build:

pip install -r requirements.txt

Start:

uvicorn app.main:app --host 0.0.0.0 --port $PORT

The backend must successfully start and remain within the hosting service’s resource limits.

Frontend — Vercel

1. Import the GitHub repository into Vercel.
2. Set the root directory to frontend.
3. Use npm run build as the build command.
4. Set the output directory to dist.
5. Configure VITE_API_BASE_URL to the deployed backend URL, provided the frontend API service is configured to read that variable.

Important: The frontend API configuration must point to the deployed backend rather than 127.0.0.1 for a public deployment. Verify the environment variable handling and CORS configuration before publishing.

⚠️ Limitations

* Machine learning predictions are probabilistic and may be incorrect.
* The system does not independently verify every claim against authoritative sources.
* Speech transcription and OCR accuracy depend on audio quality, language, image quality, and video content.
* Processing large videos may require substantial memory and processing time.
* Free hosting instances may not have sufficient memory for all AI dependencies.
* SQLite, uploaded files, and generated reports may not persist across redeployments on ephemeral hosting.
* Deepfake detection should not be represented as operational unless a working detector is integrated and tested.

🔮 Future Enhancements

* Integrate reliable external fact-checking sources.
* Improve multilingual transcription and classification.
* Add evidence retrieval and claim verification.
* Integrate and evaluate a dedicated deepfake detection model.
* Improve model explainability and confidence calibration.
* Add persistent cloud storage and a production database.
* Optimize model loading, caching, and inference performance.
* Introduce authentication, authorization, and usage monitoring.

👨‍💻 Contributors

Update this section with the names, roll numbers, and responsibilities of your project team members.

📄 License

No license is specified in this README. Add a suitable open-source license if you intend to permit public reuse or redistribution.

⸻

TruthLens AI — Analyze responsibly. Verify independently.
