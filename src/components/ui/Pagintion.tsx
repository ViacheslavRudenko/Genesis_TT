import { Box, Pagination } from "@mui/material";
import { FC } from "react";

const CustomPagination: FC<CustomPaginationTypes> = ({
  page,
  pageOnChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" pt={2} pb={10}>
      <Pagination
        count={3}
        shape="rounded"
        page={page}
        onChange={(e, v) => pageOnChange(v)}
      />
    </Box>
  );
};

type CustomPaginationTypes = {
  pageOnChange: (newPage: number) => void;
  page: number;
};

export default CustomPagination;
