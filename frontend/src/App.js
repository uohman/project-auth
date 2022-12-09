import React from 'react';
import Wrapper  from 'components/Wrapper'
import Registration from 'components/Registration';
import Login from 'components/Login';
import AuthenticatedContent from 'components/AuthenticatedContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}></Route>
        <Route path="/register" element={ <Registration /> }></Route>
        <Route path="/login" element= { <Login /> }></Route>
        <Route path="/authenticate" element={ <AuthenticatedContent /> }></Route>      
      </Routes>
      </BrowserRouter>  
  );
}
