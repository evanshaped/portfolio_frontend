import { Box, TextField, Button } from "@mui/material";


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
                sx={{ 'maxWidth': 120, }} />
            <TextField
                id="frequency"
                label="Frequency"
                value={matchInfo.frequency}
                slotProps={{ input: { readOnly: true, }, }}
                sx={{ 'maxWidth': 120, }} />
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