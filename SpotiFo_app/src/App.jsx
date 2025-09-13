import { BrowserRouter as Router} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NavBar from './Navbar/Navbar';

// Main App Component
export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <HomePage />
      </div>
    </Router>
  );
}