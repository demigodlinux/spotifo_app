import { HashRouter} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NavBar from './Navbar/Navbar';

// Main App Component
export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavBar />
        <HomePage />
      </div>
    </HashRouter>
  );
}