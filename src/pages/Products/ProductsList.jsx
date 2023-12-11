import { useEffect } from 'react';
import useGet from '../../hooks/useGet/useGet';
import SectionHeader from '../../components/Headers/SectionHeader';
import { Link } from 'react-router-dom';

export default function ProductsList() {
	const { data, isLoading, error, fetchGet } = useGet();

	useEffect(() => {
		fetchGet('/products');
	}, []);

	return (
		<div>
			<SectionHeader
				title={'Listado de Productos'}
				description={'Listado de Productos en la base de datos.'}
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
							Precio
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'>
							Impuesto
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'>
							Precio Total
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'>
							Coste
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'>
							Coste Total
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'>
							Activo
						</th>
						<th
							scope='col'
							className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'>
							Proveedor
						</th>
						<th
							scope='col'
							className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
							Cód. Barras
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
						? data.map((product) => (
								<tr key={product.id}>
									<td className='relative py-4 pr-3 text-sm font-medium text-gray-900'>{product.name}</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{product.price} €</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{product.taxRef.value} %</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{product.totalPrice} €</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{product.cost} €</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{product.totalCost} €</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
										{product.active ? (
											<span className='inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10'>
												Activo
											</span>
										) : (
											<span className='inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-500/10'>
												Inactivo
											</span>
										)}
									</td>
									<td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>{product.providerRef.name}</td>
									<td className='px-3 py-4 text-sm text-gray-500'>{product.barCode}</td>
									<td className='relative py-4 pl-3 text-right text-sm font-medium'>
										<Link
											to={`/products/${product.id}/edit`}
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
