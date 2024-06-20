import classNames from "classnames";
import "./Heading.css";

const Heading = ({ children, as, className }) => {
  const Tag = as || "h2";
  return (
    <Tag
      className={classNames(
        as === "h2" ? "heading-2" : as === "h3" ? "heading-3" : "heading-4",
        "heading",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
