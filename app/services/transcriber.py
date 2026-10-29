from faster_whisper import WhisperModel

model = None

def transcribe_audio(audio_path):
    global model

    if model is None:
        model = WhisperModel(
            "tiny",
            device="cpu",
            compute_type="int8"
        )

    segments, info = model.transcribe(audio_path)
    return " ".join(segment.text for segment in segments).strip()