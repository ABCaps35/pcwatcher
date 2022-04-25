import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Box} from '@mui/material';

const Main = (props) => { 
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log('effect');
        axios.get('http://localhost:8080/api/fetch/')
        .then(response=>{
            setData(response);
            setLoaded(true);
            console.log(response);
        })
        .catch(err=>console.error(err));
    },[])

    /*
    const removeFromDom = (pirateId) => {
        setPirates(pirates.filter(pirate => pirate._id !== pirateId));
    }
    */

    return(
        <div>
            <Box sx={{display: {xs: 'block', sm: 'none', md: 'none'}}}>
                <p>XS</p>
            </Box>
            <Box sx={{display: {xs: 'none', sm: 'block', md: 'none'}}}>
                <p>S</p>
            </Box>
            <Box sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
                <p>MD</p>
            </Box>
        </div>
    )
}

export default Main;