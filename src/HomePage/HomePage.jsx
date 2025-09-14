import { useState, useEffect } from 'react';
import { getSongs } from '../songService';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage/SearchPage';
import SongDetails from './SongDetails/SongDetails';

export default function HomePage(){
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSongs()
      .then(data => {setSongsData(data.sort((a, b) => b.Popularity - a.Popularity))})
      .catch(() => setSongsData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SearchPage
            songsData={songsData}
            loading={loading}
          />
        }
      />
      <Route
        path="/song/:id"
        element={
          <SongDetails
            songsData={songsData}
            loading={loading}
          />
        }
      />
    </Routes>
  );
    
}