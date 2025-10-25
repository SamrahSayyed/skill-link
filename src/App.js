import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ConnectionsPage from './pages/ConnectionsPage';
import PostCreationPage from './pages/PostCreationPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* LandingPage with footer */}
        <Route 
          path="/" 
          element={
            <Layout showFooter={true}>
              <LandingPage />
            </Layout>
          } 
        />

        {/* Pages without footer */}
        <Route 
          path="/login" 
          element={
            <Layout showFooter={false}>
              <LoginPage />
            </Layout>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <Layout showFooter={false}>
              <SignUpPage />
            </Layout>
          } 
        /> 
        <Route
  path="/dashboard"
  element={
    <Layout showFooter={false} useDefaultNavbar={false}>
      <DashboardPage />
    </Layout>
  }
/>
        <Route 
          path="/profile" 
          element={
            <Layout showFooter={false} useMiniNavbar={true}>
              <ProfilePage />
            </Layout>
          } 
        />
        <Route 
          path="/connections" 
          element={
            <Layout showFooter={false} useMiniNavbar={true}>
              <ConnectionsPage />
            </Layout>
          } 
        />
        <Route 
          path="/create-post" 
          element={
            <Layout showFooter={false} useMiniNavbar={true}>
              <PostCreationPage />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
