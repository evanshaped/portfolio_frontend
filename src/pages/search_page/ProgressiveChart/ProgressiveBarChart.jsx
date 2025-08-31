import { useRef, useEffect } from 'react';
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
import { Box } from '@mui/material';
import { chartOptions } from './chartConstants';

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

    const initChartData = {
        labels: data.labels || [],
        datasets: [
            {
                data: data.frequencies || [],
                backgroundColor: data.colors || [],
                borderColor: data.borderColors || [],
                borderWidth: 1,
            }
        ]
    }

    // Initialize chart
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        chartRef.current = new Chart(ctx, {
            type: 'barWithErrorBars',
            data: initChartData,
            options: chartOptions,
        });

        return () => chartRef.current.destroy();
    }, [])

    // Update chart when data updates
    useEffect(() => {
        if (chartRef.current && data) {
            chartRef.current.data.datasets[0].data = data.frequencies;
            chartRef.current.update();
        }
    }, [data.frequencies])

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
