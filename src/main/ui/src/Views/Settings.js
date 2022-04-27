import React from 'react';
import {Box, Button} from '@mui/material';
import SettingsForm from '../Components/SettingsForm';

const Settings = (props) => { 
    const {settings, submitFunc, history} = props;

    const save = (newSettings) => {
        //console.log(newSettings.cpuColor);
        submitFunc(newSettings);
        history.push("/");
    }

    const goBack = () => {
        history.push("/");
    }

    return(
        <div>
            <SettingsForm init={settings} submitFunc={save}/>
            <Box alignItems="center" sx={{mx: 'auto'}}>
                <Button sx={{mx: '5%', mb: 2, width: '90%'}} variant="contained" color="primary" onClick={goBack}>
                    Go Back
                </Button>
            </Box>
        </div>
    )
}

export default Settings;