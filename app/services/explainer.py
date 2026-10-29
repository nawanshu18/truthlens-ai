def explain_content(text):
    """
    Detect rule-based risk indicators from extracted text.

    This function does not determine whether content is
    factually true or false. It only identifies content
    patterns that may require additional review.
    """

    text = text.lower()

    reasons = []

    political_words = [
        "trump",
        "biden",
        "president",
        "election",
        "government",
        "russia",
        "ukraine",
        "war",
        "politics"
    ]

    health_words = [
        "vaccine",
        "covid",
        "medicine",
        "doctor",
        "disease"
    ]

    finance_words = [
        "bitcoin",
        "crypto",
        "stock",
        "investment",
        "money"
    ]

    future_words = [
        "will",
        "guaranteed",
        "certainly",
        "100%",
        "promise"
    ]

    suspicious_claim_words = [
        "breaking",
        "shocking",
        "secret",
        "exposed",
        "fake",
        "scam",
        "urgent",
        "miracle",
        "must share",
        "everyone needs to know"
    ]

    if any(word in text for word in political_words):
        reasons.append(
            "Contains political or geopolitical content"
        )

    if any(word in text for word in health_words):
        reasons.append(
            "Contains health-related claims"
        )

    if any(word in text for word in finance_words):
        reasons.append(
            "Contains financial or investment claims"
        )

    if any(word in text for word in future_words):
        reasons.append(
            "Contains future or predictive claims"
        )

    if any(word in text for word in suspicious_claim_words):
        reasons.append(
            "Contains potentially sensational or high-risk claim language"
        )

    return reasons