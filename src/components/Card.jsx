import { Box } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";

function Card() {
  return (
    <Box
      width={100}
      height={100}
      bgcolor={"white"}
      sx={{ "&:hover": { bgcolor: orange[300] } }}
    >
      <img
        src={"/assets/1.webp"}
        alt={"card-1"}
        loading="lazy"
        height={"100%"}
      />
    </Box>
  );
}

export { Card };
