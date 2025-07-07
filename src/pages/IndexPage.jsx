import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axiosServices from "../services/axiosServices";

export default function IndexPage() {
    const [myDisplayVar, setMyDisplayVar] = useState("Default")

    const handleFetchVal = () => {
        axiosServices.get('/core-api/projects/').then((response) => {
            console.log(response)
            if(!Array.isArray(response.data)) {
                setMyDisplayVar("data is not array")
            } else {
                if(response.data.length == 0) {
                    setMyDisplayVar("no data in array")
                } else {
                    setMyDisplayVar(`first project title: ${response.data[0].title}`)
                }
            }
        }).catch((error) => {
            console.log(error)
            setMyDisplayVar("error fetching data")
        })
    }

    return (
        <Box
            className='index-page-box'
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