import { useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import usePost from '../../hooks/usePost/usePost';
import SectionHeader from '../../components/Headers/SectionHeader';
import TextareaField from '../../components/Forms/TextareaField';
import { useEffect, useState } from 'react';
import SimpleNotification from '../../components/Notifications/SimpleNotification';
import CheckboxField from '../../components/Forms/CheckboxField';
import SelectField from '../../components/Forms/SelectField';
import useGet from '../../hooks/useGet/useGet';

export default function productesCreate() {
	const { register, handleSubmit } = useForm();

	const { data: taxesData, isLoading: taxesIsLoading, error: taxesError, fetchGet: taxesFetchGet } = useGet();
	const {
		data: providersData,
		isLoading: providersIsLoading,
		error: providersError,
		fetchGet: providersFetchGet,
	} = useGet();

	useEffect(() => {
		taxesFetchGet('/taxes');
		providersFetchGet('/providers');
	}, []);

	const inputs = [
		{
			label: 'Nombre',
			type: 'text',
			name: 'name',
			id: 'name',
			placeholder: 'Introduce el nombre del Producto',
			required: true,
		},
		{
			label: 'Descripcion',
			type: 'textarea',
			name: 'description',
			id: 'description',
			placeholder: 'Introduce el descripcion del Producto',
			required: false,
		},
		{
			label: 'Precio',
			type: 'number',
			name: 'price',
			id: 'price',
			placeholder: 'Introduce el precio del Producto',
			required: true,
		},
		{
			label: 'Impuesto',
			type: 'select',
			options: taxesData,
			name: 'taxRef',
			id: 'taxRef',
			required: true,
		},
		{
			label: 'Coste',
			type: 'number',
			name: 'cost',
			id: 'cost',
			placeholder: 'Introduce el coste del Producto',
			required: true,
		},
		{
			label: 'Activo',
			type: 'checkbox',
			name: 'active',
			id: 'active',
			required: true,
		},
		{
			label: 'Proveedor',
			type: 'select',
			options: providersData,
			name: 'providerRef',
			id: 'providerRef',
			required: true,
		},
		{
			label: 'Código de Barras',
			type: 'text',
			name: 'barCode',
			id: 'barCode',
			placeholder: 'Introduce el Código de Barras del Producto',
			required: true,
		},
	];

	const {
		response: productCreateResponse,
		isLoading: productCreateIsLoading,
		error: productCreateError,
		fetchPost: productCreateFetchPost,
	} = usePost();

	const onSubmit = async (data, e) => {
		console.log(data);
		const dataToSend = {
			price: Number(data.price),
			cost: Number(data.cost),
			...data,
		};
		console.log(dataToSend);
		await productCreateFetchPost('/products', dataToSend);
		e.target.reset();
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (productCreateResponse || productCreateError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [productCreateResponse, productCreateError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={productCreateResponse}
				error={productCreateError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Nuevo Producto'}
						description={'Completa la información con el nuevo Producto que deseas crear.'}
					/>
					<div className='space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
						{taxesData && providersData
							? inputs.map((input, index) => {
									switch (input.type) {
										case 'checkbox':
											return (
												<CheckboxField
													key={index}
													{...input}
													register={register}
												/>
											);
										case 'textarea':
											return (
												<TextareaField
													key={index}
													{...input}
													register={register}
												/>
											);
										case 'select':
											return (
												<SelectField
													key={index}
													{...input}
													register={register}
												/>
											);
										default:
											return (
												<InputField
													key={index}
													{...input}
													register={register}
												/>
											);
									}
							  })
							: null}
					</div>
				</div>
			</div>
			<div className='flex justify-start'>
				{productCreateIsLoading ? (
					<button
						type='submit'
						disabled
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Creando Producto ...
					</button>
				) : (
					<button
						type='submit'
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Crear Producto
					</button>
				)}
			</div>
		</form>
	);
}
