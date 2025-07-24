import { useEffect, useState } from "react"
import { axiosInstanceIdioms } from "../../services/axiosServices"
import { Box, TextField, Button } from "@mui/material"


export default function RandomIdiom({isCustomIdiom, setPatternToSearch}) {
    const [randomIdiomText, setRandomIdiomText] = useState('')
    const [randomIdiomRegex, setRandomIdiomRegex] = useState('')

    useEffect(() => {
        if (!isCustomIdiom) {
            setPatternToSearch(randomIdiomRegex)
        }
    }, [isCustomIdiom, randomIdiomRegex])

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
                    justifyContent: 'start',
                }}
            >
                <TextField
                    id="random-idiom-text"
                    label="Random Idiom"
                    value={randomIdiomText}
                    disabled={isCustomIdiom}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
                <TextField
                    id="random-idiom-regex"
                    label="Regex"
                    value={randomIdiomRegex}
                    disabled={isCustomIdiom}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
                <Button variant="contained" disabled={isCustomIdiom} onClick={handleFetchRandomIdiom}>Fetch Random Idiom</Button>
            </Box>
    )
}