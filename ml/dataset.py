# import pandas as pd
# import numpy as np
# from datetime import datetime, timedelta
# import random
# import string

# # Function to generate random product IDs
# def generate_product_id(length=8):
#     characters = string.ascii_lowercase + string.digits
#     return ''.join(random.choice(characters) for _ in range(length))

# # Number of unique products and records
# num_products = 100  # Number of unique products
# num_records_per_product = 10  # Number of records per product

# # Initialize lists to hold the data
# product_ids = []
# product_names = []
# dates = []
# total_returns = []
# total_exchanges = []
# months = []
# years = []
# day_of_week = []

# # Generate product data
# product_id_set = set()  # To keep track of unique product IDs

# for _ in range(num_products):
#     product_id = generate_product_id()
#     while product_id in product_id_set:
#         product_id = generate_product_id()  # Ensure unique product IDs
#     product_id_set.add(product_id)
    
#     for _ in range(num_records_per_product):
#         date = datetime(2024, 1, 1) + timedelta(days=random.randint(0, 180))
#         total_return = random.randint(1, 20)
#         total_exchange = random.randint(0, 10)
#         month = date.month
#         year = date.year
#         dow = date.weekday()

#         product_ids.append(product_id)
#         product_names.append(f'Product_{len(product_id_set)}')
#         dates.append(date)
#         total_returns.append(total_return)
#         total_exchanges.append(total_exchange)
#         months.append(month)
#         years.append(year)
#         day_of_week.append(dow)

# # Create DataFrame
# df = pd.DataFrame({
#     'Product_ID': product_ids,
#     'Product_Name': product_names,
#     'Date': dates,
#     'Total_Returns': total_returns,
#     'Total_Exchanges': total_exchanges,
#     'Month': months,
#     'Year': years,
#     'Day_of_Week': day_of_week
# })

# # Sort by Product_ID and Date
# df.sort_values(by=['Product_ID', 'Date'], inplace=True)

# # Calculate lag and rolling features
# df['Lag_Total_Returns'] = df.groupby('Product_ID')['Total_Returns'].shift(1)
# df['Lag_Total_Exchanges'] = df.groupby('Product_ID')['Total_Exchanges'].shift(1)

# # Calculate rolling averages
# df['Rolling_Returns'] = df.groupby('Product_ID')['Total_Returns'].rolling(window=2).mean().reset_index(level=0, drop=True)
# df['Rolling_Exchanges'] = df.groupby('Product_ID')['Total_Exchanges'].rolling(window=2).mean().reset_index(level=0, drop=True)

# # Handle missing values for lag and rolling features
# df['Lag_Total_Returns'].fillna(method='bfill', inplace=True)
# df['Lag_Total_Exchanges'].fillna(method='bfill', inplace=True)
# df['Rolling_Returns'].fillna(method='bfill', inplace=True)
# df['Rolling_Exchanges'].fillna(method='bfill', inplace=True)

# # Save to CSV
# df.to_csv('dummy_reverse_logistics_data.csv', index=False)

# print(df.head())

import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Load the dataset
df = pd.read_csv('dummy_reverse_logistics_data.csv')

# Convert Date to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Add additional features
df['Quarter'] = df['Date'].dt.to_period('Q')
df['Is_Weekend'] = df['Date'].dt.dayofweek >= 5  # True if the day is Saturday or Sunday

# Map months to seasons
def get_season(month):
    if month in [12, 1, 2]:
        return 'Winter'
    elif month in [3, 4, 5]:
        return 'Spring'
    elif month in [6, 7, 8]:
        return 'Summer'
    elif month in [9, 10, 11]:
        return 'Fall'

df['Season'] = df['Month'].apply(get_season)

# Define a list of sample holidays
holidays = [
    '2024-01-01',  # New Year's Day
    '2024-12-25',  # Christmas
    '2024-07-04'   # Independence Day
]

# Convert to datetime
holidays = pd.to_datetime(holidays)

# Add holiday flag
df['Is_Holiday'] = df['Date'].isin(holidays)

# Standardization
features_to_standardize = ['Total_Returns', 'Total_Exchanges', 'Lag_Total_Returns', 'Lag_Total_Exchanges', 'Rolling_Returns', 'Rolling_Exchanges']
scaler = StandardScaler()
df[features_to_standardize] = scaler.fit_transform(df[features_to_standardize])

# Normalization
features_to_normalize = ['Total_Returns', 'Total_Exchanges', 'Lag_Total_Returns', 'Lag_Total_Exchanges', 'Rolling_Returns', 'Rolling_Exchanges']
min_max_scaler = MinMaxScaler()
df[features_to_normalize] = min_max_scaler.fit_transform(df[features_to_normalize])

# Save the modified dataset
df.to_csv('enhanced_reverse_logistics_data.csv', index=False)

print(df.head())

