import React from 'react';
import Wrapper from './Wrapper'

import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from 'reducers/user';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer
})

  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
}
