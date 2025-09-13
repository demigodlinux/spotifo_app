import { useNavigate } from 'react-router-dom';

export default function NavBar(){
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={handleLogoClick}>
          <span className="logo">
            <img 
              src="/logo2.png" 
              alt="Spotifo Logo" 
            />
          </span>
        </div>
      </div>
    </nav>
  );
};