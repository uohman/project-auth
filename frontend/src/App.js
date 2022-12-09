import React from 'react';
import Wrapper  from 'components/Wrapper'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import { Provider } from 'react-redux';
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { user } from 'reducers/user';
import Registration from 'components/Registration';
import Login from 'components/Login';
import AuthenticatedContent from 'components/AuthenticatedContent';
import NotFound from 'components/NotFound';

export const App = () => {
/*const reducer = combineReducers({
    user: user.reducer
});
  const store = configureStore({ reducer });*/

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}></Route>
        <Route path="/register" element={ <Registration /> }></Route>
        <Route path="/login" element= { <Login /> }></Route>
        <Route path="/authenticate" element={ <AuthenticatedContent /> }></Route> 
        <Route path="*" element= { <NotFound /> }></Route>        
      </Routes>
      </BrowserRouter>
      
    
  );
}
