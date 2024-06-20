import React, { useEffect, useState } from "react";
import "./Movie.css";

import { useMovie } from "../../context/MovieContext";
import Navigation from "../../components/Navigation/Navigation";
import Button from "../../components/Button/Button";
import InfoHeading from "../../components/InfoHeading/InfoHeading";
import { BsArrowCounterclockwise, BsUiRadiosGrid } from "react-icons/bs";
import Badge from "../../components/Badge/Badge";
import Typography from "../../components/Typography/Typography";
import Heading from "../../components/Heading/Heading";
import MovieSkeleton from "../../components/MovieSkeleton/MovieSkeleton";
import {
  getDetails,
  getMovies,
  getProviders,
  getSimilar,
} from "../../utils/apiCalls";
import { randomIntFromInterval } from "../../utils/randomNumber";
import { useNavigate, useParams } from "react-router-dom";
import { ImageProvider } from "../../components/ImageProvider/ImageProvider";

const Movie = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    movie,
    movies,
    loading,
    type,
    genres,
    setMovie,
    setMovies,
    setLoading,
  } = useMovie();

  const [info, setInfo] = useState(null);
  const [providersInfo, setProvidersInfo] = useState(null);
  const [showId, setShowId] = useState(params.id);

  const handleGoHome = () => {
    navigate("/");
  };

  const nextMovie = () => {
    if (movie.currentMovie <= movies.length - 1) {
      setMovie((prev) => {
        return {
          ...prev,
          currentPage: prev.currentPage,
          currentMovie: prev.currentMovie + 1,
        };
      });
    } else {
      fetchMovie();
      setMovie((prev) => {
        return {
          data: movies[prev.currentMovie],
          currentMovie: 0,
          currentPage: prev.currentPage + 1,
        };
      });
    }
    setShowId(`${movies[movie.currentMovie].id}`);
    navigate(`/search/${params.type}/${genres}/${showId}`);
  };

  const fetchSimilar = async () => {
    const randomNumber = randomIntFromInterval(1, 4);
    const response = await getSimilar(type, info.id);
    response.results.length > 0 &&
      setMovie((prev) => {
        return {
          ...prev,
          data: response.results[randomNumber],
        };
      });
    setShowId(`${movie.data.id}`);
    navigate(`/search/${params.type}/${genres}/${showId}`);
  };

  const fetchMovie = async () => {
    const response = await getMovies(movie.currentPage, type, genres);
    setMovies(response.results);
    setMovie((prev) => {
      return {
        ...prev,
        data: response.results[prev.currentMovie],
      };
    });
    setLoading(false);
  };

  const fetchDetails = async () => {
    const response = await getDetails(type, showId);
    setInfo(response);
    setLoading(false);
  };

  const fetchProviders = async () => {
    const response = await getProviders(type, showId);
    setProvidersInfo(response);
  };

  useEffect(() => {
    setLoading(true);
    fetchDetails();
    fetchProviders();
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [showId]);

  return (
    <div className="wrapper">
      <Navigation hasArrow onClick={() => navigate(`/${params.type}/genres`)} />

      {loading ? (
        <MovieSkeleton />
      ) : (
        <>
          {movie?.data && info && (
            <div className="content__spacing">
              <InfoHeading
                title={info.title}
                rate={info.vote_average}
                year={info.release_date?.slice(0, 4)}
                image={info.poster_path}
                video={
                  info.videos?.results[0]?.key ? info.videos.results[0].key : ""
                }
              >
                {info.overview}
              </InfoHeading>
              <div className="badge__wrapper">
                {info?.genres.map((g) => (
                  <Badge key={g.id}>{g.name}</Badge>
                ))}
              </div>
              {(providersInfo?.results.ES || providersInfo?.results.AR) && (
                <div className="detail__paragraph">
                  <Typography className={"separator-m"}>Donde verla</Typography>
                  {providersInfo?.results.ES ? (
                    <div className="providers__wrapper">
                      {providersInfo.results.ES?.flatrate?.map((logo) => (
                        <ImageProvider image={logo.logo_path} />
                      ))}
                    </div>
                  ) : (
                    <div className="providers__wrapper">
                      {providersInfo.results.AR?.flatrate?.map((logo) => (
                        <ImageProvider image={logo.logo_path} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {!info && (
        <div className="message__wrapper">
          <Heading as="h2">Sin Resultados</Heading>
          <div className="separator-m">
            <Typography>
              No hemos podido obtener más resultados en tu busqueda
            </Typography>
          </div>
          <Button variant={"secondary"} onClick={() => handleGoHome()}>
            Volver al inicio
          </Button>
        </div>
      )}

      {info && (
        <div className="movie__buttons__wrapper">
          <div className="movie__buttons">
            <Button
              variant="secondary"
              onClick={() => nextMovie()}
              icon={<BsArrowCounterclockwise />}
            >
              Dame otra
            </Button>
            <Button
              variant="secondary"
              onClick={() => fetchSimilar()}
              icon={<BsUiRadiosGrid className="icon-similar" />}
            >
              Similar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
