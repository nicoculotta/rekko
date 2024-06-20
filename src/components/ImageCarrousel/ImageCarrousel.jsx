import React from "react";
import "./ImageCarrousel.css";

const Image = ({ image }) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w300/${image.image}`}
      alt={image.title}
    />
  );
};

const ImageCarrousel = ({ imageSet, scrollAnimation }) => {
  return (
    <div className="slider">
      <div
        className={
          scrollAnimation === "right"
            ? "slide__track scroll-right"
            : "slide__track scroll-left"
        }
      >
        {imageSet.map((i, index) => (
          <div key={index} className="slide">
            <Image image={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarrousel;
