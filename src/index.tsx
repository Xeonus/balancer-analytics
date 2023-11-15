import ReactDOM from 'react-dom/client';
import ApplicationUpdater from './state/application/updater';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './apollo/client';
import store from './state';
import { initializeApp } from "firebase/app";
import {FIREBASE_API_KEY} from "./data/balancer/constants";

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
    </>
  );
}

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "aura-analytics-backend.firebaseapp.com",
    databaseURL: "https://aura-analytics-backend-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aura-analytics-backend",
    storageBucket: "aura-analytics-backend.appspot.com",
    messagingSenderId: "331682703662",
    appId: "1:331682703662:web:059e942c66d50c07af72bf",
    measurementId: "G-CP46H3FVPR"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Updaters />
        <HashRouter>
        <App />
        </HashRouter>
      </Provider>
    </ApolloProvider>
);

//Double render: <React.StrictMode> wrapper

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
