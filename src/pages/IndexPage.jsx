import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axiosServices from "../services/axiosServices";
import { BarChart } from '@mui/x-charts/BarChart';

export default function IndexPage() {
    const [idiomText, setIdiomText] = useState("No idiom found")
    const [languageText, setLanguageText] = useState("No language found")
    const [definitionText, setDefinitionText] = useState("No definition found")
    const [regexText, setRegexText] = useState("No regex found")

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
                <Grid size={12}>
                    <TextField 
                        id='idiom-field'
                        label='Idiom'
                        value={idiomText}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        id='language-field'
                        label='Language'
                        value={languageText}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        id='definition-field'
                        label='Definition'
                        value={definitionText}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        id='regex-field'
                        label='Regular Expression'
                        value={regexText}
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