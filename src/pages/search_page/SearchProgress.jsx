import { Box, Button, TextField, Typography } from "@mui/material";

export default function SearchProgress({searchStatus}) {
    
    if (!searchStatus) { return null }
    
    return (
        <Box sx={{ m: 2 }}>
            <Typography>
                Progress: {(searchStatus.completed_chunks || 0) + (searchStatus.failed_chunks || 0)} / {searchStatus.total_chunks || 0} chunks ({searchStatus.failed_chunks || 0} failed)
            </Typography>
            <Typography>
                Status: {(searchStatus.is_completed || false) ? 'Completed' : 'In Progress'}
            </Typography>
        </Box>
    )
}