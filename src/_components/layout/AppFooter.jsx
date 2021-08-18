import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footerBar: {
    top: "auto",
    bottom: 0,
    height: "2rem",
    backgroundColor: "#fff",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    marginLeft: "5rem",
    fontSize: "16px",
    fontWeight: "700",
    color: theme.palette.text.secondary,
  },
}));

function AppFooter() {
  const classes = useStyles();

  return (
    <footer>
      <AppBar position="fixed" className={classes.footerBar}>
        <div className={classes.footer}>© 2021 SuperHan</div>
      </AppBar>
    </footer>
  );
}

export default AppFooter;
