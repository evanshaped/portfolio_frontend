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
    'corpus_name': "N/A",
    'total_word_count': 0,
    'total_matches': 0,
    'searched_word_count': 0,
    'frequency': 0.00,
    'frequency_sigma': 0.00,
}

export const errorMatchInfo = {
    'corpus_name': 'N/A',
    'total_word_count': 'error',
    'total_matches': 'error',
    'searched_word_count': 'error',
    'frequency': 'error',
    'frequency_sigma': 'error',
}

export const formatUpdatedMatchInfo = (searchStatus) => {
    const updatedMatchInfo = {
        'corpus_name': searchStatus.corpus_name || 'N/A',
        'total_word_count': searchStatus.corpus_total_word_count || 0,
        'total_matches': searchStatus.total_matches || 0,
        'searched_word_count': searchStatus.total_chunks ? ((searchStatus.completed_chunks || 0) / searchStatus.total_chunks * (searchStatus.corpus_total_word_count || 0)) : 0,
        'frequency': (searchStatus.p_hat * frequencyScalingFactor).toFixed(2) || 0.00,
        'frequency_sigma': (searchStatus.p_hat_sigma * frequencyScalingFactor).toFixed(2) || 0.00,
    }
    return updatedMatchInfo
}