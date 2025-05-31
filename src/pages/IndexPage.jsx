import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function IndexPage() {
    const [myDisplayVar, setMyDisplayVar] = useState("Default")

    const handleFetchVal = () => {
        setMyDisplayVar("new val")
    }

    return (
        <Box
            classname='index-page-box'
            display='flex'
            sx={{
                p: 2,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
                justifyContent: 'center',
            }}
        >
            <TextField
                id="outlined-read-only-input"
                label="Read Only"
                value={myDisplayVar}
                slotProps={{
                    input: { readOnly: true, },
                }}
            />
            <Button variant="contained" onClick={handleFetchVal}>Fetch val</Button>
        </Box>
    )
}