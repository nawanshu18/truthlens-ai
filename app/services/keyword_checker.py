SUSPICIOUS_KEYWORDS = [

    "microchip",
    "flat earth",
    "bleach cure",
    "dna change",
    "5g",
    "fake moon landing",
    "conspiracy",
    "mind control",
    "secret government",
    "virus hoax"
]

def detect_keywords(text):

    text_lower = text.lower()

    detected = []

    for keyword in SUSPICIOUS_KEYWORDS:

        if keyword in text_lower:
            detected.append(keyword)

    return detected