import React from 'react';
import Wrapper  from 'components/Wrapper'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import { Provider } from 'react-redux';
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from 'reducers/user';
import Registration from 'components/Registration';
import SignIn from 'components/SignIn';
import AuthenticatedContent from 'components/AuthenticatedContent';

export const App = () => {
  /*const reducer = combineReducers({
    user: user.reducer
})

  const store = configureStore({ reducer })*/

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <Registration /> }></Route>
        <Route path="/login" element= { <SignIn /> }></Route>
        <Route path="/authenticate" element={ <AuthenticatedContent /> }></Route>         
      </Routes>
      </BrowserRouter>
      
    
  );
}
