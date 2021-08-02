import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ErrorPage = () => {
    const { push } = useRouter();

    useEffect(() => {
        push('/');
    }, []);
    return null;
};

export default ErrorPage;
