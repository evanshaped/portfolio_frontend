import { Box, Typography, Chip } from "@mui/material";

export default function ChartLegend({ corpora, colors }) {
    if (!corpora || !colors || corpora.length === 0) {
        return null;
    }

    return (
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ width: '100%', textAlign: 'center', mb: 1 }}>
                Corpora Legend:
            </Typography>
            {corpora.map((corpus, index) => (
                <Chip
                    key={corpus.id || index}
                    label={`${corpus.name} (${corpus.wordCount?.toLocaleString() || 'Unknown'} words)`}
                    sx={{
                        backgroundColor: colors[index] || '#ccc',
                        color: 'white',
                        fontWeight: 'medium'
                    }}
                    size="small"
                />
            ))}
        </Box>
    );
}
