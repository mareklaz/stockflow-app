import { useState } from 'react';
import http from '../../services/axiosService';
import { useLoadingContext } from '../../context/LoadingContext';

export default function useGet() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { setIsLoadingContext } = useLoadingContext();

	const fetchGet = async (url) => {
		try {
			setIsLoading(true);
			setIsLoadingContext(true);
			const response = await http.get(url);
			console.log('HOOK: get', response);
			setData(response);
			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
			setIsLoadingContext(false);
		}
	};

	return {
		data,
		isLoading,
		error,
		fetchGet,
	};
}
