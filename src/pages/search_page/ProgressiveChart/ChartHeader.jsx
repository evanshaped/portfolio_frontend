import { Typography, Box } from "@mui/material";

export default function ChartHeader({ title, searchPattern, totalCorpora, completedCorpora }) {
    return (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                {title || "Idiom-Corpora Histogram"}
            </Typography>
            {searchPattern && (
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    Pattern: <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '4px' }}>
                        {searchPattern}
                    </code>
                </Typography>
            )}
            {totalCorpora > 0 && (
                <Typography variant="body2" color="text.secondary">
                    Progress: {completedCorpora}/{totalCorpora} corpora completed
                </Typography>
            )}
        </Box>
    );
}
