import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Import the Redux store
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import axios from "axios"
import './index.css';

axios.defaults.baseURL = "https://fungram-socialmedia-backend.onrender.com"
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>
);
