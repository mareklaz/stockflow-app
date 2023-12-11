import { useEffect } from 'react';
import useGet from '../../hooks/useGet/useGet';
import SectionHeader from '../../components/Headers/SectionHeader';
import { Link } from 'react-router-dom';

export default function UsersList() {
	const { data, isLoading, error, fetchGet } = useGet();

	useEffect(() => {
		fetchGet('/users');
	}, []);

	return (
		<div>
			<SectionHeader
				title={'Listado de usuarios'}
				description={'Listado de usuarios en la base de datos.'}
			/>

			<table className='w-full text-left divide-y divide-gray-400'>
				<thead className=''>
					<tr>
						<th
							scope='col'
							className='relative isolate py-4 pr-3  text-left text-sm font-semibold text-gray-900'>
							Nombre
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'>
							Email
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'>
							Rol
						</th>
						<th
							scope='col'
							className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
							Activo
						</th>
						<th
							scope='col'
							className='relative py-3.5 pl-3'>
							<span className='sr-only'>Edit</span>
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-200'>
					{data
						? data.map((user) => (
								<tr key={user.id}>
									<td className='relative py-4 pr-3 text-sm font-medium text-gray-900'>{user.username}</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{user.email}</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 md:table-cell'>
										{user.admin ? (
											<span className='inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10'>
												Admin
											</span>
										) : (
											<span className='inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
												Usuario
											</span>
										)}
									</td>
									<td className='px-3 py-4 text-sm text-gray-500'>
										{user.active ? (
											<span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10'>
												Activo
											</span>
										) : (
											<span className='inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-500/10'>
												Inactivo
											</span>
										)}
									</td>
									<td className='relative py-4 pl-3 text-right text-sm font-medium'>
										<Link
											to={`/users/${user.id}/edit`}
											className='text-indigo-600 hover:text-indigo-900'>
											Editar<span className='sr-only'></span>
										</Link>
									</td>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</div>
	);
}
