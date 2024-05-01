import axios from 'axios'

const params = {
  headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWE2NDE3ZGIzZDcyNzY0MWRiYjlmNmJkYWUzNDAyYyIsInN1YiI6IjY2MmU2YWU0MDI4ZjE0MDEyNTY4ZjZkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QOFscDQjmt4t3QcPCZIUOyP_8zz4jdUjlgyjoMDlqvs'
    }
};

export const getTrendingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const response = await axios.get(url, params);
    return response.data.results;
};

export const getSearchMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const response = await axios.get(url, params);
    return response.data.results;
};

export const getMovieId = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  const responce = await axios.get(url, params)
    return responce.data;
}

export const getMovieCast = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const responce = await axios.get(url, params);
    return responce.data.cast;
}

export const getMovieReviews = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`
  const responce = await axios.get(url, params);
    return responce.data.results;
}