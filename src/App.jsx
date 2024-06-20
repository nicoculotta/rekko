import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MovieProvider, useMovie } from "./context/MovieContext";
import { Details } from "./screens/Details/Details";
import Genres from "./screens/Genres/Genres";
import Home from "./screens/Home/Home";
import Movie from "./screens/Movie/Movie";

function App() {
  return (
    <BrowserRouter>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:type/:genres/:id" element={<Movie />} />
          <Route path="/:type/genres" element={<Genres />} />
          {/*    <Route path="/search/:type/:id" element={<Details />} />
           */}
        </Routes>
      </MovieProvider>
    </BrowserRouter>
  );
}

export default App;
