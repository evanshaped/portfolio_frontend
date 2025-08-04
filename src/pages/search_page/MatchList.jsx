import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { axiosInstanceIdioms } from "../../services/axiosServices";


export default function MatchList({matchIds: matchIdsUpdated}) {
    const [matchIdsLocal, setMatchIdsLocal] = useState([])
    const [matchesInstances, setMatchesInstances] = useState([])

    const requestNewMatches = (newMatchIds) => {
        const data = { 'match_ids': newMatchIds }
        axiosInstanceIdioms.post('bulk_matches/', data).then((response) => {
            setMatchesInstances(oldMatches => oldMatches.concat(response.data["matches"]))
            const missingIds = response.data["missing_ids"]
            if (missingIds.length != 0) {
                console.log("Missing match ids: ", missingIds)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        const newMatchIds = matchIdsUpdated.filter(idElm => !matchIdsLocal.includes(idElm))
        setMatchIdsLocal(matchIdsUpdated)
        requestNewMatches(newMatchIds)
    }, [matchIdsUpdated])
    
    return (
        <Paper style={{ maxHeight: 300, maxWidth: 1000, overflow: 'auto' }}>
            <List>
                {matchesInstances.map(matchInstance => (
                    <ListItem>
                        <ListItemText primary={createMatchString(matchInstance)} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

function createMatchString(matchInstance) {
    return `${matchInstance.context_before}${matchInstance.match_text}${matchInstance.context_after}`
}