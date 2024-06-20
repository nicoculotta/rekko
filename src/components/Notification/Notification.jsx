import React from "react";
import Heading from "../Heading/Heading";
import Typography from "../Typography/Typography";
import "./Notification.css";
import { VscClose } from "react-icons/vsc";

const Notification = ({ title, text, onClick }) => {
  return (
    <div className="notification__wrapper">
      <div className="notification" onClick={onClick}>
        <VscClose className="icon__close" />
        <Heading as="h3">{title}</Heading>
        <Typography>{text}</Typography>
      </div>
    </div>
  );
};

export default Notification;
