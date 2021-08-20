import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  ImageListItemBar,
  ImageList,
  ImageListItem,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "white",
    "&:hover": {
      color: "red",
    },
    zIndex: "10",
  },
  titleBar: {
    backgroundColor: "transparent",
  },
  imageList: (props) => ({
    // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
    transform: "translateZ(0)",
    "& .MuiImageListI-root": {
      borderRadius: "20px",
    },
    "& .MuiImageListItem-root": {
      borderRadius: "20px",
      top: "50%",
    },

    "& .MuiImageListItem-imgFullHeight": {
      width: "100%",
      height: "100%",
    },

    "& .MuiImageListItem-imgFullWidth": {
      width: "100%",
      height: "100%",
    },

    "& .MuiImageListItem-item": {
      borderRadius: props.image ? props.image.borderRadius : "10px",
    },
  }),
}));

function BasicImageList({ items, handleDeleteImage }) {
  console.log(items);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {items !== undefined && items !== [] && (
        <ImageList rowHeight={160} className={classes.imageList} cols={3}>
          {(items || []).map((item, i) => (
            <ImageListItem key={"item" + i} cols={1}>
              <img src={item.fileUrl} alt={item.fileCaption} />
              <ImageListItemBar
                position="top"
                actionPosition="right"
                // title={item.title}
                className={classes.titleBar}
                subtitle={<span>by: {item.fileName}</span>}
                actionIcon={
                  <IconButton
                    onClick={(e) => handleDeleteImage(e, item)}
                    aria-label={`star ${item.fileName}`}
                    className={classes.icon}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}
export { BasicImageList };
