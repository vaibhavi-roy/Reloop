# import pandas as pd
# import matplotlib.pyplot as plt
# import seaborn as sns

# # Load the dataset
# df = pd.read_csv('dummy_reverse_logistics_data.csv')
# # plt.figure(figsize=(14, 6))

# # # Histogram for Total_Returns
# # plt.subplot(1, 2, 1)
# # sns.histplot(df['Total_Returns'], bins=20, kde=True)
# # plt.title('Distribution of Total Returns')

# # # Histogram for Total_Exchanges
# # plt.subplot(1, 2, 2)
# # sns.histplot(df['Total_Exchanges'], bins=20, kde=True)
# # plt.title('Distribution of Total Exchanges')

# # plt.tight_layout()
# # plt.show()
# sample_product_id = df['Product_ID'].unique()[0]  # Sample a product ID
# sample_df = df[df['Product_ID'] == sample_product_id]

# plt.figure(figsize=(14, 6))

# # Plot Total_Returns over time
# plt.subplot(1, 2, 1)
# sns.lineplot(x='Date', y='Total_Returns', data=sample_df, marker='o')
# plt.title(f'Total Returns Over Time for Product {sample_product_id}')
# plt.xticks(rotation=45)

# # Plot Total_Exchanges over time
# plt.subplot(1, 2, 2)
# sns.lineplot(x='Date', y='Total_Exchanges', data=sample_df, marker='o')
# plt.title(f'Total Exchanges Over Time for Product {sample_product_id}')
# plt.xticks(rotation=45)

# plt.tight_layout()
# plt.show()

# #stat summary

# summary_stats = df[['Total_Returns', 'Total_Exchanges', 'Lag_Total_Returns', 'Lag_Total_Exchanges', 'Rolling_Returns', 'Rolling_Exchanges']].describe()
# print(summary_stats)

# # Compute correlation matrix
# correlation_matrix = df[['Total_Returns', 'Total_Exchanges', 'Lag_Total_Returns', 'Lag_Total_Exchanges', 'Rolling_Returns', 'Rolling_Exchanges']].corr()

# # Plot the correlation matrix
# plt.figure(figsize=(10, 8))
# sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
# plt.title('Correlation Matrix')
# plt.show()

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the enhanced dataset
df = pd.read_csv('enhanced_reverse_logistics_data.csv', parse_dates=['Date'])

#Visualize Feature Distributions

# plt.figure(figsize=(14, 10))

# # Plot histograms for each numerical feature
# for i, column in enumerate(['Total_Returns', 'Total_Exchanges', 'Lag_Total_Returns', 'Lag_Total_Exchanges', 'Rolling_Returns', 'Rolling_Exchanges']):
#     plt.subplot(2, 3, i + 1)
#     sns.histplot(df[column], kde=True, bins=30)
#     plt.title(f'Distribution of {column}')

# plt.tight_layout()
# plt.show()


#Visualize Feature Correlations

# Calculate correlation matrix

# corr_matrix = df[['Total_Returns', 'Total_Exchanges', 'Lag_Total_Returns', 'Lag_Total_Exchanges', 'Rolling_Returns', 'Rolling_Exchanges']].corr()

# # Set up the matplotlib figure
# plt.figure(figsize=(10, 8))

# # Draw heatmap
# sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5)
# plt.title('Feature Correlation Matrix')
# plt.show()


#Visualizing Time Series Data

# Create a time series plot for Total Returns and Exchanges
# plt.figure(figsize=(14, 7))

# # Plot Total Returns over time
# plt.subplot(2, 1, 1)
# plt.plot(df['Date'], df['Total_Returns'], label='Total Returns', color='blue')
# plt.xlabel('Date')
# plt.ylabel('Total Returns')
# plt.title('Total Returns Over Time')
# plt.legend()

# # Plot Total Exchanges over time
# plt.subplot(2, 1, 2)
# plt.plot(df['Date'], df['Total_Exchanges'], label='Total Exchanges', color='orange')
# plt.xlabel('Date')
# plt.ylabel('Total Exchanges')
# plt.title('Total Exchanges Over Time')
# plt.legend()

# plt.tight_layout()
# plt.show()


#Visualizing Seasonal and Holiday Effects

# Plot average Total Returns and Exchanges by Season
plt.figure(figsize=(14, 6))

# Total Returns by Season
plt.subplot(1, 2, 1)
sns.barplot(x='Season', y='Total_Returns', data=df, estimator='mean')
plt.title('Average Total Returns by Season')

# Total Exchanges by Season
plt.subplot(1, 2, 2)
sns.barplot(x='Season', y='Total_Exchanges', data=df, estimator='mean')
plt.title('Average Total Exchanges by Season')

plt.tight_layout()
plt.show()

# Plot average Total Returns and Exchanges by Holiday Flag
plt.figure(figsize=(14, 6))

# Total Returns by Holiday Flag
plt.subplot(1, 2, 1)
sns.barplot(x='Is_Holiday', y='Total_Returns', data=df, estimator='mean')
plt.title('Average Total Returns on Holidays vs Non-Holidays')

# Total Exchanges by Holiday Flag
plt.subplot(1, 2, 2)
sns.barplot(x='Is_Holiday', y='Total_Exchanges', data=df, estimator='mean')
plt.title('Average Total Exchanges on Holidays vs Non-Holidays')

plt.tight_layout()
plt.show()


