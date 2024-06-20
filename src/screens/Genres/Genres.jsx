import React, { useEffect, useState } from "react";

import "./Genres.css";
import Navigation from "../../components/Navigation/Navigation";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GENRES } from "../../constants/genres";
import Notification from "../../components/Notification/Notification";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { useMovie } from "../../context/MovieContext";
import Heading from "../../components/Heading/Heading";
import { getMovies } from "../../utils/apiCalls";

const Genres = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { genres, setGenres, movie, setMovie, setMovies } = useMovie();
  const [isClose, setIsClose] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  const handleCheckbox = (e) => {
    if (genres.includes(e.target.id)) {
      setGenres(genres.filter((gen) => gen !== e.target.id));
      setCheckCount(checkCount - 1);
    } else {
      setGenres((current) => {
        return [...current, e.target.id];
      });
      setCheckCount(checkCount + 1);
      checkCount >= 3 && setIsClose(true);
    }
  };

  const handleSearch = () => {
    getMovies(movie.currentPage, params.type, genres).then((res) => {
      setMovies(res.results);
      setMovie({
        ...movie,
        data: res.results[0],
      });

      navigate(
        `/search/${params.type}/${genres.length > 0 ? genres : "28"}/${
          res.results > 0 ? res.results[0].id : "1234"
        }`
      );
    });
  };

  useEffect(() => {
    setGenres([]);
    setMovies([]);
  }, []);

  return (
    <div className="home__wrapper">
      <Navigation hasArrow={true} onClick={() => navigate(`/`)} />
      <div className="content__spacing">
        <div className="py-8 px-12">
          <Heading as="h2" className="mb-8">
            Escoge un género o varios:
          </Heading>
          <div className="genres__wrapper">
            {GENRES &&
              GENRES.map((gen) => (
                <Checkbox key={gen.id} onClick={handleCheckbox} id={gen.id}>
                  {gen.label}
                </Checkbox>
              ))}
          </div>
        </div>
        {isClose && (
          <Notification
            title="Advertencia"
            text="Si seleccionas varios géneros es posible que no recibas resultados, te recomendamos elegir no más de 3"
            onClick={() => setIsClose(false)}
          />
        )}
      </div>
      <div className="home__button__wrapper">
        <div className="home__button">
          <Button onClick={handleSearch} variant="primary">
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Genres;
