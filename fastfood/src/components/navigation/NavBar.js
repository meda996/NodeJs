import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Home from '../home/Home';
import Order from '../order/Order';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    toolbar: {
        padding: "3px"
    },
    logo: {
        marginRight: "auto"
    },
    loginLink: {
        marginLeft: "auto",
        paddingRight: "30px",
        color: theme.palette.primary.main,
        textDecoration: "none",
    },
    tabs: {
        marginLeft: "60px",
        width: "fit-content"
    },
    loginBtn: {
        fontSize: "15px",
    },
    tab : {
        color: "white"
    }


}));

    const components = [<Home />, <Order />]

function NavBar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [comp,setComp] = React.useState(<Home />);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setComp(components[newValue]);
    };



    return (
        <div>
            <AppBar color="secondary">
                <Toolbar className={classes.toolbar}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        className={classes.tabs}
                    >
                        <Tab className={classes.tab} label="Home" /> 
                        <Tab className = {classes.tab} label="Order Now" />
                        <Tab className = {classes.tab} label="My Orders" />
                    </Tabs>

                    <Link className={classes.loginLink} to={{
                        pathname: "/login"
                    }}><Button className={classes.loginBtn} color="inherit">Login</Button></Link>
                </Toolbar>
            </AppBar>
                    {comp}
        </div >
    );
}

export default NavBar;