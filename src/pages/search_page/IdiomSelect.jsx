import { useEffect, useState } from "react"
import { FormControl, InputLabel, Select, MenuItem, Typography, Box, TextField, Button } from '@mui/material';
import { axiosInstanceIdioms } from "../../services/axiosServices"


export default function IdiomSelect({isCustomIdiom, databaseIdiomId, setDatabaseIdiomId}) {
    const [databaseIdiomRegex, setDatabaseIdiomRegex] = useState("")
    const [databaseIdioms, setDatabaseIdioms] = useState([])

    useEffect(() => {
        fetchDatabaseIdioms()
    }, [])

    const fetchDatabaseIdioms = () => {
        axiosInstanceIdioms.get('idioms/').then((response) => {
            console.log(`Got idioms from database`, response)
            setDatabaseIdioms(response.data || [])
        }).catch((error) => {
            console.log("Failed to get idioms from database", error)
            // setCorpusSelectError(true)
            // setCorpusSelectHelperText("Failed to get corpora from database")
        })
    }

    const handleSelectIdiomChange = (event) => {
        setDatabaseIdiomId(event.target.value)
        const selectedIdiomArr = databaseIdioms.filter((idiom) => idiom.id == event.target.value)
        if (selectedIdiomArr.length != 1) { setDatabaseIdiomRegex("Error") }
        else { setDatabaseIdiomRegex(selectedIdiomArr[0].regex || "Not Available") }
    }

    const handleChooseRandomIdiom = () => {
        if (databaseIdioms.length) {
            const randIndex = Math.floor(Math.random() * databaseIdioms.length)
            setDatabaseIdiomId(databaseIdioms[randIndex].id)
            setDatabaseIdiomRegex(databaseIdioms[randIndex].regex || "Not Available")
        }
    }
    
    return (
        <Box
            sx={{
                display: 'inline-block',
                m: 2,
                p: 1,
                borderStyle: 'solid',
                borderColor: 'grey',
                borderWidth: 1,
            }}
        >
            <Box>
                <FormControl disabled={isCustomIdiom} sx={{minWidth: 300}}>
                    <InputLabel>Select Database Idiom</InputLabel>
                    <Select
                        value={databaseIdiomId}
                        label="Select Database Idiom"
                        onChange={handleSelectIdiomChange}
                    >
                        {databaseIdioms.map((idiom) => (
                            <MenuItem key={idiom.id} value={idiom.id}>
                                {idiom.text}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id="selected-idiom-regex"
                    label="Regex"
                    value={databaseIdiomRegex}
                    disabled={isCustomIdiom}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
            </Box>
            <Button 
                variant="contained" 
                disabled={isCustomIdiom} 
                onClick={handleChooseRandomIdiom}
                sx={{ display: 'block' }}
            >
                Choose Random Idiom
            </Button>
        </Box>
    )
}