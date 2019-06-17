import React from 'react';
import Calendar from './container/Calendar';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

const store = configureStore();

if(localStorage.getItem('data') == null){
  localStorage.setItem('data',JSON.stringify([{},{}])) 
}

function App() {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
}

export default App;
