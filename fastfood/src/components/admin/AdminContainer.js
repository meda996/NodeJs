import React from 'react';
import Timer from './Timer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const orange = "#F88C00";
const gray = "#2d2d2d";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        padding: "3px",
        displat:"inline-flex",
        width:"99%",
        color: theme.palette.primary.main,
    },


}));


export default function AdminContainer(){
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar className={classes.appbar} color="secondary">
                <Toolbar className={classes.toolbar}>
                <Timer />
                <p style={{marginLeft:"auto",}}> Total Earning: 0$</p>
                </Toolbar>
            </AppBar >
            
            Kontis
        </div>
    )
}