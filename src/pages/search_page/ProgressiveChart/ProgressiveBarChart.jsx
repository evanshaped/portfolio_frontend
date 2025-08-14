import React, { useRef, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, CircularProgress } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ProgressiveBarChart({ 
    data, 
}) {
    const chartRef = useRef();

    const options = useMemo(() => ({
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
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
                    text: 'Frequency (per 10,000 words)'
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

    const chartData = useMemo(() => {
        return ({
            labels: data.labels || [],
            datasets: [
                {
                    data: data.frequencies || [],
                    backgroundColor: data.colors || [],
                    borderColor: data.borderColors || [],
                    borderWidth: 1,
                    rawData: data.rawData || [],
                }
            ]
        })
    }, [data])

    return (
        <Box sx={{ position: 'relative', height: '400px', width: '100%' }}>
            <Bar ref={chartRef} data={chartData} options={options} />
            
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
