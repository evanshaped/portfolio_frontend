import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ChartContainer } from './ProgressiveChart';
import { formatChartData, updateCorpusInChartData } from './ProgressiveChart/chartUtils';

/**
 * Demo component showing how to use the ProgressiveChart components
 * This would be integrated into your actual ProgressiveSearchPage
 */
export default function ProgressiveChartDemo() {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchPattern] = useState("\\bin a nutshell\\b");

    // Mock corpus data - replace with actual API calls
    const mockCorpora = [
        { id: 1, name: 'NYT', wordCount: 1100000, matches: 0, isLoading: false },
        { id: 2, name: 'Gutenberg', wordCount: 22000000, matches: 0, isLoading: false },
        { id: 3, name: 'Non-fiction', wordCount: 5000000, matches: 0, isLoading: false },
        { id: 4, name: 'Shakespeare', wordCount: 5000000, matches: 0, isLoading: false },
    ];

    const handleStartDemo = () => {
        setIsLoading(true);
        
        // Initialize chart with loading states
        const initialData = mockCorpora.map(corpus => ({
            ...corpus,
            isLoading: true,
            matches: 0
        }));
        
        setChartData(formatChartData(initialData));
        
        // Simulate progressive search completion
        initialData.forEach((corpus, index) => {
            setTimeout(() => {
                const mockMatches = Math.floor(Math.random() * 20) + 1;
                
                setChartData(prevData => 
                    updateCorpusInChartData(prevData, index, {
                        matches: mockMatches,
                        isLoading: false,
                        isCompleted: true
                    })
                );
                
                // Check if all searches are complete
                if (index === initialData.length - 1) {
                    setIsLoading(false);
                }
            }, (index + 1) * 2000); // Stagger completion times
        });
    };

    const handleBarClick = (corpusName, corpusData) => {
        console.log('Bar clicked:', corpusName, corpusData);
        // Handle bar click - could open detailed view, etc.
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Progressive Chart Demo
            </Typography>
            
            <Button 
                variant="contained" 
                onClick={handleStartDemo}
                disabled={isLoading}
                sx={{ mb: 2 }}
            >
                {isLoading ? 'Searching...' : 'Start Demo Search'}
            </Button>
            
            {chartData && (
                <ChartContainer
                    chartData={chartData}
                    isLoading={isLoading}
                    searchPattern={searchPattern}
                    onBarClick={handleBarClick}
                    title="Idiom-Corpora Histogram"
                />
            )}
        </Box>
    );
}
