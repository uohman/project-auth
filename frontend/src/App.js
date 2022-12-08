import React from 'react';
import Wrapper  from 'components/Wrapper'
import SignIn from 'components/SignIn';
import NotFound from 'components/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { user } from 'reducers/user';

export const App = () => {
const reducer = combineReducers({
    user: user.reducer
});
  const store = configureStore({ reducer });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/' element={<Wrapper />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
        <Wrapper />
      </BrowserRouter>
    </Provider>
  );
}
