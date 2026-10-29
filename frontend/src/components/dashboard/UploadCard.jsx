import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { filesize } from "filesize";

import {
  UploadCloud,
  FileVideo,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function UploadCard({
  file,
  setFile,
  handleUpload,
  loading,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [setFile]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "video/*": [],
    },
  });

  return (
    <Card className="bg-slate-900 border-slate-800 shadow-xl h-full">

      <CardContent className="p-10">

        <div className="text-center mb-8">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20">

            <UploadCloud className="h-10 w-10 text-blue-400" />

          </div>

          <h2 className="text-3xl font-bold text-white">
            Upload Video
          </h2>

          <p className="mt-3 text-slate-400">
            Drag & drop your video or click below
          </p>

          <p className="text-sm text-slate-500 mt-1">
            MP4 • MOV • AVI • MKV
          </p>

        </div>

        <div
          {...getRootProps()}
          className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300
          ${
            isDragActive
              ? "border-blue-500 bg-blue-500/10 scale-[1.01]"
              : "border-slate-700 hover:border-blue-500 hover:bg-slate-800/40"
          }`}
        >

          <input {...getInputProps()} />

          {!file ? (
            <>
              <UploadCloud className="mx-auto h-16 w-16 text-slate-500 mb-6" />

              <h3 className="text-xl font-semibold text-white">
                {isDragActive
                  ? "Drop your video here"
                  : "Drag & Drop Video"}
              </h3>

              <p className="mt-2 text-slate-400">
                or click anywhere to browse files
              </p>

              <Button
                className="mt-8"
                type="button"
              >
                Browse Files
              </Button>
            </>
          ) : (
            <div className="space-y-5">

              <FileVideo className="mx-auto h-14 w-14 text-blue-400" />

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {file.name}
                </h3>

                <p className="text-slate-400 mt-1">
                  {filesize(file.size)}
                </p>

              </div>

              <div className="flex justify-center items-center gap-2 text-emerald-400">

                <CheckCircle2 size={18} />

                Ready for AI Analysis

              </div>

            </div>
          )}

        </div>

        <div className="mt-8">

          <Button
            size="lg"
            disabled={!file || loading}
            onClick={handleUpload}
            className="w-full"
          >
            <Sparkles className="mr-2 h-5 w-5" />

            {loading
              ? "Analyzing Video..."
              : "Analyze with AI"}
          </Button>

          {loading && (

            <div className="mt-6">

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                <div className="h-full w-full animate-pulse rounded-full bg-blue-500" />

              </div>

              <div className="mt-4 text-center text-sm text-slate-400">

                <p>🎙️ Extracting Speech...</p>

                <p>📝 Reading OCR Text...</p>

                <p>🤖 Running AI Detection...</p>

              </div>

            </div>

          )}

        </div>

      </CardContent>

    </Card>
  );
}

export default UploadCard;