import React, { useEffect, useState } from 'react';
import "./Row.css";
import axios from "./axios";
import { API_KEY } from './Requests';
import Youtube from "react-youtube";

function Row({title, fetchUrl, isLargeRow = false}) {

  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      if(response.data.results.length!==0) {
        if(urlId) {
          setUrlId('');
        } else {
          setUrlId(response.data.results[0]);
        }
      } else {
        alert("No video available at the moment");
      }
    }).catch(error => alert("No video available at the moment"));
  }

  return (
      <div className="row">
        <h2>{title}</h2>

        <div className="row__posters">
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) || 
              (!isLargeRow && movie.backdrop_path)) && (
                <img
                onClick={() => handleMovie(movie.id) }
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  key={movie.id}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`} 
                  alt={movie.name}
                />
              )
          )}
        </div>
        { urlId && <Youtube opts={opts} videoId={urlId.key} /> }
      </div>
    );
};

export default Row
