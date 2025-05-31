import { Box, Typography } from "@mui/material";

export default function About() {
    return (
        <Box
            classname='about-page-box'
            sx={{
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
            }}
        >
            <Typography variant='h3'>About Page</Typography>
        </Box>
    )
}