import { useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import usePost from '../../hooks/usePost/usePost';
import SectionHeader from '../../components/Headers/SectionHeader';
import TextareaField from '../../components/Forms/TextareaField';
import { useEffect, useState } from 'react';
import SimpleNotification from '../../components/Notifications/SimpleNotification';

export default function TaxesCreate() {
	const { register, handleSubmit } = useForm();

	const inputs = [
		{
			label: 'Nombre',
			type: 'text',
			name: 'name',
			id: 'name',
			placeholder: 'Introduce el nombre del Impuesto',
			required: true,
		},
		{
			label: 'Descripcion',
			type: 'textarea',
			name: 'description',
			id: 'description',
			placeholder: 'Introduce el descripcion del Impuesto',
			required: false,
		},
		{
			label: 'Valor',
			type: 'number',
			name: 'value',
			id: 'value',
			placeholder: 'Introduce el valor del Impuesto',
			required: true,
		},
	];

	const {
		response: taxCreateResponse,
		isLoading: taxCreateIsLoading,
		error: taxCreateError,
		fetchPost: taxCreateFetchPost,
	} = usePost();

	const onSubmit = async (data, e) => {
		console.log(data);
		const dataToSend = {
			name: data.name,
			description: data.description,
			value: Number(data.value),
		};
		console.log(dataToSend);
		await taxCreateFetchPost('/taxes', dataToSend);
		e.target.reset();
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (taxCreateResponse || taxCreateError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [taxCreateResponse, taxCreateError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={taxCreateResponse}
				error={taxCreateError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Nuevo Impuesto'}
						description={'Completa la información con el nuevo Impuesto que deseas crear.'}
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
				{taxCreateIsLoading ? (
					<button
						type='submit'
						disabled
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Creando Impuesto ...
					</button>
				) : (
					<button
						type='submit'
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Crear Impuesto
					</button>
				)}
			</div>
		</form>
	);
}
