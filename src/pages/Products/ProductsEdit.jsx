import { useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import CheckboxField from '../../components/Forms/CheckboxField';
import usePost from '../../hooks/usePost/usePost';
import SectionHeader from '../../components/Headers/SectionHeader';
import { useEffect, useState } from 'react';
import useGet from '../../hooks/useGet/useGet';
import { useParams } from 'react-router-dom';
import usePut from '../../hooks/usePut/usePut';
import TextareaField from '../../components/Forms/TextareaField';
import SimpleNotification from '../../components/Notifications/SimpleNotification';
import SelectField from '../../components/Forms/SelectField';

export default function TaxesEdit() {
	const { register, handleSubmit, setValue } = useForm();

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

	const { id } = useParams();

	const {
		response: productUpdateResponse,
		isLoading: productUpdateIsLoading,
		error: productUpdateError,
		fetchPut: productUpdateFetchPut,
	} = usePut();

	const { data: productData, isLoading: productIsLoading, error: productError, fetchGet: productFetchGet } = useGet();

	useEffect(() => {
		productFetchGet(`/products/${id}`);
	}, []);

	useEffect(() => {
		productFetchGet(`/products/${id}`);
	}, [productUpdateResponse]);

	useEffect(() => {
		if (productData) {
			setValue('name', productData.name);
			setValue('description', productData.description);
			setValue('price', productData.price);
			setValue('taxRef', productData.taxRef);
			setValue('cost', productData.cost);
			setValue('active', productData.active);
			setValue('providerRef', productData.providerRef);
			setValue('barCode', productData.barCode);
		}
	}, [productData, setValue]);

	const onSubmit = async (data) => {
		console.log('DATA ==>', data);
		await productUpdateFetchPut(`/products/${productData.id}`, data);
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (productUpdateResponse || productUpdateError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [productUpdateResponse, productUpdateError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={productUpdateResponse}
				error={productUpdateError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Editar Impuesto'}
						description={'Completa la información con el nuevo Impuesto que deseas crear.'}
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
				{productUpdateIsLoading ? (
					<button
						type='submit'
						disabled
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Actualizando Producto ...
					</button>
				) : (
					<button
						type='submit'
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Actualizar Producto
					</button>
				)}
			</div>
		</form>
	);
}
