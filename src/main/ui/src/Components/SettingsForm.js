import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Divider } from '@mui/material';
import "../form.css";

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
        console.log(e.target);
        switch(e.target.name){
            case 'cpuColor':
                setCpuColor(e.target.value);
                setCpuColorError(e.target.value.match(COLOR_REGEX) ? '' : 'Invalid Color Regex');
                break;
            case 'gpuColor':
                setGpuColor(e.target.value);
                setGpuColorError(e.target.value.match(COLOR_REGEX) ? '' : 'Invalid Color Regex');
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
                    <Divider light sx={{mt: 1, mb: 3}}/>
                    <CardContent component="div" sx={{py: 1, border: 1, borderRadius: 3, borderColor: 'text.disabled'}}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item sx={{mr: 3}}>
                                <label htmlFor="cpuColor">CPU Color: </label>
                            </Grid>
                            <Grid item sx={{mt: 1}}>
                                <input className="color-picker" name="cpuColor" value={cpuColor} type="color" onChange={changeHandler} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardContent component="div" sx={{py: 1, my: 2, border: 1, borderRadius: 3, borderColor: 'text.disabled'}}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item sx={{mr: 3}}>
                                <label htmlFor="gpuColor">GPU Color: </label>
                            </Grid>
                            <Grid item sx={{mt: 1}}>
                                <input className="color-picker" name="gpuColor" value={gpuColor} type="color" onChange={changeHandler} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <span></span>
                </Card>
            </Box>
            <Box>
                <Button sx={{width: "90%", mx: '5%', my: 2}} variant="contained" color="info" type="submit">Submit</Button>
            </Box>
        </form>
    )
}

export default SettingsForm;