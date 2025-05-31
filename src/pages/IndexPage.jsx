import { Box, Typography } from "@mui/material";

export default function IndexPage() {
    return (
        <Box
            classname='index-page-box'
            sx={{
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
            }}
        >
            <Typography variant='h3'>Index Page</Typography>
        </Box>
    )
}