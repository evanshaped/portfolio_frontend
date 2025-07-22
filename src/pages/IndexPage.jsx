import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { axiosInstanceCore, axiosInstanceIdioms } from "../services/axiosServices";

export default function IndexPage() {
    const [myDisplayVar, setMyDisplayVar] = useState("Default")
    const [someIdiom, setSomeIdiom] = useState("")

    const handleFetchVal = () => {
        axiosInstanceCore.get('projects/').then((response) => {
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

    const handleGetIdiom = () => {
        axiosInstanceIdioms.get('idioms/').then((response) => {
            console.log(response)
        })
    }

    const handlePostIdiom = () => {
        const data = {
            "text": "test idiom",
            "regex": "\\btest regex\\b",
        }
        axiosInstanceIdioms.post('idioms/', data).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Box
            className='index-page-box'
            sx={{
                p: 2,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'black',
                justifyContent: 'center',
            }}
        >
            <Typography variant='h3'>Index Page</Typography>
            <Box
                display='flex'
                sx={{
                    m: 2,
                    justifyContent: 'center',
                }}
            >
                <TextField
                    id="fetched-var"
                    label="Fetched Variable"
                    value={myDisplayVar}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
                <Button variant="contained" onClick={handleFetchVal}>Fetch val</Button>
            </Box>
            <Box
                display='flex'
                sx={{
                    m: 2,
                    justifyContent: 'center',
                }}
            >
                <Button variant="contained" onClick={handleGetIdiom}>Get Idioms</Button>
            </Box>
            <Box
                display='flex'
                sx={{
                    m: 2,
                    justifyContent: 'center',
                }}
            >
                <TextField
                    id="idiom-to-post"
                    label="Some Idiom"
                    value={someIdiom}
                    slotProps={{
                        input: { readOnly: true, },
                    }}
                />
                <Button variant="contained" onClick={handlePostIdiom}>Post Idioms</Button>
            </Box>
        </Box>
    )
}