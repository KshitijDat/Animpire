import React, { useState, useEffect } from "react";

import AniCard from "./AniCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    searchAnimes("One Piece");
  }, []);

  const searchAnimes = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setAnimes(data.Search);
  };

  return (
    <div className="app">
      <h1>Animpire</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for animes"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchAnimes(searchTerm)}
        />
      </div>

      {animes?.length > 0 ? (
        <div className="container">
          {animes.map((animes) => (
            <AniCard anime={animes} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No animes found</h2>
        </div>
      )}
    </div>
  );
};

export default App;