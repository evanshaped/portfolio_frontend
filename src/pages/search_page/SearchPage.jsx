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
    const [patternToSearch, setPatternToSearch] = useState("")
    const [searchErrorText, setSearchErrorText] = useState("")
    const [idiomMatches, setIdiomMatches] = useState(0)
    const [ searchId, setSearchId] = useState(null)
    const [searchStatus, setSearchStatus] = useState()
    const [isPolling, setIsPolling] = useState(false)
    const pollingRef = useRef(null)

    const handleSwitchIdiomSearchType = (event) => {
        setIsCustomIdiom(event.target.checked)
    }

    useEffect(() => {
        setSearchErrorText("")
    }, [patternToSearch])

    const handleSearchPatternInCorpus = () => {
        if (corpusSelectValue == null) {
            setCorpusSelectError(true)
            setCorpusSelectHelperText("Must select corpus to search")
            return
        }
        if (patternToSearch == "") {
            setSearchErrorText("No pattern to match")
            return
        }
        const data = {
            "idiom_pattern": patternToSearch,
            "corpus_id": corpusSelectValue,
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
                    pollingRef.current = setTimeout(poll, 50)
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
                setPatternToSearch={setPatternToSearch}
            />
            <CustomPatternField
                isCustomIdiom={isCustomIdiom}
                setPatternToSearch={setPatternToSearch}
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
                    id="idiom-pattern-to-match"
                    label="Pattern being matched"
                    value={patternToSearch}
                    error={searchErrorText != ""}
                    slotProps={{ input: { readOnly: true, }, }}
                />
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
                    {isPolling ? 'Searching...' : 'Match Pattern'}
                </Button>
            </Box>
            <SearchProgress searchStatus={searchStatus} />
        </Box>
    )
}