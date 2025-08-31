import { Box, Paper, Typography } from "@mui/material";
import SearchChart from "./SearchChart";

export default function SearchChartContainer({ 
    chartData, 
    title = "Idiom-Corpora Histogram"
}) {

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                p: 3, 
                mt: 2, 
                borderRadius: 2,
            }}
        >
            <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                    {"Pattern-Corpus Search Results"}
                </Typography>
                {/* {searchPattern && (
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                        Pattern: <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '4px' }}>
                            {searchPattern}
                        </code>
                    </Typography>
                )} */}
            </Box>
            
            <Box sx={{ mt: 2 }}>
                {chartData && chartData.labels && chartData.labels.length > 0 ? (
                    <SearchChart
                        data={chartData}
                        animationDuration={800}
                    />
                ) : (
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '300px',
                            color: 'text.secondary'
                        }}
                    >
                        {'No data to display'}
                    </Box>
                )}
            </Box>
        </Paper>
    );
}
