import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Layout from '../pages/Layout';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';

function RoutesComponent() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/backoffice/" element={<Layout />} />
        <Route path="/backoffice/signin" element={<SignIn />} />
        <Route path="/backoffice/signup" element={<SignUp />} />
        <Route path="/backoffice/home" element={<Home />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default RoutesComponent;
