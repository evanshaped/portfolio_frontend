import { useState } from "react"
import { axiosInstanceIdioms } from "../../services/axiosServices"
import { Box, TextField, Button } from "@mui/material"


export default function RandomIdiom() {
    const [randomIdiomText, setRandomIdiomText] = useState('default')
    const [randomIdiomRegex, setRandomIdiomRegex] = useState('default')

    const handleFetchRandomIdiom = () => {
        axiosInstanceIdioms.get('idioms/random/').then((response) => {
            console.log(response)
            setRandomIdiomText(response.data.idiomText)
            setRandomIdiomRegex(response.data.regexText)
        }).catch((error) => {
            console.log(error)
            setRandomIdiomText('error')
            setRandomIdiomRegex('error')
        })
    }
    
    return (
        <Box
                display='flex'
                sx={{
                    m: 2,
                    justifyContent: 'center',
                }}
            >
                <TextField
                    id="random-idiom-text"
                    label="Random Idiom"
                    value={randomIdiomText}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
                <TextField
                    id="random-idiom-regex"
                    label="Regex"
                    value={randomIdiomRegex}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
                <Button variant="contained" onClick={handleFetchRandomIdiom}>Random Idiom</Button>
            </Box>
    )
}