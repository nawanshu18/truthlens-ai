import joblib

from app.services.preprocessing import clean_text

# Load trained model and vectorizer
model = joblib.load("app/models/fake_news_model.pkl")
vectorizer = joblib.load("app/models/vectorizer.pkl")


def predict_text(text):

    cleaned = clean_text(text)

    vectorized = vectorizer.transform([cleaned])

    prediction = model.predict(vectorized)[0]

    probabilities = model.predict_proba(vectorized)[0]

    # Get probability for each class
    class_probabilities = dict(
        zip(model.classes_, probabilities)
    )

    safe_probability = float(
        class_probabilities.get(0, 0)
    )

    risky_probability = float(
        class_probabilities.get(1, 0)
    )

    confidence = max(
        safe_probability,
        risky_probability
    )

    # Determine final label
    if confidence < 0.75:
        label = "Uncertain"
    elif prediction == 1:
        label = "Risky"
    else:
        label = "Safe"

    # Trust = probability that content belongs to Safe class
    trust_score = round(
        safe_probability * 100,
        2
    )

    print("Prediction =", prediction)
    print("Safe Probability =", safe_probability)
    print("Risky Probability =", risky_probability)
    print("Confidence =", confidence)
    print("Trust Score =", trust_score)
    print("Final Label =", label)

    return {
        "label": label,
        "confidence": round(confidence, 2),
        "safe_probability": round(safe_probability, 2),
        "risky_probability": round(risky_probability, 2),
        "trust_score": trust_score
    }