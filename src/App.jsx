// App.jsx
// Author: Fabian (routing + AuthProvider wiring)
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import NavBar from './components/NavBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Personas from './pages/Personas.jsx';
import Contact from './pages/Contact.jsx';
import Quiz from './pages/Quiz.jsx';
import Results from './pages/Results.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import GenerateTips from './pages/GenerateTips.jsx';
import SavedTips from './pages/SavedTips.jsx';
import TipDetail from './pages/TipDetail.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar name="AcadeMe" />
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/personas" element={<Personas />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected routes */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute><Profile /></ProtectedRoute>
                    } />
                    <Route path="/generate" element={
                        <ProtectedRoute><GenerateTips /></ProtectedRoute>
                    } />
                    <Route path="/tips" element={
                        <ProtectedRoute><SavedTips /></ProtectedRoute>
                    } />
                    <Route path="/tips/:id" element={
                        <ProtectedRoute><TipDetail /></ProtectedRoute>
                    } />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
