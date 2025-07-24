import { Box, TextField } from "@mui/material"
import { useEffect, useState } from "react"


export default function CustomPatternField({isCustomIdiom, setPatternToSearch}) {
    const [customPattern, setCustomPattern] = useState("\\bin a nutshell\\b")

    useEffect(() => {
        if (isCustomIdiom) {
            setPatternToSearch(customPattern)
        }
    }, [isCustomIdiom, customPattern])

    return (
        <Box
            display='flex'
            sx={{
                m: 2,
                justifyContent: 'start',
            }}
        >
            <TextField
                id="idiom-pattern"
                label="Custom Pattern"
                value={customPattern}
                disabled={!isCustomIdiom}
                onChange={(event) => { setCustomPattern(event.target.value) }}
            />
        </Box>
    )
}