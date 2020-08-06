import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeachersList from './pages/TeachersList';
import TeacherForm from './pages/TeacherForm';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing}/>
      <Route path="/teach" component={TeacherForm}/>
      <Route path="/study" component={TeachersList}/>
    </BrowserRouter>
  );
};

export default Routes;
