import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ChartContainer from './ProgressiveChart/ChartContainer';
import { formatChartDataDemo } from './ProgressiveChart/chartUtils';

export default function ProgressiveChartDemo() {
    const initialData = [
        { id: 1, name: 'NYT', wordCount: 1100000, matches: 0, isLoading: false },
        { id: 2, name: 'Gutenberg', wordCount: 22000000, matches: 0, isLoading: false },
        { id: 3, name: 'Non-fiction', wordCount: 5000000, matches: 0, isLoading: false },
        { id: 4, name: 'Shakespeare', wordCount: 5000000, matches: 0, isLoading: false },
    ];
    
    const [chartData, setChartData] = useState(formatChartDataDemo(initialData));
    const [searchPattern] = useState("\\bin a nutshell\\b");

    const handleUpdateData = () => {
        const updatedData = initialData.map(corpus => ({
            ...corpus,
            isLoading: true,
            matches: 5
        }));
        
        setChartData(formatChartDataDemo(updatedData));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Progressive Chart Demo
            </Typography>
            
            <Button 
                variant="contained" 
                onClick={handleUpdateData}
                sx={{ mb: 2 }}
            >
                {'Update Data'}
            </Button>
            
            {chartData && (
                <ChartContainer
                    chartData={chartData}
                    title="Idiom-Corpora Histogram"
                />
            )}
        </Box>
    );
}
