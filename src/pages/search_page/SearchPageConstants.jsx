export const frequencyScalingFactor = 1000000

export const defaultSearchStatus = {
    'is_completed': false,
    'total_chunks': "0",
    'completed_chunks': 0,
    'failed_chunks': 0,
    'progress': 0,
    'created_at': '',
}

export const defaultMatchInfo = {
    'total_matches': 0,
    'frequency': 0.00,
    'frequency_sigma': 0.00,
}

export const errorMatchInfo = {
    'total_matches': 'error',
    'frequency': 'error',
    'frequency_sigma': 'error',
}

export const formatMatchInfo = (searchStatus) => {
    const newMatchInfo = {
        'total_matches': searchStatus.total_matches || 0,
        'frequency': (searchStatus.p_hat * frequencyScalingFactor).toFixed(2) || 0.00,
        'frequency_sigma': (searchStatus.p_hat_sigma * frequencyScalingFactor).toFixed(2) || 0.00,
    }
    return newMatchInfo
}