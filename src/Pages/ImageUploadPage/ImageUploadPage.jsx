import React from "react";
import { AppLayout, FileUploadInput } from "../../_components";
import { Paper } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    margin: "0px",
  },
}));

function ImageUploadPage() {
  const classes = useStyles();

  return (
    <AppLayout>
      <div className={classes.wrap}>
        <FileUploadInput />
      </div>
    </AppLayout>
  );
}

export { ImageUploadPage };
