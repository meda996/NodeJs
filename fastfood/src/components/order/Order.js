import axios from 'axios';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '100px'
    },
    name: {
        fontSize: "30px",
    },
    paper: {
        width: "100%",
        height: "fit-content"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const sizes = [
    { size: "small", price: 200, time: 1000 },
    { size: "medium", price: 400, time: 2000 },
    { size: "large", price: 600, time: 3000 },
]

export default function Order() {
    const classes = useStyles();
    const [ingredientCounter, setIngredientCounter] = React.useState([]);
    const [update, setUpdate] = React.useState(false);
    const [alerted, setAlerted] = React.useState({
        alerted: "false",
        msg: ""
    });
    const [size, setSize] = React.useState(sizes[0]);
    const [total, setTotal] = React.useState({
        price: sizes[0].price,
        time: sizes[0].time
    });
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
    });


    useEffect(() => {
        if (ingredientCounter.length === 0) {
            axios.get(`http://localhost:3001/ingredients`)
                .then(response => {
                    let ingredientCounterArray = [];
                    let index = 0;
                    response.data.ingredients.map(ingredient => {
                        const ing = {
                            ...ingredient,
                            counter: 0,
                            index: index
                        }
                        ingredientCounterArray.push(ing);
                        index++;
                    })
                    setIngredientCounter(ingredientCounterArray);
                }).catch(err => {
                    console.log(err);
                })
        }
    })

     const handleChange = (event, index) => {
        if (event.target.id === "add") {
            const newArray = ingredientCounter;
            newArray[index].counter = newArray[index].counter + 1;
            setTotal({ price: newArray[index].price + total.price, time: newArray[index].time + total.time });
            setIngredientCounter(newArray);
            setUpdate(!update)
        }
        if (event.target.id === "remove") {
            if (ingredientCounter[index].counter < 1) {
                setAlerted({
                    alarted: true,
                    msg: "Ingredient number cant be negative!"
                })
            } else {
                const newArray = ingredientCounter;
                newArray[index].counter = newArray[index].counter - 1;
                setTotal({ price: total.price - newArray[index].price, time: total.time - newArray[index].time });
                setIngredientCounter(newArray);
                setUpdate(!update)
            }

        }
     }

    const handleSelect = (event) => {
        if (event.target.value === "small") {
            setTotal({price:total.price - size.price + sizes[0].price,time:total.time - size.time + sizes[0].time});
            setSize(sizes[0]);
        }
        if (event.target.value === "medium") {
            setTotal({price:total.price - size.price + sizes[1].price,time:total.time - size.time + sizes[1].time});
            setSize(sizes[1]);
        }
        if (event.target.value === "large") {
            setTotal({price:total.price - size.price + sizes[2].price,time:total.time - size.time + sizes[2].time});
            setSize(sizes[2]);
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        setSize(sizes[0]);
        setTotal({price:sizes[0].price,time:sizes[0].time});
        setIngredientCounter([]);
    }
    const handleOrder = () => {
        let ingredients = []; 
         ingredientCounter.map(ingredient => {
            console.log(ingredient);
            if(ingredient.counter > 0){
                const ing = {
                    name: ingredient._id,
                    quantity: ingredient.counter,
                }
                ingredients.push(ing);
            }
        });
        console.log(ingredients);
        const pizza = {
            price: total.price,
            time: total.time,
            size: size.size,
            ingredients: ingredients,
        }
        console.log(pizza);
        axios.post(`http://localhost:3001/order`,
            {
                customer: customer,
                pizza: pizza,
            }).then(response => {
                console.log(response);
            }).catch(err => { console.log(err) })
    }

    const handleInput = (event) => {
        setCustomer({
            ...customer,
            [event.target.id]: event.target.value
        })
    }

    return (
        <div className={classes.root}>
            {!alerted.alerted ? <Alert style={{ marginBottom: "20px" }} severity="error" onClose={() => setAlerted({ alerted: "false", msg: "" })} >{alerted.msg}</Alert> : <div></div>}
            <div>
                <div style={{ display: "inline-flex", alignItems: "center", marginBottom: "15px" }}>
                    <InputLabel htmlFor="select">Select Pizza Size:</InputLabel>
                    <Select
                        style={{ marginLeft: "20px" }}
                        native
                        value={size.size}
                        onChange={handleSelect}
                        label="Size"
                        inputProps={{
                            id: 'select',
                        }}
                    >
                        <option id="mala" value={"small"} selected>Small</option>
                        <option id="mala" value={"medium"}>Medium</option>
                        <option value={"large"}>Large</option>
                    </Select>
                </div>
                <hr />
                <Paper elevation={3}>
                    {ingredientCounter.map(ingredient => {
                        const name = ingredient.name[0].toUpperCase() + ingredient.name.slice(1);
                        return (
                            <Grid key={ingredient._id} style={{ width: "100%", marginBottom: "10px", alignItems: "center" }} container spacing={3}>
                                <Grid className={classes.name} item xs={4}>
                                    <strong style={{ marginLeft: "10px" }}>{name}:</strong>
                                </Grid>
                                <Grid item xs={8}>
                                    <button style={{ marginRight: "15px" }} id="add" onClick={(event) => handleChange(event, ingredient.index)}>
                                        Add
                                    </button>
                                    {ingredient.counter}
                                    <button id="remove" style={{ marginLeft: "15px" }} onClick={(event) => handleChange(event, ingredient.index)}>
                                        Remove
                                    </button>
                                </Grid>
                            </Grid>

                        )
                    })}
                </Paper>
                <Paper elevation={3} >
                    <h1>Checkout!</h1>
                    <hr />
                    <div style={{ marginLeft: "15px" }}>
                        <label>Total Price:</label> {total.price}$
                    <br />
                        <label>Approx. Time:</label> {Math.ceil(total.time/6000)}  min
                        <br />
                        <label>Ingredients:</label>
                        <div style={{ display: "inline-flex", width: "100%", marginTop: "10px", marginBottom: "10px" }}>
                            <Button variant="outlined" style={{ marginLeft: "15px" }} onClick={() => handleOpen()}>Order</Button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <div className={classes.modalPaper}>
                                        <div><TextField onChange={handleInput} value={customer.firstname} id="firstname" label="Firstname" /></div>
                                        <div><TextField onChange={handleInput} value={customer.lastname} id="lastname" label="Lastname" /></div>
                                        <div><TextField onChange={handleInput} value={customer.address} id="address" label="Address" /></div>
                                        <div><TextField onChange={handleInput} value={customer.phone} id="phone" label="Number" /></div>
                                        <h3>Total Price: {total.price}$</h3>
                                        <Button variant="outlined" onClick={() => handleOrder()}>Order Now</Button>
                                        <Button style={{ marginLeft: "10px" }} onClick={() => handleClose()} variant="outlined">Close</Button>
                                    </div>

                                </Fade>
                            </Modal>
                            <Button variant="outlined" style={{ marginLeft: "auto", marginRight: "20px" }} onClick={() => handleReset()}>Reset</Button>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    )
}