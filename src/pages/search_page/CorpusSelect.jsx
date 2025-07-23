import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material"
import { useState } from "react"


export default function CorpusSelect() {
    const [corpusValue, setCorpusValue] = useState(null)
    const [corpusHelperText, setCorpusHelperText] = useState('')
    const [corpusRadioError, setCorpusRadioError] = useState(false)

    const handleCorpusChange = (event) => {
        setCorpusValue(event.target.value)
        setCorpusHelperText('')
        setCorpusRadioError(false)
    }

    return (
        <Box
            display='flex'
            sx={{
                m: 3,
                justifyContent: 'start',
            }}
        >
            <FormControl error={corpusRadioError}>
                <FormLabel id="corpus-radio-buttons-group-label">Corpus to search...</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="corpus-radio-buttons-group-label"
                    name="corpus-radio-buttons-group"
                    value={corpusValue}
                    onChange={handleCorpusChange}
                >
                    <FormControlLabel value="corpus1" control={<Radio />} label="Corpus 1" />
                    <FormControlLabel value="corpus2" control={<Radio />} label="Corpus 2" />
                </RadioGroup>
                <FormHelperText>{corpusHelperText}</FormHelperText>
            </FormControl>
        </Box>
    )
}