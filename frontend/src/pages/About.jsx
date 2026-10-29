import {
  ShieldCheck,
  Brain,
  Video,
  FileText,
  Database,
  AlertTriangle,
} from "lucide-react";

function About() {
  return (
    <main className="bg-slate-950 min-h-screen text-white px-8 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center justify-center
            w-16 h-16 rounded-2xl bg-blue-500/20 mb-5">

            <ShieldCheck
              size={36}
              className="text-blue-400"
            />

          </div>

          <h1 className="text-4xl font-bold">
            About TruthLens AI
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            An AI-powered platform for analyzing videos
            and identifying potential misinformation signals.
          </p>

        </div>

        {/* Mission */}
        <div className="bg-slate-900 border border-slate-800
          rounded-2xl p-8 mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            What is TruthLens AI?
          </h2>

          <p className="text-gray-400 leading-7">
            TruthLens AI analyzes uploaded videos using
            multiple processing techniques including speech
            transcription, OCR, machine learning classification,
            suspicious keyword detection, content categorization,
            and risk analysis.
          </p>

        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <FeatureCard
            icon={<Video />}
            title="Video Analysis"
            description="Upload videos and process their audio and visual content."
          />

          <FeatureCard
            icon={<Brain />}
            title="AI Classification"
            description="Machine learning analyzes extracted text and provides a risk classification."
          />

          <FeatureCard
            icon={<FileText />}
            title="Speech & OCR"
            description="Extract spoken content and visible text from videos."
          />

          <FeatureCard
            icon={<AlertTriangle />}
            title="Risk Analysis"
            description="Identify suspicious keywords and generate risk explanations."
          />

          <FeatureCard
            icon={<Database />}
            title="Analysis History"
            description="Store previous video analyses and review them later."
          />

          <FeatureCard
            icon={<ShieldCheck />}
            title="AI-Assisted Reports"
            description="Generate downloadable PDF reports containing the analysis results."
          />

        </div>

        {/* Technology */}
        <div className="bg-slate-900 border border-slate-800
          rounded-2xl p-8 mt-8">

          <h2 className="text-2xl font-semibold mb-6">
            Technology Stack
          </h2>

          <div className="flex flex-wrap gap-3">

            {[
              "React",
              "Vite",
              "Tailwind CSS",
              "FastAPI",
              "Python",
              "SQLite",
              "Machine Learning",
              "Whisper",
              "OCR",
              "FFmpeg",
              "ReportLab",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-slate-800
                  border border-slate-700 rounded-lg
                  text-gray-300"
              >
                {tech}
              </span>
            ))}

          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 rounded-2xl
          bg-yellow-500/10 border border-yellow-500/20">

          <div className="flex gap-3">

            <AlertTriangle
              className="text-yellow-400 shrink-0"
            />

            <p className="text-sm text-gray-400 leading-6">
              TruthLens AI provides AI-assisted analysis.
              Its predictions and confidence scores should not
              be treated as proof that a claim is true or false.
              Important claims should be verified using reliable
              sources.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800
      rounded-2xl p-6 hover:border-blue-500/40
      transition">

      <div className="w-12 h-12 rounded-xl
        bg-blue-500/10 flex items-center justify-center
        text-blue-400 mb-5">

        {icon}

      </div>

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-6">
        {description}
      </p>

    </div>
  );
}

export default About;