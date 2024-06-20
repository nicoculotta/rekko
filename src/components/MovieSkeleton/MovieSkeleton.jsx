import React from "react";
import "./MovieSkeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Heading from "../Heading/Heading";
import Typography from "../Typography/Typography";

const MovieSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#252833" highlightColor="#2D303E">
      <div className="skeleton__wrapper">
        <Skeleton height={375} />
      </div>
      {/*  //TODO: arreglar q no se puede poner skeleton dentro de paragraph */}
      {/* <div className="skeleton__text">
        <div className="skeleton__heading">
          <Heading as="h3">
            <div>
              <Skeleton width={"70%"} />
            </div>
          </Heading>
          <Skeleton circle width={48} height={48} />
        </div>
        <div>
          <Typography>
            <div className="separator-s">
              <Skeleton />
            </div>
          </Typography>
        </div>
      </div> */}
    </SkeletonTheme>
  );
};

export default MovieSkeleton;
