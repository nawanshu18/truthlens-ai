import subprocess
import os

AUDIO_FOLDER = "temp_audio"

os.makedirs(AUDIO_FOLDER, exist_ok=True)

def extract_audio(video_path):

    audio_path = os.path.join(
        AUDIO_FOLDER,
        "audio.wav"
    )

    command = [
        "ffmpeg",
        "-i", video_path,
        "-ar", "16000",
        "-ac", "1",
        audio_path,
        "-y"
    ]

    subprocess.run(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    return audio_path