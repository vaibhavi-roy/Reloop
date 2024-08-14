from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import tensorflow as tf

app = FastAPI()

# Load your model
model_return = tf.keras.models.load_model('model_return.h5')
model_exchange = tf.keras.models.load_model('model_exchange.h5')

class PredictionRequest(BaseModel):
    Lag_Total_Returns: float
    Lag_Total_Exchanges: float
    Rolling_Returns: float
    Rolling_Exchanges: float

def preprocess_data(data):
    # Convert input data to the correct format for the model
    # Example preprocessing (adjust as needed)
    X = np.array([
        [data.Lag_Total_Returns, data.Lag_Total_Exchanges, data.Rolling_Returns, data.Rolling_Exchanges]
    ])
    X = X.reshape((X.shape[0], 1, X.shape[1]))
    return X

@app.post("/predict_returns")
async def predict_returns(request: PredictionRequest):
    try:
        X = preprocess_data(request)
        prediction_raw = model_return.predict(X)[0][0]
        
        # Convert prediction to percentage
        prediction_percentage = min(max(prediction_raw / 100, 0), 100)  # Ensure the value is between 0% and 100%
        
        return {"prediction": prediction_percentage*100}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error making prediction: {str(e)}")

@app.post("/predict_exchanges")
async def predict_exchanges(request: PredictionRequest):
    try:
        X = preprocess_data(request)
        prediction_raw = model_exchange.predict(X)[0][0]
        
        # Convert prediction to percentage
        prediction_percentage = min(max(prediction_raw / 100, 0), 100)  # Ensure the value is between 0% and 100%
        
        return {"prediction": prediction_percentage*100 }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error making prediction: {str(e)}")
