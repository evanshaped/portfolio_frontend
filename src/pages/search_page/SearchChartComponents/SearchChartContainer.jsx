import { Box, Paper } from "@mui/material";
import SearchChartHeader from "./SearchChartHeader";
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
                minHeight: '500px'
            }}
        >
            <SearchChartHeader
                title={title}
            />
            
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
                            height: '400px',
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
