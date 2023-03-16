import { Box, CardMedia } from "@mui/material";
import { FC } from "react";

const Poster: FC<PosterProps> = ({ img }) => {
  return (
    <Box sx={styles.imgBox}>
      <CardMedia component="img" sx={styles.img} src={img} alt="poster-img" />
    </Box>
  );
};

type PosterProps = {
  img: string;
};

const styles = {
  imgBox: {
    width: "100%",
    minWidth: "300px",
    height: "250px",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default Poster;
