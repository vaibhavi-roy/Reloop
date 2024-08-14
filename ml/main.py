import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import keras_tuner as kt
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv('enhanced_reverse_logistics_data.csv')

# Define features and target variables
features = ['Lag_Total_Returns', 'Lag_Total_Exchanges', 'Rolling_Returns', 'Rolling_Exchanges']
target_return = 'Total_Returns'
target_exchange = 'Total_Exchanges'

# Features and targets
X = df[features]
y_return = df[target_return]
y_exchange = df[target_exchange]

# Split the data into training and testing sets
X_train, X_test, y_train_return, y_test_return, y_train_exchange, y_test_exchange = train_test_split(
X, y_return, y_exchange, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Reshape data for LSTM (3D format)
X_train_reshaped = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))
X_test_reshaped = X_test.reshape((X_test.shape[0], 1, X_test.shape[1]))

# Define a function to build and compile the LSTM model
def build_model(hp):
    model = Sequential()
    model.add(LSTM(
        units=hp.Int('units', min_value=50, max_value=100, step=10),
        activation='relu',
        input_shape=(X_train_reshaped.shape[1], X_train_reshaped.shape[2]),
        return_sequences=True
    ))
    model.add(LSTM(
        units=hp.Int('units', min_value=50, max_value=100, step=10),
        activation='relu',
        return_sequences=False
    ))
    model.add(Dense(1))
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(
            hp.Choice('learning_rate', values=[1e-2, 1e-3, 1e-4])
        ),
        loss='mean_squared_error'
    )
    return model

# Initialize the Keras Tuner
tuner = kt.Hyperband(
    build_model,
    objective='val_loss',
    max_epochs=10,
    hyperband_iterations=2,
    directory='tuner_dir',
    project_name='reverse_logistics_tuning'
)

# Perform hyperparameter search for return rates
tuner.search(
    X_train_reshaped, y_train_return,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# Retrieve the best model for return rates
best_model_return = tuner.get_best_models(num_models=1)[0]

# Evaluate the model for return rates
y_pred_return_lstm = best_model_return.predict(X_test_reshaped).flatten()
mse_return_lstm = mean_squared_error(y_test_return, y_pred_return_lstm)
mae_return_lstm = mean_absolute_error(y_test_return, y_pred_return_lstm)
rmse_return_lstm = np.sqrt(mse_return_lstm)

# Calculate and print R² for return predictions
r2_return = r2_score(y_test_return, y_pred_return_lstm)
print(f'R² for Return Predictions (LSTM): {r2_return}')
print(f'MSE for Return Predictions (LSTM): {mse_return_lstm}')
print(f'MAE for Return Predictions (LSTM): {mae_return_lstm}')
print(f'RMSE for Return Predictions (LSTM): {rmse_return_lstm}')

# Perform hyperparameter search for exchange rates
tuner.search(
    X_train_reshaped, y_train_exchange,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# Retrieve the best model for exchange rates
best_model_exchange = tuner.get_best_models(num_models=1)[0]

# Evaluate the model for exchange rates
y_pred_exchange_lstm = best_model_exchange.predict(X_test_reshaped).flatten()
mse_exchange_lstm = mean_squared_error(y_test_exchange, y_pred_exchange_lstm)
mae_exchange_lstm = mean_absolute_error(y_test_exchange, y_pred_exchange_lstm)
rmse_exchange_lstm = np.sqrt(mse_exchange_lstm)
r2_exchange = r2_score(y_test_exchange, y_pred_exchange_lstm)

# Calculate and print R² for exchange predictions
r2_exchange = r2_score(y_test_exchange, y_pred_exchange_lstm)
print(f'R² for Exchange Predictions (LSTM): {r2_exchange}')
print(f'MSE for Exchange Predictions (LSTM): {mse_exchange_lstm}')
print(f'MAE for Exchange Predictions (LSTM): {mae_exchange_lstm}')
print(f'RMSE for Exchange Predictions (LSTM): {rmse_exchange_lstm}')


# Save the best model for return rates
best_model_return.save('model_return.h5')
print("Saved best model for returns as 'model_return.h5'")

# Save the best model for exchange rates
best_model_exchange.save('model_exchange.h5')
print("Saved best model for exchanges as 'model_exchange.h5'")


# Visualize predictions (same as before)
plt.figure(figsize=(14, 6))

# Plot for Return Predictions
plt.subplot(1, 2, 1)
plt.plot(y_test_return.values, label='Actual Returns', color='blue')
plt.plot(y_pred_return_lstm, label='Predicted Returns', color='red')
plt.title('Return Predictions vs Actual')
plt.xlabel('Sample Index')
plt.ylabel('Return')
plt.legend()

# Plot for Exchange Predictions
plt.subplot(1, 2, 2)
plt.plot(y_test_exchange.values, label='Actual Exchanges', color='blue')
plt.plot(y_pred_exchange_lstm, label='Predicted Exchanges', color='red')
plt.title('Exchange Predictions vs Actual')
plt.xlabel('Sample Index')
plt.ylabel('Exchange')
plt.legend()

plt.tight_layout()
plt.show()

