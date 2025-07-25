import { useEffect, useState } from "react"
import { axiosInstanceIdioms } from "../../services/axiosServices"
import { Box, TextField, Button } from "@mui/material"


export default function RandomIdiom({isCustomIdiom, randomIdiom, setRandomIdiom}) {
    

    const handleFetchRandomIdiom = () => {
        axiosInstanceIdioms.get('idioms/random/').then((response) => {
            console.log(response)
            setRandomIdiom(response.data)
        }).catch((error) => {
            console.log(error)
            setRandomIdiom(null)
        })
    }
    
    return (
        <Box
                display='flex'
                sx={{
                    m: 2,
                    justifyContent: 'start',
                }}
            >
                <TextField
                    id="random-idiom-text"
                    label="Random Idiom"
                    value={randomIdiom ? randomIdiom.text : ''}
                    disabled={isCustomIdiom}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
                <TextField
                    id="random-idiom-regex"
                    label="Regex"
                    value={randomIdiom ? randomIdiom.regex : ''}
                    disabled={isCustomIdiom}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
                <Button variant="contained" disabled={isCustomIdiom} onClick={handleFetchRandomIdiom}>Fetch Random Idiom</Button>
            </Box>
    )
}