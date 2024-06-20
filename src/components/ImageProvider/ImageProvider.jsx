import "./ImageProvider.css";

export const ImageProvider = ({ image }) => {
  return (
    <div className="image__provider">
      <img
        className="img__cover"
        src={`https://image.tmdb.org/t/p/w300/${image}`}
      />
    </div>
  );
};
