/**
 * Utility functions for formatting chart data and calculations
 */

/**
 * Calculate frequency per 10,000 words
 * @param {number} matches - Number of matches found
 * @param {number} wordsScanned - Total words scanned
 * @returns {number} Frequency per 10,000 words
 */
export const calculateFrequency = (matches, wordsScanned) => {
    if (!wordsScanned || wordsScanned === 0) return 0;
    return (matches / wordsScanned) * 10000;
};

/**
 * Generate colors for chart bars
 * @param {number} count - Number of colors needed
 * @returns {Array} Array of color strings
 */
export const generateChartColors = (count) => {
    const baseColors = [
        '#FF6B6B', // Red
        '#4ECDC4', // Teal
        '#45B7D1', // Blue
        '#96CEB4', // Green
        '#FFEAA7', // Yellow
        '#DDA0DD', // Plum
        '#FFB347', // Orange
        '#87CEEB', // Sky Blue
    ];
    
    const colors = [];
    const borderColors = [];
    
    for (let i = 0; i < count; i++) {
        const color = baseColors[i % baseColors.length];
        colors.push(color);
        borderColors.push(darkenColor(color, 20));
    }
    
    return { colors, borderColors };
};

/**
 * Darken a hex color by a percentage
 * @param {string} color - Hex color string
 * @param {number} percent - Percentage to darken (0-100)
 * @returns {string} Darkened hex color
 */
const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
};

/**
 * Format corpus search results into chart data
 * @param {Array} corporaResults - Array of corpus search results
 * @returns {Object} Formatted chart data
 */
export const formatChartData = (corporaResults) => {
    if (!corporaResults || corporaResults.length === 0) {
        return {
            labels: [],
            frequencies: [],
            rawData: [],
            colors: [],
            borderColors: []
        };
    }

    const labels = [];
    const frequencies = [];
    const rawData = [];
    
    corporaResults.forEach(corpus => {
        // Create label with corpus name and word count
        const wordCountStr = corpus.wordCount ? 
            `(${(corpus.wordCount / 1000000).toFixed(1)}M)` : 
            '(Unknown)';
        labels.push(`${corpus.name} ${wordCountStr}`);
        
        // Calculate frequency
        const frequency = calculateFrequency(corpus.matches || 0, corpus.wordCount);
        frequencies.push(frequency);
        
        // Store raw data for tooltips and status
        rawData.push({
            name: corpus.name,
            matches: corpus.matches || 0,
            wordsScanned: corpus.wordCount,
            frequency: frequency,
            isLoading: corpus.isLoading || false,
            isCompleted: corpus.isCompleted || false,
            error: corpus.error || null
        });
    });
    
    const { colors, borderColors } = generateChartColors(corporaResults.length);
    
    return {
        labels,
        frequencies,
        rawData,
        colors,
        borderColors
    };
};