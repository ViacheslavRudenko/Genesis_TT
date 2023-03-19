import { CardMedia } from "@mui/material";
import { FC, SyntheticEvent } from "react";

const Poster: FC<PosterProps> = ({ img }) => {
  const setDefaultImg = (
    event: SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    const img = event.target as HTMLImageElement;
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
  };

  return (
    <CardMedia
      component="img"
      src={img}
      alt="poster-img"
      onError={setDefaultImg}
      width="100%"
      height="100%"
    />
  );
};

type PosterProps = {
  img: string;
};

export default Poster;
