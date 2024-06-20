import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoHeading from "../../components/InfoHeading/InfoHeading";
import Navigation from "../../components/Navigation/Navigation";
import Typography from "../../components/Typography/Typography";
import Video from "../../components/Video/Video";
import "./Details.css";

export const Details = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [info, setInfo] = useState(null);
  const [providersInfo, setProvidersInfo] = useState(null);

  const url_movie = `https://${import.meta.env.VITE_API_URL}/${params.type}/${
    params.id
  }?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=es-ES&append_to_response=videos,watch`;

  const providers = `https://${import.meta.env.VITE_API_URL}/${params.type}/${
    params.id
  }/watch/providers?api_key=${import.meta.env.VITE_API_KEY}`;

  const getDetails = useCallback(async () => {
    const response = await fetch(url_movie).then((res) => res.json());
    setInfo(response);
  });

  const getProviders = useCallback(async () => {
    const response = await fetch(providers).then((res) => res.json());
    setProvidersInfo(response);
  });

  useEffect(() => {
    getDetails();
    getProviders();
  }, []);

  return (
    <div className="wrapper">
      <Navigation hasArrow onClick={() => navigate(-1)} />
      <div className="content__spacing">
        {info && (
          <>
            {info.videos && info.videos.results.length >= 1 && (
              <Video idVideo={info.videos.results[0].key} />
            )}

            <div>
              <InfoHeading
                title={info.title || info.name}
                rate={info.vote_average}
                year={info.release_date?.slice(0, 4)}
                onClick={() => handleDetails()}
              />
              <div className="detail__paragraph">
                <Typography className={"title__overview"}>Resumen:</Typography>
                <Typography>{info.overview}</Typography>
              </div>
            </div>
          </>
        )}
        {providersInfo?.results && providersInfo.results.ES?.flatrate && (
          <div className="detail__paragraph">
            <Typography className={"separator-m"}>Donde verla</Typography>
            {providersInfo.results.ES?.flatrate?.map((logo) => (
              <ImageProvider image={logo.logo_path} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
