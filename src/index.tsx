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

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
    </>
  );
}

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
