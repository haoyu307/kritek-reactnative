/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';

import store from './src/store';
import Route from './src/Route';

const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
