import axios from 'axios';
import React, { useEffect } from 'react';
import Navbar from '../navigation/NavBar';


export default function Order(){
    const [ingredients,setingredients] = React.useState([]);

    useEffect(() => {
        if(ingredients.length === 0){
        axios.get()
        }
    })

    return(
        <div>
            <div style={{marginTop:"90px"}}>
            PIZA KUCA 
            </div>
        </div>
    )
}