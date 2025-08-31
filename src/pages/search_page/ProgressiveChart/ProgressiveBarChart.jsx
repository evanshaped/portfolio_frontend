import React, { useRef, useMemo, useEffect } from 'react';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { BarWithErrorBarsController, BarWithErrorBar } from 'chartjs-chart-error-bars';
import { Box, CircularProgress } from '@mui/material';
import { frequencyScalingFactor } from '../SearchPageConstants';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarWithErrorBarsController,
    BarWithErrorBar,
    Title,
    Tooltip,
    Legend
);

export default function ProgressiveBarChart({ 
    data, 
}) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    const options = useMemo(() => ({
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 400,
            easing: 'easeInOutQuart',
        },
        plugins: {
            legend: {
                display: false,
            },
            // tooltip: {
            //     callbacks: {
            //         label: function(context) {
            //             const dataPoint = context.parsed;
            //             const rawData = context.dataset.rawData?.[context.dataIndex];
                        
            //             if (!rawData) return '';
                        
            //             return [
            //                 `Frequency: ${dataPoint.x.toFixed(3)} per 10,000 words`,
            //                 `Matches: ${rawData.matches}`,
            //                 `Words scanned: ${rawData.wordsScanned?.toLocaleString() || 'Unknown'}`,
            //                 rawData.isLoading ? 'Status: Loading...' : 'Status: Complete'
            //             ];
            //         }
            //     }
            // }
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `Frequency (per ${frequencyScalingFactor.toLocaleString('en-US')} words)`
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Corpus (word count)'
                },
                grid: {
                    display: false,
                }
            }
        },
    }), []);

    const chartData = useMemo(() => ({
        labels: data.labels || [],
        datasets: [
            {
                data: data.frequencies || [],
                backgroundColor: data.colors || [],
                borderColor: data.borderColors || [],
                borderWidth: 1,
            }
        ]
    }), [data]);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'barWithErrorBars',
            data: chartData,
            options: options,
        });

        return () => chartRef.current.destroy();
    }, [])

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data = chartData;
            chartRef.current.update('active');
        }
    }, [chartData])

    return (
        <Box sx={{ position: 'relative', height: '400px', width: '100%' }}>
            <canvas ref={canvasRef} />
            
            {/* {data.rawData?.map((corpus, index) => (
                corpus.isLoading && (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            right: '20px',
                            top: `${20 + index * (360 / data.rawData.length)}px`,
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '50%',
                            p: 1,
                        }}
                    >
                        <CircularProgress size={20} />
                    </Box>
                )
            ))} */}
        </Box>
    );
}
