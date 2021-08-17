import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { AppDrawer } from "./AppDrawer";
import { AppHeader } from "./AppHeader";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: "0px",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  contentNarrow: {
    transition: theme.transitions.create("margin-left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    marginLeft: drawerWidth,
  },
  contentWide: {
    transition: theme.transitions.create("margin-left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    marginLeft: theme.spacing(7) + 1,
  },
}));

function AppLayout({ children, styleprops, ...props }) {
  const classes = useStyles({ ...styleprops });
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppHeader
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        title={"React + Redux boilerplate"}
      />
      <AppDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        menus={menus}
      />

      <main
        className={clsx({
          [classes.contentNarrow]: open,
          [classes.contentWide]: !open,
        })}
      >
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export { AppLayout };

const menus = [
  {
    title: "ImageUploadPage",
    path: "/image_upload",
    imgUrl: "",
    icon: "CloudUpload",
    color: "#000",
    subMenus: [
      {
        title: "",
        path: "",
        imgUrl: "",
      },
    ],
  },
];
