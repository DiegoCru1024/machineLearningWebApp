from flask import Flask, request, jsonify

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'https://zesty-alpaca-99e0b5.netlify.app'
    return response


@app.route('/api', methods=['POST'])
def return_data():
    data = request.get_json()
    response = {
        'status': 200,
        'message': data['name']
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run()
