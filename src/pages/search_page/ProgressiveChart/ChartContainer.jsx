import { Box, Paper } from "@mui/material";
import ChartHeader from "./ChartHeader";
import ProgressiveBarChart from "./ProgressiveBarChart";

export default function ChartContainer({ 
    chartData, 
    searchPattern = "N/A",
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
            <ChartHeader
                title={title}
                searchPattern={searchPattern}
            />
            
            <Box sx={{ mt: 2 }}>
                {chartData && chartData.labels && chartData.labels.length > 0 ? (
                    <ProgressiveBarChart
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
