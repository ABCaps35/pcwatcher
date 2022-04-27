import React, { useState } from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import {ColorPicker} from 'mui-color';
import "../index.css";

const COLOR_REGEX = /^#([0-9a-f]{6})$/

const SettingsForm = (props) => {
    const { init, submitFunc } = props;

    let cpuHexInit = '#';
    for(let i=0;i<init.cpuColor.length;i++){
        cpuHexInit += (init.cpuColor[i]>9 ? init.cpuColor[i].toString(16) : '0'+init.cpuColor[i].toString(16));
    }

    let gpuHexInit = '#';
    for(let i=0;i<init.gpuColor.length;i++){
        gpuHexInit += (init.gpuColor[i]>9 ? init.gpuColor[i].toString(16) : '0'+init.gpuColor[i].toString(16));
    }

    const [cpuColor, setCpuColor] = useState(cpuHexInit);
    const [cpuColorError, setCpuColorError] = useState('');
    const [gpuColor, setGpuColor] = useState(gpuHexInit);
    const [gpuColorError, setGpuColorError] = useState('');

    const changeHandler = (e) => {
        switch(e.target.name){
            case 'cpuColor':
                setCpuColor(e.target.value);
                setCpuColorError(COLOR_REGEX.matches(e.target.value) ? '' : 'Invalid Color Regex');
                break;
            case 'gpuColor':
                setGpuColor(e.target.value);
                setGpuColorError(COLOR_REGEX.matches(e.target.value) ? '' : 'Invalid Color Regex');
                break;
            default:
                break;
        }
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        let cpuOut = cpuColor.slice(1);
        let gpuOut = gpuColor.slice(1);
        let out = {
            cpuColor: [
                parseInt(cpuOut.substring(0,2), 16),
                parseInt(cpuOut.substring(2,4), 16),
                parseInt(cpuOut.substring(4,6), 16)
            ],
            gpuColor: [
                parseInt(gpuOut.substring(0,2), 16),
                parseInt(gpuOut.substring(2,4), 16),
                parseInt(gpuOut.substring(4,6), 16)
            ]
        }
        if(cpuColorError==='' && gpuColorError===''){
            submitFunc(out);
        }
    }

    return (
        <form onSubmit={ submitHandler }>
            <Box justifyContent="center">
                <Card sx={{m:3, p: 2, height: '100%'}}>
                    <Typography variant="h4" align="center" sx={{mx: "auto"}}>Settings</Typography>
                    <Card>
                        <label htmlFor="cpuColor">CPU Color: </label>
                        <input className="color-picker" name="cpuColor" value={cpuColor} type="color" onChange={changeHandler} />
                        <p>{cpuColor}</p>
                    </Card>
                    <Card>
                        <label htmlFor="gpuColor">GPU Color: </label>
                        <input name="gpuColor" value={gpuColor} type="color" onChange={changeHandler} />
                        <p>{gpuColor}</p>
                    </Card>
                    <ColorPicker value={cpuColor} onChange={changeHandler} />
                    <ColorPicker value={gpuColor} onChange={changeHandler} />
                </Card>
            </Box>
            <Box>
                <Button sx={{width: "90%", mx: '5%', my: 2}} variant="contained" color="secondary" type="submit">Submit</Button>
            </Box>
        </form>
    )
}

export default SettingsForm;