import React, { useEffect, useState } from "react";

import "./Home.css";
import Navigation from "../../components/Navigation/Navigation";
import Heading from "../../components/Heading/Heading";
import TypeCard from "../../components/TypeCard/TypeCard";
import { getTrending } from "../../utils/apiCalls";
import ImageCarrousel from "../../components/ImageCarrousel/ImageCarrousel";
import { Link } from "react-router-dom";
import { useMovie } from "../../context/MovieContext";

const Home = () => {
  const { setGenres, setMovies } = useMovie();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);

  useEffect(() => {
    getTrending("movie").then((t) => {
      setTrendingMovies(
        t.results.map((trend) => {
          return {
            title: trend.title,
            image: trend.poster_path,
          };
        })
      );
    });
    getTrending("tv").then((t) => {
      setTrendingTv(
        t.results.map((trend) => {
          return {
            title: trend.title,
            image: trend.poster_path,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    setGenres([]);
    setMovies([]);
  }, []);

  return (
    <div className="home__wrapper">
      <Navigation />
      <div className="content__spacing">
        <div className="py-8 px-12">
          <Heading as="h2">¿Qué quieres ver hoy?</Heading>
        </div>
        <Link to={"/movie/genres"} className="home__carrousel">
          <Heading as="h3" className={"heading__carrousel "}>
            Películas
          </Heading>
          <ImageCarrousel
            imageSet={[...trendingMovies, ...trendingMovies]}
            scrollAnimation="right"
          />
        </Link>
        <Link to={"/tv/genres"} className="home__carrousel">
          <Heading as="h3" className={"heading__carrousel "}>
            Series
          </Heading>
          <ImageCarrousel
            imageSet={[...trendingTv, ...trendingTv]}
            scrollAnimation="left"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
