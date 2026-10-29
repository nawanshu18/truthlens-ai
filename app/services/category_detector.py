def detect_category(text):

    text = text.lower()

    if any(word in text for word in [
        "trump",
        "biden",
        "election",
        "president",
        "government",
        "war",
        "ukraine",
        "russia"
    ]):
        return "Politics"

    if any(word in text for word in [
        "vaccine",
        "covid",
        "doctor",
        "medicine",
        "health"
    ]):
        return "Health"

    if any(word in text for word in [
        "bitcoin",
        "crypto",
        "stock",
        "investment"
    ]):
        return "Finance"

    if any(word in text for word in [
        "study",
        "education",
        "learning",
        "course",
        "student"
    ]):
        return "Education"

    if any(word in text for word in [
        "motivation",
        "success",
        "discipline",
        "hard work"
    ]):
        return "Motivation"

    return "General"