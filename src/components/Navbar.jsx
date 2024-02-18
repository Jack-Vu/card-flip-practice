import { AppBar, IconButton, Toolbar, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext } from "react";
import { orange } from "@mui/material/colors";
import { CardDataContext } from "../context/CardDataContext";

function Navbar() {
  const { handleNewGame } = useContext(CardDataContext);
  return (
    <AppBar position="static" sx={{ bgcolor: orange[300] }}>
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
