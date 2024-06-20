import {
  discoverUrl,
  movieUrl,
  providersUrl,
  similarUrl,
  trendingUrl,
} from "../constants/urlApi";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getMovies = async (page, type, genres) => {
  return fetchData(discoverUrl(page, type, genres));
};

export const getSimilar = async (type, id) => {
  return fetchData(similarUrl(type, id));
};

export const getTrending = async (type) => {
  return fetchData(trendingUrl(type));
};

export const getDetails = async (type, id) => {
  return fetchData(movieUrl(type, id));
};

export const getProviders = async (type, id) => {
  return fetchData(providersUrl(type, id));
};
