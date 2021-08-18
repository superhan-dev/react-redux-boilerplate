import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { TitleSharp } from "@material-ui/icons";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  drawerList: {
    padding: "0",
    display: "flex",
    justifyContent: "center",
    "& .MuiListItem-root": {
      justifyContent: "center",
    },
    "& a": {
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
    "& .MuiListItemIcon-root": {
      minWidth: "0",
      marginRight: "1rem",
    },
  },
  drawerListOpen: {
    "& .MuiListItemIcon-root": {
      marginRight: "1rem",
    },
  },
  drawerListClose: {
    "& .MuiListItemIcon-root": {
      marginRight: "0",
    },
  },
}));

function AppDrawer({ open, handleDrawerClose, menus }) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List
        className={clsx(classes.drawerList, {
          [classes.drawerListOpen]: open,
          [classes.drawerListClose]: !open,
        })}
      >
        {menus.map((menu, index) => (
          <ListItem button>
            <ListItemIcon>
              {menu.icon === "CloudUpload" && (
                <Link to={menu.path} key={menu.title}>
                  <CloudUploadIcon />
                </Link>
              )}
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>

            {open && (
              <Link to={menu.path} key={menu.title}>
                <ListItemText primary={menu.title} />
              </Link>
            )}
          </ListItem>
        ))}
      </List>

      {/* <Divider />
      <List className={classes.drawerList}>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
}

export { AppDrawer };
