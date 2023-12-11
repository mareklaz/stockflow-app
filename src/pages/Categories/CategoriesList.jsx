import { useEffect } from 'react';
import useGet from '../../hooks/useGet/useGet';
import SectionHeader from '../../components/Headers/SectionHeader';
import { Link } from 'react-router-dom';

export default function CategoriesList() {
	const { data, isLoading, error, fetchGet } = useGet();

	useEffect(() => {
		fetchGet('/categories');
	}, []);

	return (
		<div>
			<SectionHeader
				title={'Listado de Categorías'}
				description={'Listado de Categorías en la base de datos.'}
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
							Descripción
						</th>
						<th
							scope='col'
							className='relative py-3.5 pl-3'>
							<span className='sr-only'>Edit</span>
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-200'></tbody>
				<tbody>
					{data
						? data.map((category) => (
								<tr key={category.id}>
									<td className='relative py-4 pr-3 text-sm font-medium text-gray-900'>{category.name}</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{category.description}</td>
									<td className='relative py-4 pl-3 text-right text-sm font-medium'>
										<Link
											to={`/categories/${category.id}/edit`}
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
