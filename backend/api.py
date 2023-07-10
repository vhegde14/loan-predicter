from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import traceback

app = Flask(__name__)
cors = CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if lr_model:
        try:
            print(request)
            _json = request.json
            print(_json)
            query = pd.get_dummies(pd.DataFrame(_json, index=[0]))
            query = query.reindex(columns=model_columns, fill_value=0)

            prediction = list(lr_model.predict(query))

            return jsonify({'prediction': str(prediction)})
        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        return 'No model found'
 
if __name__ == '__main__':
    port = 8081

    lr_model = joblib.load("model.pkl") # Load "model.pkl"
    print ('Model loaded')
    model_columns = joblib.load("model_columns.pkl") # Load "model_columns.pkl"
    print ('Model columns loaded')

    app.run(port=port, debug=True)