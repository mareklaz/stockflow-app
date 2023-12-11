import { useState } from 'react';
import createHttp from '../../services/BaseServices';
import { useLoadingContext } from '../../context/LoadingContext';

const http = createHttp(true);

export default function useDelete() {
	const [deleteResponse, setDeleteResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { setIsLoadingContext } = useLoadingContext();

	const fetchDelete = async (url) => {
		try {
			setIsLoading(true);
			setIsLoadingContext(true);
			const response = await http.delete(url);
			console.log('HOOK: delete', response);
			setDeleteResponse(response);
			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
			setIsLoadingContext(false);
		}
	};

	return {
		deleteResponse,
		isLoading,
		error,
		fetchDelete,
	};
}
