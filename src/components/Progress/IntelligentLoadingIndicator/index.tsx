import React from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import { CheckCircle, Schedule, Error } from '@mui/icons-material';

interface LoadingState {
    name: string;
    loading: boolean;
    completed: boolean;
    error?: string | null;
}

interface IntelligentLoadingIndicatorProps {
    loadingStates: LoadingState[];
    title?: string;
}

const IntelligentLoadingIndicator: React.FC<IntelligentLoadingIndicatorProps> = ({
    loadingStates,
    title = "Loading Data Sources..."
}) => {
    const totalStates = loadingStates.length;
    const completedStates = loadingStates.filter(state => state.completed && !state.error).length;
    const errorStates = loadingStates.filter(state => state.error).length;
    const loadingStates_current = loadingStates.filter(state => state.loading).length;
    const progress = totalStates > 0 ? (completedStates / totalStates) * 100 : 0;

    const allComplete = completedStates === totalStates;
    const hasErrors = errorStates > 0;

    if (allComplete && !hasErrors) {
        return null; // Hide when everything is loaded
    }

    return (
        <Box sx={{
            p: 3,
            mb: 2,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",
            maxWidth: 600,
            mx: 'auto'
        }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                {title}
            </Typography>

            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    mb: 3,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        backgroundColor: hasErrors ? 'error.main' : 'primary.main'
                    }
                }}
            />

            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
                {completedStates} of {totalStates} data sources loaded
                {hasErrors && ` (${errorStates} errors)`}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {loadingStates.map((state, index) => {
                    let icon;
                    let color: 'default' | 'success' | 'error' | 'warning' = 'default';

                    if (state.error) {
                        icon = <Error sx={{ fontSize: 16 }} />;
                        color = 'error';
                    } else if (state.completed) {
                        icon = <CheckCircle sx={{ fontSize: 16 }} />;
                        color = 'success';
                    } else if (state.loading) {
                        icon = <Schedule sx={{ fontSize: 16 }} />;
                        color = 'warning';
                    } else {
                        icon = <Schedule sx={{ fontSize: 16 }} />;
                        color = 'default';
                    }

                    return (
                        <Chip
                            key={index}
                            icon={icon}
                            label={state.name}
                            color={color}
                            variant={state.loading ? 'filled' : 'outlined'}
                            size="small"
                            sx={{
                                fontSize: '0.75rem',
                                height: 28,
                                '& .MuiChip-icon': {
                                    fontSize: 16
                                }
                            }}
                        />
                    );
                })}
            </Box>

            {hasErrors && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="error.main">
                        Some data sources failed to load. The application may have reduced functionality.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default IntelligentLoadingIndicator;