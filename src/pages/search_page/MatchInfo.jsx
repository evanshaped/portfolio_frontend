import { Box, TextField, Button } from "@mui/material";
import { frequencyScalingFactor } from "./SearchPageConstants";


export default function MatchInfo({ matchInfo, handleSearchPatternInCorpus, isPolling, isCustomIdiom }) {
    return (
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
                value={matchInfo.total_matches}
                slotProps={{ input: { readOnly: true, }, }}
                sx={{ 'maxWidth': 120, }} 
            />
            <TextField
                id="frequency"
                label={`Frequency (per ${frequencyScalingFactor.toLocaleString('en-US')} words)`}
                value={`${matchInfo.frequency} ± ${matchInfo.frequency_sigma}`}
                slotProps={{ input: { readOnly: true, }, }}
                sx={{ 'maxWidth': 210, }} 
            />
            <Button
                variant="contained"
                onClick={handleSearchPatternInCorpus}
                disabled={isPolling}
            >
                {isPolling ? 'Searching...' : (isCustomIdiom ? 'Match Custom Pattern' : 'Match Idiom')}
            </Button>
        </Box>
    )
}