import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../assets/App.css';
import Predict from './pages/Predict';
import Result from './pages/Result';
import Home from './pages/Home';
import Sidebar from './Sidebar';
function App() {

    return (
        <Router>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;
