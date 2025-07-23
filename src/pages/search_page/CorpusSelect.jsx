import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material"
import { useEffect, useState } from "react"
import { axiosInstanceIdioms } from "../../services/axiosServices"


export default function CorpusSelect({
    corpusSelectValue, setCorpusSelectValue,
    corpusSelectHelperText, setCorpusSelectHelperText,
    corpusSelectError, setCorpusSelectError,
}) {
    const [availableCorpora, setAvailableCorpora] = useState([])

    useEffect(() => {
        fetchAvailableCorpora()
    }, [])

    const handleCorpusChange = (event) => {
        setCorpusSelectValue(event.target.value)
        setCorpusSelectHelperText('')
        setCorpusSelectError(false)
    }

    const fetchAvailableCorpora = () => {
        axiosInstanceIdioms.get('corpora/').then((response) => {
            console.log(`Got corpora from database`, response)
            setAvailableCorpora(response.data)
        }).catch((error) => {
            console.log("Failed to get corpora from database", error)
            setCorpusSelectError(true)
            setCorpusSelectHelperText("Failed to get corpora from database")
        })
    }

    return (
        <Box
            display='flex'
            sx={{
                m: 3,
                justifyContent: 'start',
            }}
        >
            <FormControl error={corpusSelectError}>
                <FormLabel id="corpus-radio-buttons-group-label">Corpus to search...</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="corpus-radio-buttons-group-label"
                    name="corpus-radio-buttons-group"
                    value={corpusSelectValue}
                    onChange={handleCorpusChange}
                >
                    {availableCorpora.map(corpus => (
                        <FormControlLabel value={corpus.id} control={<Radio />} label={corpus.name} />
                    ))}
                </RadioGroup>
                <FormHelperText>{corpusSelectHelperText}</FormHelperText>
            </FormControl>
        </Box>
    )
}