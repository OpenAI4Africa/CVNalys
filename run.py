import os
import socket

from app import create_app

app = create_app()

DEFAULT_PORT = 8000


def _port_available(port: int, host: str = "0.0.0.0") -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind((host, port))
        except OSError:
            return False
        return True


def _resolve_port() -> int:
    start = int(os.environ.get("PORT", str(DEFAULT_PORT)))
    for p in range(start, start + 128):
        if _port_available(p):
            if p != start:
                print(f"Port {start} is in use; using {p} instead.")
            return p
    raise RuntimeError(f"No free TCP port found starting from {start}")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=_resolve_port())
