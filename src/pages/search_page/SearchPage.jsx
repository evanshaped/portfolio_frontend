import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { axiosInstanceIdioms } from "../../services/axiosServices";
import SearchProgress from "./SearchProgress";
import RandomIdiom from "./RandomIdiom";
import CorpusSelect from "./CorpusSelect";
import CustomPatternField from "./CustomPatternField";

export default function SearchPage() {
    const [corpusSelectValue, setCorpusSelectValue] = useState(null)
    const [corpusSelectHelperText, setCorpusSelectHelperText] = useState('')
    const [corpusSelectError, setCorpusSelectError] = useState(false)
    const [isCustomIdiom, setIsCustomIdiom] = useState(false)
    const [searchErrorText, setSearchErrorText] = useState("")
    const [idiomMatches, setIdiomMatches] = useState(0)
    const [ searchId, setSearchId] = useState(null)
    const [searchStatus, setSearchStatus] = useState()
    const [isPolling, setIsPolling] = useState(false)
    const pollingRef = useRef(null)
    const [randomIdiom, setRandomIdiom] = useState(null)
    const [customPattern, setCustomPattern] = useState("\\bin a nutshell\\b")

    const handleSwitchIdiomSearchType = (event) => {
        setIsCustomIdiom(event.target.checked)
    }

    useEffect(() => {
        setSearchErrorText("")
    }, [customPattern, randomIdiom])

    const handleSearchPatternInCorpus = () => {
        if (corpusSelectValue == null) {
            setCorpusSelectError(true)
            setCorpusSelectHelperText("Must select corpus to search")
            return
        }

        var data = {"corpus_id": corpusSelectValue}
        if (isCustomIdiom) {
            if (customPattern == "") {
                setSearchErrorText("No pattern to match")
                return
            }
            data = {...data, "custom_regex_pattern": customPattern}
        } else {
            if (!randomIdiom) {
                setSearchErrorText("No idiom chosen")
                return
            }
            data = {...data, "idiom_id": randomIdiom.id}
            console.log(data)
        }
        
        axiosInstanceIdioms.post('start_search/', data).then((response) => {
            console.log(`Starting search`)
            const responseSearchId = response.data.search_id || ""
            setSearchId(responseSearchId)
            startPolling(responseSearchId)
        }).catch((error) => {
            console.log(error)
            setSearchId("")
            setIdiomMatches("error")
        })
    }

    const startPolling = (searchId) => {
        setIsPolling(true)
        const poll = async() => {
            try {
                const response = await axiosInstanceIdioms.get(`searchsessions/${searchId}/`)
                const status = response.data
                
                setSearchStatus(status)
                setIdiomMatches(status.total_matches || 0)
                
                if (!status.is_completed) {
                    pollingRef.current = setTimeout(poll, 500)
                } else {
                    setIsPolling(false)
                    console.log('Search completed!')
                }
            } catch (error) {
                console.log(error)
                setIsPolling(false)
            }
        }

        poll()
    }

    return (
        <Box
            className='index-page-box'
            sx={{
                p: 2,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
                justifyContent: 'center',
            }}
        >
            <Typography variant='h4'>Corpora</Typography>
            <CorpusSelect 
                corpusSelectValue={corpusSelectValue}
                setCorpusSelectValue={setCorpusSelectValue}
                corpusSelectHelperText={corpusSelectHelperText}
                setCorpusSelectHelperText={setCorpusSelectHelperText}
                corpusSelectError={corpusSelectError}
                setCorpusSelectError={setCorpusSelectError}
            />

            <Typography variant='h4'>Idiom</Typography>
            <FormGroup>
                <FormControlLabel control={<Switch />} checked={isCustomIdiom} onChange={handleSwitchIdiomSearchType} label={`Use ${isCustomIdiom? "Custom Idiom" : "Database Idiom"}`} />
            </FormGroup>
            <RandomIdiom 
                isCustomIdiom={isCustomIdiom}
                randomIdiom={randomIdiom}
                setRandomIdiom={setRandomIdiom}
            />
            <CustomPatternField
                isCustomIdiom={isCustomIdiom}
                customPattern={customPattern}
                setCustomPattern={setCustomPattern}
            />

            <Typography variant='h4'>Matching</Typography>
            <Typography variant='subtitle2' color="red">{searchErrorText}</Typography>
            <Box
                display='flex'
                sx={{
                    m: 2,
                    justifyContent: 'start',
                }}
            >
                <TextField
                    id="matches-found"
                    label="Matches Found"
                    value={idiomMatches}
                    slotProps={{ input: { readOnly: true, }, }}
                />
                <Button
                    variant="contained" 
                    onClick={handleSearchPatternInCorpus}
                    disabled={isPolling}
                >
                    {isPolling ? 'Searching...' : (isCustomIdiom ? 'Match Custom Pattern' : 'Match Idiom')}
                </Button>
            </Box>
            <SearchProgress searchStatus={searchStatus} />
        </Box>
    )
}