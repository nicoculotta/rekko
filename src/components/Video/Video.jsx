import React from "react";
import "./Video.css";

const Video = ({ idVideo }) => {
  return (
    <div className="video__wrapper">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${idVideo}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
