import { useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import CheckboxField from '../../components/Forms/CheckboxField';
import usePost from '../../hooks/usePost/usePost';
import SectionHeader from '../../components/Headers/SectionHeader';
import TextareaField from '../../components/Forms/TextareaField';
import { useEffect, useState } from 'react';
import SimpleNotification from '../../components/Notifications/SimpleNotification';

export default function ProvidersCreate() {
	const { register, handleSubmit } = useForm();

	const inputs = [
		{
			label: 'Proveedor',
			type: 'text',
			name: 'name',
			id: 'name',
			placeholder: 'Introduce el nombre del proveedor',
			required: true,
		},
		{
			label: 'Descripcion',
			type: 'textarea',
			name: 'description',
			id: 'description',
			placeholder: 'Introduce el descripcion del proveedor',
			required: false,
		},
		{
			label: 'Dirección',
			type: 'text',
			name: 'address',
			id: 'address',
			placeholder: 'Introduce el dirección del proveedor',
			required: true,
		},
		{
			label: 'Ciudad',
			type: 'text',
			name: 'city',
			id: 'city',
			placeholder: 'Introduce el ciudad del proveedor',
			required: true,
		},
		{
			label: 'Provincia',
			type: 'text',
			name: 'province',
			id: 'province',
			placeholder: 'Introduce el provincia del proveedor',
			required: true,
		},
	];

	const {
		response: providerCreateResponse,
		isLoading: providerCreateIsLoading,
		error: providerCreateError,
		fetchPost: providerCreateFetchPost,
	} = usePost();

	const onSubmit = async (data, e) => {
		console.log(data);
		await providerCreateFetchPost('/providers', data);
		e.target.reset(); // Resetear el formulario
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (providerCreateResponse || providerCreateError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [providerCreateResponse, providerCreateError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={providerCreateResponse}
				error={providerCreateError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Nuevo Proveedor'}
						description={'Completa la información con el nuevo Proveedor que deseas crear.'}
					/>
					<div className='space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
						{inputs.map((input, index) =>
							input.type != 'textarea' ? (
								<InputField
									key={index}
									{...input}
									register={register}
								/>
							) : (
								<TextareaField
									key={index}
									{...input}
									register={register}
								/>
							)
						)}
					</div>
				</div>
			</div>
			<div className='flex justify-start'>
				{providerCreateIsLoading ? (
					<button
						type='submit'
						disabled
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Creando Proveedor ...
					</button>
				) : (
					<button
						type='submit'
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Crear Proveedor
					</button>
				)}
			</div>
		</form>
	);
}
