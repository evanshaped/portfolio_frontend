import { Box, Typography } from "@mui/material";

export default function Account() {
    return (
        <Box
            classname='account-page-box'
            sx={{
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
            }}
        >
            <Typography variant='h3'>Account Page</Typography>
        </Box>
    )
}