import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongCard from '../SongCard/SongCard';
import Pagination from './Pagination';

export default function SearchPage ({ songsData, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    artist: '',
    album: '',
    year: '',
    popularity: '', // minimum popularity filter
  });
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const songsPerPage = 12;

  // Filter & sort songs based on search and filters
  useEffect(() => {
    if (!songsData.length) {
      setFilteredSongs([]);
      return;
    }

    let filtered = songsData.filter(song => {
      const termMatch = song['Track Name'].toLowerCase().includes(searchTerm.toLowerCase());

      const artistMatch = filters.artist
        ? song['Artist Name(s)'].toLowerCase().includes(filters.artist.toLowerCase())
        : true;

      const albumMatch = filters.album
        ? song['Album Name'].toLowerCase().includes(filters.album.toLowerCase())
        : true;

      const yearMatch = filters.year
        ? song['Album Release Date'].startsWith(filters.year)
        : true;

      const popularityMatch = filters.popularity
        ? song['Popularity'] >= parseInt(filters.popularity, 10)
        : true;

      return termMatch && artistMatch && albumMatch && yearMatch && popularityMatch;
    });

    filtered = filtered.sort((a, b) => b.Popularity - a.Popularity);

    setFilteredSongs(filtered);
    setCurrentPage(1);
  }, [searchTerm, filters, songsData]);

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  const startIndex = (currentPage - 1) * songsPerPage;
  const currentSongs = filteredSongs.slice(startIndex, startIndex + songsPerPage);

  const handleSearchInput = (e) => setSearchTerm(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Optional: trigger search/filter logic immediately if needed
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = useNavigate();
  const handleSongClick = (id) => navigate(`/song/${id}`);

  return (
    <div className="main-content">
      <div className="search-container">
        <div className="search-bar-container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for songs..."
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyPress={handleKeyPress}
            aria-label="Search for songs"
            style={{ flexGrow: 1, minWidth: 200 }}
          />
          <button onClick={() => setShowFilterPopup(!showFilterPopup)} className="search-button">Filters</button>
        </div>

        {showFilterPopup && (
          <div className="filter-popup" role="dialog" aria-modal="true">
            <label>
              Artist:
              <input
                type="text"
                name="artist"
                value={filters.artist}
                onChange={handleFilterChange}
                placeholder="Filter by Artist"
                className="filter-input"
              />
            </label>
            <label>
              Album:
              <input
                type="text"
                name="album"
                value={filters.album}
                onChange={handleFilterChange}
                placeholder="Filter by Album"
                className="filter-input"
              />
            </label>
            <label>
              Release Year:
              <input
                type="text"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="YYYY"
                maxLength={4}
                className="filter-input"
              />
            </label>
            <label>
              Min Popularity:
              <input
                type="number"
                name="popularity"
                value={filters.popularity}
                onChange={handleFilterChange}
                placeholder="0-100"
                min={0}
                max={100}
                className="filter-input"
              />
            </label>
            <button onClick={() => setShowFilterPopup(false)} className="filter-close-button">Close</button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p>Loading songs...</p>
        </div>
      ) : (
        <div className="search-results">
          {filteredSongs.length === 0 ? (
            <div className="no-results">
              <h3>No songs found</h3>
              <p>Try a different search term or adjust filters.</p>
            </div>
          ) : (
            <>
              <div className="songs-grid">
                {currentSongs.map((song, i) => (
                  <SongCard key={song.ISRC ?? i} song={song} onClick={() => handleSongClick(song.ISRC)} />
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      )}
    </div>
  );
};