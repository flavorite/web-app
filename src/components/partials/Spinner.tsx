import { CircularProgress, Backdrop } from '@mui/material'
import { useEffect, useState } from 'react';

interface SpinnerProps {
    loading: boolean,
}

export default function Spinner(props: SpinnerProps) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(props.loading);
    }, [isLoading]);
    
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            open={isLoading}>
            <CircularProgress color="secondary" />
        </Backdrop>

    )
}