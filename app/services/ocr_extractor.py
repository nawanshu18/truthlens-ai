import cv2
import easyocr

reader = easyocr.Reader(['en'])

def extract_text_from_video(video_path):

    cap = cv2.VideoCapture(video_path)

    extracted_text = ""

    frame_count = 0

    while cap.isOpened():

        success, frame = cap.read()

        if not success:
            break

        # Process every 60th frame
        if frame_count % 60 == 0:

            results = reader.readtext(frame)

            for result in results:

                extracted_text += result[1] + " "

        frame_count += 1

    cap.release()

    return extracted_text