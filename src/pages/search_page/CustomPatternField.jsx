import { Box, TextField } from "@mui/material"
import { useEffect, useState } from "react"


export default function CustomPatternField({isCustomIdiom, customPattern, setCustomPattern}) {
    

    return (
        <Box>
            <Box
                sx={{
                    display: 'inline-block',
                    m: 2,
                    p: 1,
                    borderStyle: 'solid',
                    borderColor: 'grey',
                    borderWidth: 1,
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
        </Box>
    )
}