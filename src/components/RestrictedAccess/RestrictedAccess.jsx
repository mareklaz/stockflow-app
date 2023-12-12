import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { NoSymbolIcon } from '@heroicons/react/20/solid';

export default function RestrictedAccess({ children }) {
	const { user } = useContext(AuthContext);

	if (user?.admin) {
		return children;
	}

	return (
		<div className='flex items-center gap-4 py-4'>
			<NoSymbolIcon className='h-8 w-8 text-red-600 ' />
			<p className='text-2xl font-semibold leading-7 text-red-600 sm:truncate sm:text-3xl sm:tracking-tight'>
				Usuario no autorizado
			</p>
		</div>
	);
}
