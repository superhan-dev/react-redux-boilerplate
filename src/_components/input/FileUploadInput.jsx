import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, IconButton, ImageList} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",
    },
}));

function FileUploadInput({handleUpload}) {
    const classes = useStyles();

    function handleChange(event) {
        console.log(event.target.files);
        handleUpload(event.target.files);
    }

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                multiple
                type="file"
                onChange={handleChange}
            />
            <label htmlFor="icon-button-file">
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <PhotoCamera/>
                </IconButton>
            </label>
        </div>
    );
}

export {FileUploadInput};
