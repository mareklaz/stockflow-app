import { useState } from 'react';
import { useLoadingContext } from '../../context/LoadingContext';
import http from '../../services/axiosService';

export default function usePut() {
	const [response, setResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { setIsLoadingContext } = useLoadingContext();

	const fetchPut = async (url, data) => {
		setResponse(null);
		setError(null);
		try {
			setIsLoading(true);
			setIsLoadingContext(true);
			const response = await http.put(url, data);
			console.log('HOOK put', response);
			setResponse(response);
			setError(null);
		} catch (error) {
			console.log(error);
			setError(error.response.data);
		} finally {
			setIsLoading(false);
			setIsLoadingContext(false);
		}
	};

	return {
		response,
		isLoading,
		error,
		fetchPut,
	};
}
