import { Typography, Box } from "@mui/material";

export default function SearchChartHeader({ title }) {
    return (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                {title || "Idiom-Corpora Histogram"}
            </Typography>
            {/* {searchPattern && (
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    Pattern: <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '4px' }}>
                        {searchPattern}
                    </code>
                </Typography>
            )} */}
        </Box>
    );
}
