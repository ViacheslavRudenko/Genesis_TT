import { CardMedia, Stack } from "@mui/material";
import { FC } from "react";

const Poster: FC<PosterProps> = ({ img }) => {
  const setDefaultImg = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    console.log("ok");

    const img = event.target as HTMLImageElement;
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
  };
  return (
    <Stack sx={styles.imgBox}>
      <CardMedia
        component="img"
        sx={styles.img}
        src={img}
        alt="poster-img"
        onError={setDefaultImg}
      />
    </Stack>
  );
};

type PosterProps = {
  img: string;
};

const styles = {
  imgBox: {
    height: { xs: "auto", md: "250px" },
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
};

export default Poster;
