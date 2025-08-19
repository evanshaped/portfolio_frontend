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
    'frequency': 0.0000,
}

export const formatMatchInfo = (searchStatus) => {
    return {
        'total_matches': searchStatus.total_matches || 0,
        'frequency': searchStatus.frequency || 0.0000,
    }
}