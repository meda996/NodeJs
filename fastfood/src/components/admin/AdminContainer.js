import React, { useEffect } from 'react';
import AppTimer from './Timer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SessionTimer from './SessionTimer';
import axios from 'axios';

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
    const [total,setTotal] = React.useState(-1);
    const [orders,setOrders] = React.useState([]);

    const classes = useStyles();

    useEffect(() => {
        if(total === -1 && orders.length === 0){
            axios.get(`http://localhost:3001/admin`)
            .then(response => {
                setTotal(response.data.totalEarned);
                setOrders(response.data.orderHistory);

            }).catch(e =>{
                console.log(e);
            })
        }
    })
    return(
        <div className={classes.root}>
            <AppBar className={classes.appbar} color="secondary">
                <Toolbar className={classes.toolbar}>
                <AppTimer  />
                <div style={{marginLeft:"20px"}}>
                <SessionTimer  />
                </div>
                <p style={{marginLeft:"auto"}}> Total Earnings: {total}$</p>
                </Toolbar>
            </AppBar >
            <div className={classes.body}>
            </div>
            
        </div>
    )
}