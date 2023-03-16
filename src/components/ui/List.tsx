import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

const List: FC<ListTypes> = ({ title, array }) => {
  return (
    <Box paddingY={2}>
      <Typography fontWeight="bold">{title}: </Typography>
      {array.map((skill: string) => (
        <Stack key={skill} sx={styles.item}>
          <Box sx={styles.point} />
          <Typography variant="body1">{skill}</Typography>
        </Stack>
      ))}
    </Box>
  );
};

type ListTypes = {
  title: string;
  array: string[];
};

const styles = {
  item: { flexDirection: "row", gap: 1, alignItems: "center", paddingTop: 1 },
  point: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "primary.main",
  },
};

export default List;
