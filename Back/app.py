from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# OpenAI API Configuration
URL = "your url "
HEADERS = {
    "Content-Type": "application/json",
    "api-key": "yourapikey",
}
logging.basicConfig(level=logging.DEBUG)
@app.route('/analyze_code', methods=['POST'])
def analyze_code():
    if request.content_type != 'application/json':
        return jsonify({"error": "Content-Type must be application/json"}), 415
    app.logger.info("Request received")
    data = request.json
    code_to_test = data.get('code')

    payload = {
        "messages": [
            {
                "role": "system",
                "content": "You are a professional hacker that works on the source code to detect security code best practices, vulnerabilities and security functions in the code",
            },
            {
                "role": "user",
                "content": """Analyze the provided code for security vulnerabilities. For each identified vulnerability, provide the following information in JSON format:

                Vulnerability: The name of the vulnerability.
                Description: A comprehensive description of the vulnerability, including how it can be exploited and its potential impact on the system.
                Priority: The priority level of addressing this vulnerability (e.g., High, Medium, Low), based on factors such as exploitability and potential damage.
                Risk: The risk level of the vulnerability (e.g., Critical, High, Medium, Low), indicating the severity and likelihood of exploitation.
                Status: The current status of the vulnerability (e.g., Open, Closed, Resolved). If security measures are implemented to address the vulnerability, set the status to "Resolved".
                CWE: The Common Weakness Enumeration identifier for the vulnerability, providing a reference to a specific category of weaknesses.
                Recommendation: How to mitigate the vulnerability briefly.
                Implemented Security Measures: The security code configuration or functions already implemented (e.g., parameterized queries for SQL, CSRF tokens, secure cookie flags, input validation, output encoding).

                In addition to identifying vulnerabilities, provide a detailed analysis of the existing security measures in the code. If any security measures are already in place and fully mitigate the vulnerability, mark the status as "Resolved" and describe the security measures detected. If the security measures are insufficient, include the vulnerability and explain how it can be bypassed and what additional measures should be implemented to fully address it.
                """,
            },
            {"role": "user", "content": code_to_test},
        ],
        "temperature": 0.5,
        "top_p": 0.9,
    }
 
    response = requests.post(URL, headers=HEADERS, data=json.dumps(payload))
    result = response.json()
    # with open('response.txt', 'w') as file:
    #             file.write(json.dumps(result, indent=4))
    # file.close()
    # # app.logger.info(result)
    
    # Assuming 'result' contains the API response
    # with open("response.txt", "r") as file:
    #      result = json.load(file)
    if "choices" in result and len(result["choices"]) > 0:
        message = result["choices"][0]["message"]["content"]
        try:
            # Extract the JSON string within the triple backticks
            json_start = message.find("```json")
            json_end = message.find("```", json_start + 7)
            
            if json_start != -1 and json_end != -1:
                json_content = message[json_start + 7:json_end].strip()
                vulnerabilities = json.loads(json_content)
                
                # with open('response_vulner.json', 'w') as file:
                #     json.dump(vulnerabilities, file, indent=4)
                    
                return jsonify({"Vulnerabilities": vulnerabilities, "Security measures": []}), 200
            else:
                return jsonify({"error": "JSON content not found in the response"}), 500
            
        except json.JSONDecodeError:
            return jsonify({"error": "Error decoding JSON response"}), 500
    else:
        return jsonify({"error": "No vulnerabilities detected or response format is unexpected"}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
