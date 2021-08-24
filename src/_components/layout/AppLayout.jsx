import React, {useState} from "react";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import {AppDrawer} from "./AppDrawer";
import {AppHeader} from "./AppHeader";
import AppFooter from "./AppFooter";

import {menus} from "../../App/data";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        height: "90vh",
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
        paddingLeft: theme.spacing(2),
        marginLeft: drawerWidth - 16,
    },
    contentWide: {
        transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        paddingLeft: theme.spacing(2),
        marginLeft: theme.spacing(7) + 3,
    },
}));

function AppLayout({children, styleprops, ...props}) {
    const classes = useStyles({...styleprops});
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
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
                <div className={classes.toolbar}/>
                {children}
            </main>
            <AppFooter/>
        </div>
    );
}

export {AppLayout};
