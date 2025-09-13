import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="back-button-container">
      <button className="back-button" onClick={handleBack}>
        ← Back to Search
      </button>
    </div>
  );
};