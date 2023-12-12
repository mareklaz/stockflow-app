import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import useGet from '../../hooks/useGet/useGet';
import SectionHeader from '../../components/Headers/SectionHeader';

export default function Profile() {
	const {
		data: currentUserData,
		isLoading: currentUserIsLoading,
		error: currentUserError,
		fetchGet: currentUserFetchGet,
	} = useGet();

	useEffect(() => {
		currentUserFetchGet('/auth/get-user');
	}, []);

	return (
		<div>
			<div className='px-4 sm:px-0'>
				<SectionHeader
					title={'Perfil del Usuario'}
					description={'Información del perfil de usuario.'}
				/>
			</div>
			<div className='mt-6 border-t border-gray-100'>
				<dl className='divide-y divide-gray-100'>
					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
						<dt className='text-sm font-medium leading-6 text-gray-900'>
							Nombre de usuario
						</dt>
						<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							{currentUserData ? currentUserData.username : null}
						</dd>
					</div>
					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
						<dt className='text-sm font-medium leading-6 text-gray-900'>
							Email
						</dt>
						<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							{currentUserData ? currentUserData.email : null}
						</dd>
					</div>

					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
						<dt className='text-sm font-medium leading-6 text-gray-900'>
							Admin
						</dt>
						<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							{currentUserData ? (
								currentUserData.admin ? (
									<span className='inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10'>
										Admin
									</span>
								) : (
									<span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
										Usuario
									</span>
								)
							) : null}
						</dd>
					</div>
					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
						<dt className='text-sm font-medium leading-6 text-gray-900'>
							Activo
						</dt>
						<dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
							{currentUserData ? (
								currentUserData.active ? (
									<span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10'>
										Activo
									</span>
								) : (
									<span className='inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-500/10'>
										Inactivo
									</span>
								)
							) : null}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
