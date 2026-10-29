import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

from app.services.preprocessing import clean_text

# Load dataset
df = pd.read_csv("dataset/processed_news.csv")
print("Dataset Size:", len(df))

# Clean text
df['text'] = df['text'].apply(clean_text)

# Features and labels
X = df['text']
y = df['label']

# Convert text into vectors
vectorizer = TfidfVectorizer(max_features=5000)

X_vectorized = vectorizer.fit_transform(X)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = LogisticRegression()

model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, predictions)

print("Accuracy:", accuracy)

# Save model
joblib.dump(model, "app/models/fake_news_model.pkl")
joblib.dump(vectorizer, "app/models/vectorizer.pkl")

print("Model Saved Successfully")
