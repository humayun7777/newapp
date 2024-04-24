import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProtectedComponent from './components/ProtectedComponent';
import ProtectedRoute from './ProtectedRoute'; // Assuming you have this setup as mentioned previously

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/protected" element={<ProtectedRoute component={ProtectedComponent} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

