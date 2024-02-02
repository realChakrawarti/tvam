import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '@/renderer/styles/global.css';
import { Login } from './view';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}
