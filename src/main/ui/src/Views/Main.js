import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Box, Button} from '@mui/material';
import SensorPanel from '../Components/SensorPanel';

const Main = (props) => { 
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        console.log('effect');
        axios.get('http://localhost:8080/api/fetch/')
        .then(response=>{
            setData(response.data);
            setLoaded(true);
            setReload(false);
            console.log(response.data);
        })
        .catch(err=>console.error(err));
    },[reload])

    const refresh = () => {
        //setLoaded(false);
        setReload(true);
    }

    return(
        <div>
            <Box sx={{display: {xs: 'block', sm: 'none', md: 'none'}}}>
                {loaded && <SensorPanel data={data} orientation="vertical" />}
            </Box>
            <Box sx={{display: {xs: 'none', sm: 'block', md: 'none'}}}>
                {loaded && <SensorPanel data={data} orientation="vertical" />}
            </Box>
            <Box sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
                {loaded && <SensorPanel data={data} orientation="horizontal" />}
            </Box>
            <Box sx={{mx: 'auto'}}>
                <Button variant="contained" onClick={refresh}>
                    Fetch Data
                </Button>
            </Box>
        </div>
    )
}

export default Main;