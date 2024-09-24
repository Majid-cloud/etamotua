from flask import Flask, render_template, request, jsonify, send_file
import os
from testgem import insert_sgemini_prompt, run_db_query

app = Flask(__name__)

# Home page route
@app.route('/')
def index():
    return render_template('index.html')

# Handle user prompt and generate a response
@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.form.get('prompt')
    os_choice = request.form.get('os')
    print("@@@@@@@@@@@@@@@@@@@",os_choice)
    response = insert_sgemini_prompt(prompt, os_choice)
    print(response,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@WWww")
    output_filename = 'outputs/generated_script.py'
    with open(output_filename, 'w') as f:
        f.write(response)

    return jsonify({
        'response': response,
        'download_url': '/download'
    })

# Handle DB query generation
@app.route('/generate_query', methods=['POST'])
def generate_query():
    query_prompt = request.form.get('query_prompt')
    if not query_prompt:
        return jsonify({'db_query': 'No query prompt provided.'}), 400  # 400 Bad Request for missing input

    resp = run_db_query(query_prompt)
    
    output_filename = 'outputs/generated_query.py'
    with open(output_filename, 'w') as f:
        f.write(resp)

    return jsonify({
        'response': resp,
        'download_url': '/download_query'
    })

# Download the generated Python script
@app.route('/download', methods=['GET'])
def download():
    output_filename = 'outputs/generated_script.py'
    return send_file(output_filename, as_attachment=True, download_name='generated_script.py')

# Download the generated query
@app.route('/download_query', methods=['GET'])
def download_query():
    output_filename = 'outputs/generated_query.py'
    return send_file(output_filename, as_attachment=True, download_name='generated_query.py')

if __name__ == '__main__':
    if not os.path.exists('outputs'):
        os.makedirs('outputs')
    app.run(debug=True)
