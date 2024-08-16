import streamlit as st
import requests
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pydantic import BaseModel
import json

# Define the request model to match the FastAPI model
class PredictionRequest(BaseModel):
    Lag_Total_Returns: float
    Lag_Total_Exchanges: float
    Rolling_Returns: float
    Rolling_Exchanges: float

# Streamlit app layout
st.title('Returns and Exchanges Prediction Dashboard')

st.sidebar.header('Input Parameters')

# Input parameters
Lag_Total_Returns = st.sidebar.number_input('Lag Total Returns', min_value=0.0, max_value=1000.0, value=50.0, step=10.0)
Lag_Total_Exchanges = st.sidebar.number_input('Lag Total Exchanges', min_value=0.0, max_value=1000.0, value=50.0, step=10.0)
Rolling_Returns = st.sidebar.number_input('Rolling Returns', min_value=0.0, max_value=1000.0, value=50.0, step=10.0)
Rolling_Exchanges = st.sidebar.number_input('Rolling Exchanges', min_value=0.0, max_value=100.00, value=50.0, step=10.0)

# Create the PredictionRequest object
input_data = PredictionRequest(
    Lag_Total_Returns=Lag_Total_Returns,
    Lag_Total_Exchanges=Lag_Total_Exchanges,
    Rolling_Returns=Rolling_Returns,
    Rolling_Exchanges=Rolling_Exchanges
)

# Convert the request data to JSON
input_json = input_data.json()

# Function to make API call
def get_prediction(api_endpoint):
    try:
        response = requests.post(api_endpoint, data=input_json)
        response.raise_for_status()
        return response.json()['prediction']
    except requests.exceptions.RequestException as e:
        st.error(f"API call failed: {e}")
        return None

# Predict Returns
if st.button('Predict Returns'):
    prediction = get_prediction("http://127.0.0.1:8000/predict_returns")
    if prediction is not None:
        st.success(f"Predicted Returns: {prediction:.2f}%")
        
        # Simulated historical returns data
        historical_returns = np.random.uniform(0, 100, 12)  # Replace with actual data
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        # Visualize historical returns (no predicted returns line)
        st.subheader('Historical Returns Data')
        fig, ax = plt.subplots(figsize=(10, 5))
        sns.lineplot(x=months, y=historical_returns, ax=ax, marker='o', label='Historical Returns')
        ax.set_title('Historical Returns Over the Year')
        ax.set_xlabel('Month')
        ax.set_ylabel('Returns (%)')
        st.pyplot(fig)
        
        # Bar Chart for Monthly Returns (no predicted returns line)
        st.subheader('Monthly Returns Distribution')
        fig, ax = plt.subplots(figsize=(10, 5))
        sns.barplot(x=months, y=historical_returns, ax=ax, palette='viridis')
        ax.set_title('Monthly Returns')
        ax.set_xlabel('Month')
        ax.set_ylabel('Returns (%)')
        st.pyplot(fig)
        
        # Pie chart for contribution to yearly returns
        st.subheader('Contribution to Yearly Returns')
        fig, ax = plt.subplots(figsize=(6, 6))
        ax.pie(historical_returns, labels=months, autopct='%1.1f%%', colors=sns.color_palette('viridis', 12))
        ax.set_title('Monthly Contribution to Yearly Returns')
        st.pyplot(fig)

# Predict Exchanges
if st.button('Predict Exchanges'):
    prediction = get_prediction("http://127.0.0.1:8000/predict_exchanges")
    if prediction is not None:
        st.success(f"Predicted Exchanges: {prediction:.2f}%")

        # Simulated historical exchanges data
        historical_exchanges = np.random.uniform(0, 100, 12)  # Replace with actual data
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        # Visualize historical exchanges (no predicted exchanges line)
        st.subheader('Historical Exchanges Data')
        fig, ax = plt.subplots(figsize=(10, 5))
        sns.lineplot(x=months, y=historical_exchanges, ax=ax, marker='o', label='Historical Exchanges')
        ax.set_title('Historical Exchanges Over the Year')
        ax.set_xlabel('Month')
        ax.set_ylabel('Exchanges (%)')
        st.pyplot(fig)

        # Bar Chart for Monthly Exchanges (no predicted exchanges line)
        st.subheader('Monthly Exchanges Distribution')
        fig, ax = plt.subplots(figsize=(10, 5))
        sns.barplot(x=months, y=historical_exchanges, ax=ax, palette='viridis')
        ax.set_title('Monthly Exchanges')
        ax.set_xlabel('Month')
        ax.set_ylabel('Exchanges (%)')
        st.pyplot(fig)
        
        # Pie chart for contribution to yearly exchanges
        st.subheader('Contribution to Yearly Exchanges')
        fig, ax = plt.subplots(figsize=(6, 6))
        ax.pie(historical_exchanges, labels=months, autopct='%1.1f%%', colors=sns.color_palette('viridis', 12))
        ax.set_title('Monthly Contribution to Yearly Exchanges')
        st.pyplot(fig)
