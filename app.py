from flask import Flask, jsonify
from sqlalchemy.engine import create_engine

engine = create_engine("sqlite:///DataFiles/SAEXP1")

app = Flask(__name__)

@app.route("/")
def home():
    result = engine.execute("select * from us_expenditures")
    rows = result.fetchall()
    result_list = []
    for r in rows:
        result_list.append(dict(r))

    return jsonify(result_list)

@app.route("/api/v1.0")
def all_data():
    result = engine.execute("select * from us_expenditures")
    rows = result.fetchall()
    result_list = []
    for r in rows:
        result_list.append(dict(r))

    return jsonify(result_list)

if __name__ == '__main__':
    app.run(debug=True)