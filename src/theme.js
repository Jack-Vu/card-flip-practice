import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[200],
    },
  },
});

export default theme;
