export const discoverUrl = (page, type, genres) =>
  `https://${import.meta.env.VITE_API_URL_DISCOVER}/${type}?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genres}`;

export const similarUrl = (type, id) =>
  `https://${
    import.meta.env.VITE_API_URL
  }/${type}/${id}/recommendations?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=es-ES&sort_by=popularity.desc&include_adult=false&page=1`;

export const trendingUrl = (type) =>
  `https://${import.meta.env.VITE_API_URL}/trending/${type}/week?api_key=${
    import.meta.env.VITE_API_KEY
  }`;

export const movieUrl = (type, id) =>
  `https://${import.meta.env.VITE_API_URL}/${type}/${id}?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=es-ES&append_to_response=videos,watch`;

export const providersUrl = (type, id) =>
  `https://${
    import.meta.env.VITE_API_URL
  }/${type}/${id}/watch/providers?api_key=${import.meta.env.VITE_API_KEY}`;
