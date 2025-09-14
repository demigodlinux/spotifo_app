export default function SongCard ({ song, onClick }) {
  const handleClick = () => {
    onClick(song.id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className="song-card" 
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${song['Track Name']} by ${song['Artist Name(s)']}`}
    >
      <img 
        src={song['Album Image URL']} 
        alt={`${song['Album Name']} cover`} 
        className="song-card-image"
      /> 
      <h3 className="song-card-title">{song['Track Name']}</h3>
      <p className="song-card-artist">{song['Artist Name(s)']}</p>
      <p className="song-card-album">{song['Album Name']}</p>
    </div>
  );
};