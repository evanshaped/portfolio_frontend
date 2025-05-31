import { Box, Typography } from "@mui/material";

export default function Home() {
    return (
        <Box
            className='home-page-box'
            sx={{
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
            }}
        >
            <Typography variant='h3'>Home Page</Typography>
        </Box>
    )
}