import { Box, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { axiosInstanceIdioms } from "../../services/axiosServices";
import SearchProgress from "./SearchProgress";
import IdiomSelect from "./IdiomSelect";
import CorpusSelect from "./CorpusSelect";
import CustomPatternField from "./CustomPatternField";
import MatchList from "./MatchList";
import ChartContainer from "./ProgressiveChart/ChartContainer";
import MatchInfo from "./MatchInfo";
import { defaultMatchInfo, defaultSearchStatus, errorMatchInfo, formatMatchInfo } from "./SearchPageConstants";

export default function ChartPage() {
    const [corpusSelectValue, setCorpusSelectValue] = useState(null)
    const [corpusSelectHelperText, setCorpusSelectHelperText] = useState('')
    const [corpusSelectError, setCorpusSelectError] = useState(false)
    const [isCustomIdiom, setIsCustomIdiom] = useState(false)
    const [searchErrorText, setSearchErrorText] = useState("")
    const [matchInfo, setMatchInfo] = useState(defaultMatchInfo)
    const [ searchId, setSearchId] = useState(null)
    const [searchStatus, setSearchStatus] = useState(defaultSearchStatus)
    const [matchIds, setMatchIds] = useState([])
    const [isPolling, setIsPolling] = useState(false)
    const pollingRef = useRef(null)
    const [databaseIdiomId, setDatabaseIdiomId] = useState("")
    const [customPattern, setCustomPattern] = useState("\\bin a nutshell\\b")

    const handleSwitchIdiomSearchType = (event) => {
        setIsCustomIdiom(event.target.checked)
    }

    useEffect(() => {
        if (searchErrorText != "") { setSearchErrorText("") }
    }, [customPattern, databaseIdiomId])

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
            if (!databaseIdiomId) {
                setSearchErrorText("No idiom chosen")
                return
            }
            data = {...data, "idiom_id": databaseIdiomId}
        }

        setSearchStatus(defaultSearchStatus)
        setMatchInfo(defaultMatchInfo)
        setMatchIds([])
        
        axiosInstanceIdioms.post('start_search/', data).then((response) => {
            console.log(`Starting search`)
            const responseSearchId = response.data.search_id || ""
            setSearchId(responseSearchId)
            startPolling(responseSearchId)
        }).catch((error) => {
            console.error(error)
            setSearchId("")
            setMatchInfo(errorMatchInfo)
        })
    }

    const reduceSearchStatus = (status) => {
        return Object.keys(defaultSearchStatus).reduce((statusAcc, key) => {
            return {...statusAcc, [key]: status[key]}
        }, {})
    }

    const startPolling = (searchId) => {
        setIsPolling(true)
        const poll = async() => {
            try {
                const include_match_ids = true
                const response = await axiosInstanceIdioms.get(`searchsessions/${searchId}/?include_match_ids=${include_match_ids}`)
                const status = response.data
                
                setSearchStatus(reduceSearchStatus(status))
                setMatchInfo(formatMatchInfo(status))
                if (include_match_ids) {
                    setMatchIds(status["match_ids"])
                }
                
                if (!status.is_completed) {
                    pollingRef.current = setTimeout(poll, 500)
                } else {
                    setIsPolling(false)
                    console.log('Search completed!')
                }
            } catch (error) {
                console.error(error)
                setIsPolling(false)
            }
        }

        poll()
    }

    return (
        <Box
            className='index-page-box'
            sx={{
                display: 'flex',
                p: 2,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
                justifyContent: 'start',
            }}
        >
            <Box
                className='search-parameters'
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
                <IdiomSelect 
                    isCustomIdiom={isCustomIdiom}
                    databaseIdiomId={databaseIdiomId}
                    setDatabaseIdiomId={setDatabaseIdiomId}
                />
                <CustomPatternField
                    isCustomIdiom={isCustomIdiom}
                    customPattern={customPattern}
                    setCustomPattern={setCustomPattern}
                />

                <Typography variant='h4'>Matching</Typography>
                <Typography variant='subtitle2' color="red">{searchErrorText}</Typography>
                <MatchInfo
                    matchInfo={matchInfo}
                    handleSearchPatternInCorpus={handleSearchPatternInCorpus}
                    isPolling={isPolling}
                    isCustomIdiom={isCustomIdiom}
                />
                <SearchProgress searchStatus={searchStatus} />
                <Box
                    display='flex'
                    sx={{
                        m: 2,
                        justifyContent: 'start',
                    }}
                >
                    <MatchList matchIds={matchIds} />
                </Box>
            </Box>
            <Box
                className='search-parameters'
                sx={{
                    flex: 1,
                    p: 2,
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: 'black',
                    justifyContent: 'center',
                }}
            >
                <ChartContainer />
            </Box>
        </Box>
    )
}