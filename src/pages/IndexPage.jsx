import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axiosServices from "../services/axiosServices";
import { BarChart } from '@mui/x-charts/BarChart';

export default function IndexPage() {
    const [idiomBasicInfo, setIdiomBasicInfo] = useState({
        idiomText: "No idiom text found",
        languageText: "No language text found",
        definitionText: "No definition text found",
        regexText: "No regex text found",
    })

    const dataset = [
        {
            corpus: 'NYT',
            freq: 0.7,
        },
        {
            corpus: 'Congress',
            freq: 0.5,
        },
        {
            corpus: 'Gutenberg',
            freq: 0.3,
        },
    ]

    const handleFetchRandomIdiom = () => {
        axiosServices.get('/idioms-api/idioms/random/').then((response) => {
            console.log(response)
            setIdiomBasicInfo(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <Stack
            direction='row'
            spacing={2}
            className='index-page-stack'
            sx={{
                p: 2,
                height: '100%',
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
            }}
        >
            <Grid 
                container
                className='idiom-info-boxes-grid'
                sx={{
                    width: '30%',
                }}
            >
                <Grid size={9}>
                    <TextField 
                        id='idiom-field'
                        label='Idiom'
                        value={idiomBasicInfo.idiomText}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid size={3}>
                    <Button variant="contained" onClick={handleFetchRandomIdiom}>Random!</Button>
                </Grid>
                <Grid size={12}>
                    <TextField
                        id='language-field'
                        label='Language'
                        value={idiomBasicInfo.languageText}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        id='definition-field'
                        label='Definition'
                        value={idiomBasicInfo.definitionText}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        id='regex-field'
                        label='Regular Expression'
                        value={idiomBasicInfo.regexText}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
            </Grid>
            <Box
                className='idiom-freq-chart-box'
                flex='auto'
                sx={{
                    p: 2,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: 'white',
                }}
            >
                <TextField 
                    value={'other side temp value'}
                    sx={{
                        width: '100%',
                    }}
                />
                <BarChart
                    xAxis={[
                        {
                        id: 'barCategories',
                        data: ['bar A', 'bar B', 'bar C'],
                        },
                    ]}
                    series={[
                        {
                        data: [2, 5, 3],
                        },
                    ]}
                    sx={{
                        height: '300px',
                    }}
                />
            </Box>
        </Stack>
    )
}