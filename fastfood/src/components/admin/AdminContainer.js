import React from 'react';
import AppTimer from './Timer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SessionTimer from './SessionTimer';

const orange = "#F88C00";
const gray = "#2d2d2d";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        padding: "3px",
        displat:"inline-flex",
        width:"99%",
        color: theme.palette.primary.main,
        fontSize: "20px"
    },
    body:{
        marginTop: theme.mixins.toolbar.minHeight+35
    }


}));


export default function AdminContainer(){
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar className={classes.appbar} color="secondary">
                <Toolbar className={classes.toolbar}>
                <AppTimer  />
                <div style={{marginLeft:"20px"}}>
                <SessionTimer  />
                </div>
                <p style={{marginLeft:"auto"}}> Total Earnings: 0$</p>
                </Toolbar>
            </AppBar >
            <div className={classes.body}>
            KontisKontis
            </div>
            
        </div>
    )
}