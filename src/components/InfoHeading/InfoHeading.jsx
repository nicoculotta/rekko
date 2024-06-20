import React, { useState } from "react";
import "./InfoHeading.css";
import Heading from "../Heading/Heading";
import Typography from "../Typography/Typography";
import Video from "../Video/Video";
import { IoClose } from "react-icons/io5";
import { BsPlay } from "react-icons/bs";

const Image = ({ image }) => {
  return (
    <div className="info__image__wrapper">
      <img
        className="img__cover"
        src={`https://image.tmdb.org/t/p/w300/${image}`}
      />
    </div>
  );
};

const Modal = ({ video, onClickModal }) => {
  return (
    <div className="modal">
      <span className="modal__close" onClick={onClickModal}>
        <IoClose />
      </span>
      <Video idVideo={video} />
    </div>
  );
};

const Rate = ({ children }) => {
  return <div className="rate">{children}</div>;
};

const InfoHeading = ({
  title,
  year,
  rate,
  children,
  image,
  video,
  isModelOpen,
}) => {
  const [expandText, setExpandText] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const truncateText = (text) => {
    const maxLength = 100;
    const lastSpaceIndex = text.substring(0, maxLength).lastIndexOf(" ");
    return text.substring(0, lastSpaceIndex);
  };
  return (
    <>
      <div className="info__image__wrapper">
        {video && (
          <span
            className="info__image__label"
            onClick={() => setIsOpenModal(true)}
          >
            <BsPlay />
          </span>
        )}
        <Image image={image} />
      </div>

      <div className="info__wrapper">
        <div className="info__wrapper__title">
          <Heading as="h3">{title}</Heading>
          {year && <Typography size="s">{year}</Typography>}
        </div>
        <div className="info__wrapper__rate">
          <Rate>{rate && rate.toFixed(1)}</Rate>
        </div>
      </div>
      {children && (
        <div
          className={"info__paragraph"}
          onClick={() => setExpandText(!expandText)}
        >
          {!expandText ? (
            <Typography>
              {truncateText(children)}{" "}
              <span className="info__more">Leer Más</span>
            </Typography>
          ) : (
            <Typography>
              {children} <span className="info__more">Leer Menos</span>
            </Typography>
          )}
        </div>
      )}

      {isOpenModal && (
        <div>
          <Modal
            isOpen={isModelOpen}
            video={video}
            onClickModal={() => setIsOpenModal(false)}
          />
        </div>
      )}
    </>
  );
};

export default InfoHeading;
