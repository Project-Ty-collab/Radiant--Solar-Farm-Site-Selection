from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables

app = Flask(__name__)
CORS(app)

# Example Home Route
@app.route("/")
def home():
    return jsonify({"message": "Flask backend is running!"})

# Example POST API for site data
@app.route("/api/sites", methods=["POST"])
def save_site():
    data = request.json
    # Here you would save to DB
    return jsonify({"status": "success", "data": data})

if __name__ == "__main__":
    app.run(debug=True)
