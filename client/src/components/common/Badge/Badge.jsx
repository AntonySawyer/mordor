import React from "react";
import "./Badge.css";

export default props => {
  return (
    <span
      className={`badge ${props.className || "badge-secondary badge-light"}`}
      onClick={props.handler}
    >
      {props.title}
    </span>
  );
};
