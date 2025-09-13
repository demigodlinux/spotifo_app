import { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';

export default function SongDetails ({ songsData, loading }) {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const foundSong = songsData.find(s => s['ISRC'] === id);
    setSong(foundSong);
  }, [id, songsData]);


  /* const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }; */

  const handlePlayClick = () => {
    window.open(song['Track URI'], '_blank');
  };

  const handleViewDetails = (urlPath) => {
    const detailID = urlPath.split(':');
    window.open(`https://open.spotify.com/${detailID[1]}/${detailID[2]}`, '_blank');
  };

  if (loading) {
    return (
      <div className="main-content">
        <BackButton />
        <div className="loading">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p>Loading song details...</p>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="main-content">
        <BackButton />
        <div className="error-state">
          <h3>Song not found</h3>
          <p>The song you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <BackButton />
      
      <div className="song-details-container">
        <div className="song-details-card">
          <div className="song-image-container">
            <img 
              src={song['Album Image URL']} 
              alt={`${song['Album Name']}} cover`} 
              className="song-detail-image"
            />
          </div>
          
          <div className="song-info">
            <h1 onClick={() => handleViewDetails(song['Track URI'])} className="song-title">{song['Track Name']}</h1>
            <p onClick={() => handleViewDetails(song['Album Artist URI(s)'])} className="song-artist">{song['Artist Name(s)']}</p>
            
            <div className="song-metadata">
              <div className="metadata-item">
                <span className="metadata-label">Album:</span>
                <span onClick={() => handleViewDetails(song['Album URI'])} className="album-title metadata-value">{song['Album Name']}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Release Year:</span>
                <span className="metadata-value">{song['Album Release Date']}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Duration:</span>
                <span className="metadata-value">{song['Track Duration (ms)']}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Popularity:</span>
                <span className="metadata-value">{song['Popularity']}/100</span>
              </div>
            </div>
            <div className="button-row">
              <button 
              className="play-button" 
              onClick={handlePlayClick}
              aria-label={`Play ${song['Track Name']}`}
            >
              ▶ Play
            </button>
            </div>
          </div>
        </div>
      </div>
      
      <section className="song-more-details">
        <h2 className="details-heading">More Details</h2>
        <div className="details-grid">

          {Object.keys(song).map((key) => {
            // Friendly labeling and formatting logic

            const value = song[key];
            const lowerKey = key.toLowerCase();
          
            // Skip internal/technical keys if needed
            if (['url', 'uri', 'key','danceability', 'energy', 'loudness', 
              'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence',
               'tempo', 'mode', 'isrc', 'added by', 'added at', 'track name', 'artist name(s)',
              'album name', 'album artist name(s)']
              .some(x => lowerKey.includes(x))) return null;
          
            // Format release date
            if (lowerKey.includes('date')) {
              const date = new Date(value);
              return (
                <div className="details-row" style={{gap: '23%'}} key={key}>
                  <span className="details-key">{key}</span>
                  <span className="details-value">
                    {isNaN(date.getTime()) ? value : date.getFullYear()}
                  </span>
                </div>
              );
            }
          
            // Format duration (ms to min:sec)
            if (lowerKey.includes('duration')) {
              const ms = parseInt(value, 10);
              const minutes = Math.floor(ms / 60000);
              const seconds = ((ms % 60000) / 1000).toFixed(0).padStart(2, '0');
              return (
                <div className="details-row" style={{gap: '23%'}} key={key}>
                  <span className="details-key">{key}</span>
                  <span className="details-value">{isNaN(ms) ? value : `${minutes}:${seconds} min`}</span>
                </div>
              );
            }

            if (lowerKey.includes('popularity')) {
              return (
                <div className="details-row" style={{gap: '23%'}} key={key}>
                  <span className="details-key">{key}</span>
                  <span className="details-value">{ value + '/100'}</span>
                </div>
              );
            }
          
            // Boolean values
            if (typeof value === 'boolean' || (value === 'true' || value === 'false')) {
              const boolValue = value === 'true' ? true : value === 'false' ? false : value;
              return (
                <div className="details-row" style={{gap: '23%'}} key={key}>
                  <span className="details-key">{key}</span>
                  <span className="details-value">{boolValue === true ? 'Yes' : boolValue === false ? 'No' : value}</span>
                </div>
              );
            }
          
            // Array/list fields (like genres)
            if (Array.isArray(value) || (typeof value === 'string' && value.includes(','))) {
              const items = Array.isArray(value) ? value : value.split(',');
              return (
                <div className="details-row" style={{gap: '36%'}} key={key}>
                  <span className="details-key">{key}</span>
                  <span className="details-value">
                    {items.map((item, idx) => {
                      const isLast = idx === items.length - 1;
                      return (
                        <span
                          key={idx}
                          style={{ marginRight: '8px', color: '#1DB954', fontWeight: 500 }}
                        >
                          {item.trim()}{!isLast && ', '}
                        </span>
                      );
                    })}
                  </span>
                </div>
              );
            }
            // Default display
            return (
              <div className="details-row" style={{gap: '23%'}} key={key}>
                <span className="details-key">{key}</span>
                <span className="details-value">{value}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};