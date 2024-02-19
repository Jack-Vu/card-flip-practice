import { AppBar, IconButton, Toolbar, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext } from "react";
import { orange } from "@mui/material/colors";
import { CardDataContext } from "../context/CardDataContext";
import { Timer } from "./Timer";

function Navbar() {
  const { handleNewGame } = useContext(CardDataContext);

  return (
    <AppBar position="static" sx={{ bgcolor: orange[300] }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box id="navbar-left-side">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" sx={{ mx: 1 }} onClick={handleNewGame}>
            New Game
          </Button>
        </Box>
        <Box id="navbar-right-side">
          <Timer/>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
