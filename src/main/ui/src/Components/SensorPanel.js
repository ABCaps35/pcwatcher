import { Grid, Box, Paper, Card } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const SensorPanel = (props) => {
    const { data, orientation } = props;
    
    const maxes = {
        "dram_load": 100,
        "vram_load": 100,
        "cpu_load": 100,
        "gpu_load": 100,
        "cpu_temp": 95, 
        "gpu_temp": 90
    }

    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const donut_options = {
        responsive: true,
        plugins: {
            tooltip: {enabled: false},
            legend: {display: false},
            title: {display: false},
        },
        scales: {
            xAxis: {display: false},
            yAxis: {display: false}
        }
    };

    const bar_options = {
        indexAxis: 'y',
        elements: {
            bar: {borderWidth: 2}
        },
        responsive: true,
        plugins: {
            tooltip: {enabled: false},
            legend: {display: false},
            title: {display: false},
        },
        scales: {
            xAxis: {min: 0, max: 100},
            yAxis: {display: false}
        }
    };

    const cpu_load_data = {
        labels: ['CPU Load'],
        datasets: [
            {
                label: 'CPU Load',
                data: [data.cpu_load,100-data.cpu_load],
                borderColor: ['rgb(0,255,0)','rgb(0,0,0)'],
                backgroundColor: ['rgb(150,255,150)','rgb(0,0,0)'],
                circumference: 300,
                rotation: 210
            }
        ]
    }
    const gpu_load_data = {
        labels: ['GPU Load'],
        datasets: [
            {
                label: 'GPU Load',
                data: [data.gpu_load,100-data.gpu_load],
                borderColor: ['rgb(255,0,0)','rgb(0,0,0)'],
                backgroundColor: ['rgb(255,150,150','rgb(0,0,0)'],
                circumference: 300,
                rotation: 210
            }
        ]
    }

    const cpu_temp_data = {
        labels: ['CPU Temp'],
        datasets: [
            {
                label: 'CPU Temp',
                data: [data.cpu_temp,95-data.cpu_temp],
                borderColor: ['rgb(0,255,0)','rgb(0,0,0)'],
                backgroundColor: ['rgb(150,255,150)','rgb(0,0,0)'],
                circumference: 300,
                rotation: 210
            }
        ]
    }
    const gpu_temp_data = {
        labels: ['GPU Temp'],
        datasets: [
            {
                label: 'GPU Temp',
                data: [data.gpu_temp,90-data.gpu_temp],
                borderColor: ['rgb(255,0,0)','rgb(0,0,0)'],
                backgroundColor: ['rgb(255,150,150','rgb(0,0,0)'],
                circumference: 300,
                rotation: 210
            }
        ]
    }

    const dram_data = {
        labels: ['DRAM'],
        datasets: [
            {
                label: 'DRAM',
                data: [data.dram_load],
                borderColor: 'rgb(0,255,0)',
                backgroundColor: 'rgb(150,255,150)'
            }
        ]
    };
    const vram_data = {
        labels: ['VRAM'],
        datasets: [
            {
                label: 'VRAM',
                data: [data.vram_load],
                borderColor: 'rgb(255,0,0)',
                backgroundColor: 'rgb(255,150,150)'
            },
        ],
    };

    return (
        <Box>
            {orientation==='horizontal' ? ( 
                <Grid container alignItems='stretch' spacing={3} p={3}>
                    <Grid item xs={6} md={4} style={{display: 'flex'}}>
                        <Card sx={{p: 2}}>CPU Load: {data.cpu_load}%
                            <Doughnut options={donut_options} data={cpu_load_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4} style={{display: 'flex'}}>
                        <Card sx={{p: 2}}>CPU Temp: {data.cpu_temp} °C
                            <Doughnut options={donut_options} data={cpu_temp_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4} style={{display: 'flex'}}>
                        <Card sx={{p: 2}}>DRAM Load: {data.dram_load}%
                            <Bar options={bar_options} data={dram_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4} style={{display: 'flex'}}>
                        <Card sx={{p: 2}}>GPU Load: {data.gpu_load}%
                            <Doughnut options={donut_options} data={gpu_load_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4} style={{display: 'flex'}}>
                        <Card sx={{p: 2}}>GPU Temp: {data.gpu_temp} °C
                            <Doughnut options={donut_options} data={gpu_temp_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4} style={{display: 'flex'}}>
                        <Card sx={{p: 2}}>VRAM Load: {data.vram_load}%
                            <Bar options={bar_options} data={vram_data}/>
                        </Card>
                    </Grid>
                </Grid>
            ): (
                <Grid container spacing={3} p={3}>
                    <Grid item xs={6} md={4}>
                        <Card sx={{p: 2}}>CPU Load: {data.cpu_load}%
                            <Doughnut options={donut_options} data={cpu_load_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{p: 2}}>GPU Load: {data.gpu_load}%
                            <Doughnut options={donut_options} data={gpu_load_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{p: 2}}>CPU Temp: {data.cpu_temp} °C
                            <Doughnut options={donut_options} data={cpu_temp_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{p: 2}}>GPU Temp: {data.gpu_temp} °C
                            <Doughnut options={donut_options} data={gpu_temp_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{p: 2}}>DRAM Load: {data.dram_load}%
                            <Bar options={bar_options} data={dram_data}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{p: 2}}>VRAM Load: {data.vram_load}%
                            <Bar options={bar_options} data={vram_data}/>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Box>
    )
}

export default SensorPanel;