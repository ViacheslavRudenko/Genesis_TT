import { CardMedia, Stack } from "@mui/material";
import { FC } from "react";

const Poster: FC<PosterProps> = ({ img }) => {
  return (
    <Stack sx={styles.imgBox}>
      <CardMedia component="img" sx={styles.img} src={img} alt="poster-img" />
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
