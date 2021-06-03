import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

    paper: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)',
    },
    container: {
        margin: '20px 20px 20px 20px'
    },
    controls:{
        display:"inline-flex",
        width:"100%",
        marginBottom:"10px"
    }
}));

export default function Login() {
    const classes = useStyles();

    const handleLogin = () => {
        console.log("login");
    }

    return (
        <Paper className={classes.paper} elevation={3} >
            <div className={classes.container}>
                <div><TextField id="email" label="E-Mail" /></div>
                <div><TextField style={{marginTop:"10px"}}
                    type="password" id="password" label="Password" /></div>
            </div>
            <div className={classes.controls}>
            <Button variant="outlined" style={{marginLeft:"10px"}}  onClick={() => handleLogin()}>Login</Button>
            <Button variant="outlined" href="/" style={{ marginLeft: "auto", marginRight:"10px"}} >Back</Button>
            </div>
        </Paper>
    )
}