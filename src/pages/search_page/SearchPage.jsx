import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { axiosInstanceIdioms } from "../../services/axiosServices";
import SearchProgress from "./SearchProgress";

export default function SearchPage() {
    const [idiomPattern, setIdiomPattern] = useState("\\bin a nutshell\\b")
    const [idiomMatches, setIdiomMatches] = useState(0)
    const [ searchId, setSearchId] = useState(null)
    const [searchStatus, setSearchStatus] = useState()
    const [isPolling, setIsPolling] = useState(false)
    const pollingRef = useRef(null)
    const [randomIdiomText, setRandomIdiomText] = useState('default')
    const [randomIdiomRegex, setRandomIdiomRegex] = useState('default')

    const handleMatchPatternInCorpus = () => {
        const data = {
            "idiom_pattern": idiomPattern,
            "corpus_id": 1,
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
            className='index-page-box'
            sx={{
                p: 2,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
                justifyContent: 'center',
            }}
        >
            <Typography variant='h3'>Search Page</Typography>
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
            <Box
                display='flex'
                sx={{
                    m: 2,
                    justifyContent: 'start',
                }}
            >
                <TextField
                    required
                    id="idiom-pattern"
                    label="Idiom Pattern"
                    value={idiomPattern}
                    onChange={(event) => { setIdiomPattern(event.target.value) }}
                />
                <TextField
                    id="matches-found"
                    label="Matches Found"
                    value={idiomMatches}
                    slotProps={{ input: { readOnly: true, }, }}
                />
                <Button
                    variant="contained" 
                    onClick={handleMatchPatternInCorpus}
                    disabled={isPolling}
                >
                    {isPolling ? 'Searching...' : 'Match Pattern'}
                </Button>
            </Box>
            <SearchProgress searchStatus={searchStatus} />
        </Box>
    )
}