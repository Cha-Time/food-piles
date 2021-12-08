import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Screens from './components/Screens';
import { ToastProvider } from 'react-native-toast-notifications';

function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <Screens />
      </Provider>
    </ToastProvider>
  );
}

export default App;
