import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Box, Button} from '@mui/material';
import SensorPanel from '../Components/SensorPanel';

const Main = (props) => { 
    const { settings, history } = props;
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

    const goToSettings = () => {
        history.push("/settings");
    }

    return(
        <div>
            <Box sx={{display: {xs: 'block', sm: 'none', md: 'none'}}}>
                {loaded && <SensorPanel data={data} orientation="vertical" settings={settings} />}
            </Box>
            <Box sx={{display: {xs: 'none', sm: 'block', md: 'none'}}}>
                {loaded && <SensorPanel data={data} orientation="vertical" settings={settings} />}
            </Box>
            <Box sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
                {loaded && <SensorPanel data={data} orientation="horizontal" settings={settings} />}
            </Box>
            <Box>
                <Button sx={{mx: '5%', mb: 2, width: '90%'}} variant="contained" color="secondary" onClick={refresh}>
                    Fetch Data
                </Button>
            </Box>
            <Box alignItems="center" sx={{mx: 'auto'}}>
                <Button sx={{mx: '5%', mb: 2, width: '90%'}} variant="contained" color="secondary" onClick={goToSettings}>
                    Settings
                </Button>
            </Box>
        </div>
    )
}

export default Main;