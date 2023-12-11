import { useEffect } from 'react';
import useGet from '../../hooks/useGet/useGet';
import SectionHeader from '../../components/Headers/SectionHeader';
import { Link } from 'react-router-dom';

export default function ProvidersList() {
	const { data, isLoading, error, fetchGet } = useGet();

	useEffect(() => {
		fetchGet('/providers');
	}, []);

	return (
		<div>
			<SectionHeader
				title={'Listado de Proveedores'}
				description={'Listado de Proveedores en la base de datos.'}
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
							Direccion
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell'>
							Ciudad
						</th>
						<th
							scope='col'
							className='px-3 py-3.5 text-left text-sm font-semibold text-gray-9s00'>
							Provincia
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
						? data.map((provider) => (
								<tr key={provider.id}>
									<td className='relative py-4 pr-3 text-sm font-medium text-gray-900'>{provider.name}</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{provider.address}</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 md:table-cell'>{provider.city}</td>
									<td className='px-3 py-4 text-sm text-gray-500'>{provider.province}</td>
									<td className='relative py-4 pl-3 text-right text-sm font-medium'>
										<Link
											to={`/taxes/${provider.id}/edit`}
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
