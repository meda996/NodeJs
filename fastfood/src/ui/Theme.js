import {createMuiTheme} from '@material-ui/core/styles';

    const orange = "#F88C00";
    const gray = "#2d2d2d";
export default createMuiTheme({
    palette: {
        primary:{
            main: `${orange}`
        },
        secondary: {
            main: `${gray}`
        },
        text:{
            primary: "#000000",
            secondary: `${gray}`,
            
        }
    },

})