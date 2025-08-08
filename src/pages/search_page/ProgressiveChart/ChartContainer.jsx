import { Box, Paper } from "@mui/material";
import ChartHeader from "./ChartHeader";
import ProgressiveBarChart from "./ProgressiveBarChart";

export default function ChartContainer({ 
    chartData, 
    isLoading, 
    searchPattern,
    onBarClick,
    title = "Idiom-Corpora Histogram"
}) {
    const completedCorpora = chartData?.rawData?.filter(corpus => !corpus.isLoading).length || 0;
    const totalCorpora = chartData?.rawData?.length || 0;

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
                totalCorpora={totalCorpora}
                completedCorpora={completedCorpora}
            />
            
            <Box sx={{ mt: 2 }}>
                {chartData && chartData.labels && chartData.labels.length > 0 ? (
                    <ProgressiveBarChart
                        data={chartData}
                        onBarClick={onBarClick}
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
                        {isLoading ? 'Initializing searches...' : 'No data to display'}
                    </Box>
                )}
            </Box>
        </Paper>
    );
}
