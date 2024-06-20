import classNames from "classnames";
import "./Typography.css";

const Typography = ({ children, size = "m", className }) => {
  return (
    <p
      className={classNames(
        "typo",
        size === "s" ? "size-s" : "size-m",
        className
      )}
    >
      {children}
    </p>
  );
};

export default Typography;
