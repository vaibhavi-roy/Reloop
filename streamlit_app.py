import streamlit as st
from pymongo import MongoClient
import pandas as pd

# Initialize session state for user authentication
if 'logged_in' not in st.session_state:
    st.session_state.logged_in = False
if 'username' not in st.session_state:
    st.session_state.username = ""

# MongoDB connection
client = MongoClient('mongodb+srv://devleena2003:reverse-logistics@cluster0.qad62pz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['test']  

# Function to validate login credentials
def validate_login(username, password):
    user = db['users'].find_one({'username': username, 'password': password})
    return user is not None

# Function to register a new user
def register_user(username, password):
    if db['users'].find_one({'username': username}):
        return False  # User already exists
    db['users'].insert_one({'username': username, 'password': password})
    return True

# Function to redirect to the login page
def redirect_to_login():
    st.session_state.logged_in = False
    st.session_state.username = ""
    st.rerun()

# Login Page
def login_page():
    st.title("Login")
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
        if validate_login(username, password):
            st.session_state.logged_in = True
            st.session_state.username = username
            st.success("Logged in successfully!")
            st.rerun()
        else:
            st.error("Invalid username or password")

# Registration Page
def register_page():
    st.title("Register")
    username = st.text_input("Choose a Username")
    password = st.text_input("Choose a Password", type="password")
    if st.button("Register"):
        if register_user(username, password):
            st.success("Registration successful! Please log in.")
            st.rerun()
        else:
            st.error("Username already taken, please choose another.")

# Dashboard Page 
def dashboard():
    st.markdown("""
        <style>
        .navbar {
            background-color: #007bff;
            padding: 10px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .navbar h2 {
            color: white;
            margin: 0;
            font-size: 24px;
            
        }
        </style>
        <div class="navbar">
            <h2>Reloop</h2>
        </div>
        """, unsafe_allow_html=True)

    if st.button("Logout", key="logout_btn"):
        redirect_to_login()

    st.markdown("""
        <style>
        .custom-header {
            font-size: 36px;
            color: #444444;
            text-align: center; 
            font-weight: bold; 
            background-color: #f0f0f0;
            padding: 20px; 
            border-radius: 10px; 
            margin-bottom: 20px;
        }
        </style>
        <div class="custom-header">Requests Data</div>
        """, unsafe_allow_html=True)

    st.header('Admin Dashboard')

    # Fetch data from the 'exchangerequests' collection
    exchange_data = list(db['exchangerequests'].find({}, {'product_id': 1, 'order_id': 1, 'reason': 1, 'address': 1, '_id': 0}))

    # Fetch data from the 'returnrequests' collection
    return_data = list(db['returnrequests'].find({}, {'product_id': 1, 'order_id': 1, 'reason': 1, 'address': 1, '_id': 0}))

    # Convert data to DataFrames
    exchange_df = pd.DataFrame(exchange_data)
    return_df = pd.DataFrame(return_data)

    # Function to format address
    def format_address(address):
        formatted_address = f"{address.get('address', '')},\n\n{address.get('city', '')},\n\n{address.get('state', '')},\n\n{address.get('pincode', '')},\n\n{address.get('district', '')}"
        return formatted_address.strip()  

    # Apply formatting to the address columns
    if 'address' in exchange_df.columns:
        exchange_df['address'] = exchange_df['address'].apply(lambda x: format_address(x) if isinstance(x, dict) else '')

    if 'address' in return_df.columns:
        return_df['address'] = return_df['address'].apply(lambda x: format_address(x) if isinstance(x, dict) else '')

    # Function to style the dataframes
    def style_dataframe(df):
        return df.style.set_table_styles(
            [{
                'selector': 'table',
                'props': [('border-collapse', 'collapse'),
                          ('width', '100%'),
                          ('margin', '20px 0')]
            }, {
                'selector': 'th',
                'props': [('background-color', '#4CAF50'),
                          ('color', 'white'),
                          ('text-align', 'center'),
                          ('border', '1px solid black'),
                          ('padding', '8px')]
            }, {
                'selector': 'td',
                'props': [('border', '1px solid black'),
                          ('text-align', 'center'),
                          ('padding', '8px'),
                          ('white-space', 'pre-wrap')]  
            }]
        ).set_properties(**{
            'background-color': 'beige',
            'color': 'black',
        })

    # Display Exchange Requests Data
    st.subheader("Exchange Requests Data")
    if not exchange_df.empty:
        st.dataframe(style_dataframe(exchange_df))
    else:
        st.warning("No data found in the 'exchangerequests' collection.")

    # Display Return Requests Data
    st.subheader("Return Requests Data")
    if not return_df.empty:
        st.dataframe(style_dataframe(return_df))
    else:
        st.warning("No data found in the 'returnrequests' collection.")

    # Add Predict Button
    st.markdown("""
        <style>
        .centered-button {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
        }
        .centered-button button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .centered-button button:hover {
            background-color: #45a049;
        }
        </style>
        <div class="centered-button">
            <button id="predict-button">Predict</button>
        </div>
        """, unsafe_allow_html=True)

    

# Main app
def main():
    if st.session_state.logged_in:
        dashboard()
    else:
        page = st.sidebar.selectbox("Choose a page", ["Login", "Register"])
        if page == "Login":
            login_page()
        elif page == "Register":
            register_page()

# Run the app
if __name__ == "__main__":
    main()
