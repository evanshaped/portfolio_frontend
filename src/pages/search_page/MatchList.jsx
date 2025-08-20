import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { axiosInstanceIdioms } from "../../services/axiosServices";


export default function MatchList({matchIds: matchIdsUpdated, listMaxWidth=800}) {
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
        if (matchIdsUpdated.length == 0) {
            setMatchIdsLocal([])
            setMatchesInstances([])
            return
        }
        const newMatchIds = matchIdsUpdated.filter(idElm => !matchIdsLocal.includes(idElm))
        setMatchIdsLocal(matchIdsUpdated)
        requestNewMatches(newMatchIds)
    }, [matchIdsUpdated])
    
    return (
        <Paper style={{ maxHeight: 300, maxWidth: listMaxWidth, overflow: 'auto' }}>
            <List>
                {matchesInstances.map((matchInstance, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={createMatchString(matchInstance)} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

function createMatchString(matchInstance) {
    return (
        <>
            {matchInstance.context_before}
            <strong style={{ fontStyle: 'italic', color: '#1976d2' }}>
                {matchInstance.match_text}
            </strong>
            {matchInstance.context_after}
        </>
    )
}