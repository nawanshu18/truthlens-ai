from sqlalchemy import create_engine
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text

from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker


DATABASE_URL = "sqlite:///videos.db"


engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)


SessionLocal = sessionmaker(
    bind=engine
)


Base = declarative_base()


class VideoAnalysis(Base):

    __tablename__ = "video_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    video_name = Column(
        String
    )

    transcription = Column(
        Text
    )

    ocr_text = Column(
        Text
    )

    prediction = Column(
        String
    )

    confidence = Column(
        Float
    )

    trust_score = Column(
        Float
    )

    category = Column(
        String
    )

    risk_reasons = Column(
        Text
    )

    suspicious_keywords = Column(
        Text
    )

    deepfake_status = Column(
        String
    )

    deepfake_score = Column(
        Float,
        nullable=True
    )


Base.metadata.create_all(
    bind=engine
)