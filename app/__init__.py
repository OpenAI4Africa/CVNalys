from flask import Flask, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()


def _parse_origins(raw: str) -> list:
    if not raw or not raw.strip():
        return []
    return [o.strip() for o in raw.split(",") if o.strip()]


def create_app():
    app = Flask(__name__)

    # Configuration
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")
    app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16MB max file size
    app.config["UPLOAD_FOLDER"] = "uploads"
    app.config["ALLOWED_EXTENSIONS"] = {"pdf", "docx", "doc", "txt", "rtf"}

    _prod = os.environ.get("FLASK_ENV", "").lower() == "production" or os.environ.get(
        "PRODUCTION", ""
    ).lower() in ("1", "true", "yes")
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_SECURE"] = _prod

    # Restrict CORS to explicit origins when set; otherwise same-origin browser use needs no broad CORS
    _cors_origins = _parse_origins(os.environ.get("CORS_ORIGINS", ""))
    if _cors_origins:
        CORS(
            app,
            resources={r"/*": {"origins": _cors_origins}},
            supports_credentials=False,
        )

    @app.after_request
    def _security_headers(response):
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault(
            "Permissions-Policy",
            "geolocation=(), microphone=(), camera=(), payment=()",
        )
        if request.path.startswith("/static/") or request.path == "/favicon.ico":
            response.headers.setdefault(
                "Cache-Control", "public, max-age=31536000, immutable"
            )
        return response

    # Ensure upload directory exists
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # Register blueprints
    from app.routes import main_bp

    app.register_blueprint(main_bp)

    return app
