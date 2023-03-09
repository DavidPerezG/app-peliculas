import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import PageWrapper from './PageWrapper';
import Paginacion from './Paginacion';
import Pelicula from './Pelicula';
import peliculasJson from './peliculas.json';

function App() {
  const [paginaActual, setPaginaActual] = useState(1);
  const TOTAL_POR_PAGINA = 7;
  const [movies, setMovies] = useState([]);

  const getMovies = async (x) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${x}?api_key=87da4146b565f20b1a343a761ccabe5d`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await response.json();
    var newMovies = movies;
    newMovies.push(data);
    setMovies(newMovies);
  }

  useEffect(() => {

    var index = 500;
    while (index < 512) {
      getMovies(index);
      index = index + 1;
    }
    console.log(movies);
  }, [])



  let peliculas = peliculasJson;

  const cargarPeliculas = () => {
    peliculas = peliculas.slice(
      (paginaActual - 1) * TOTAL_POR_PAGINA,
      paginaActual * TOTAL_POR_PAGINA
    );
  }

  const getTotalPaginas = () => {
    let cantidadTotalDePeliculas = peliculasJson.length;
    return Math.ceil(cantidadTotalDePeliculas / TOTAL_POR_PAGINA);
  }

  cargarPeliculas();

  return (
    <PageWrapper>
      {movies.map(pelicula =>
        <Pelicula titulo={pelicula.original_title} calificacion={pelicula.vote_average}
          fecha={pelicula.release_date} duracion={pelicula.duracion}
          img={pelicula.poster_path}>
          {pelicula.overview}
        </Pelicula>
      )}
      <Paginacion pagina={paginaActual} total={getTotalPaginas()} onChange={(pagina) => {
        setPaginaActual(pagina)
      }} />

    </PageWrapper>
  );
}

export default App;
