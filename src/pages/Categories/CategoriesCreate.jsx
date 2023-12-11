import { useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import usePost from '../../hooks/usePost/usePost';
import SectionHeader from '../../components/Headers/SectionHeader';
import TextareaField from '../../components/Forms/TextareaField';
import { useEffect, useState } from 'react';
import SimpleNotification from '../../components/Notifications/SimpleNotification';

export default function CategoriesCreate() {
	const { register, handleSubmit } = useForm();

	const inputs = [
		{
			label: 'Nombre',
			type: 'text',
			name: 'name',
			id: 'name',
			placeholder: 'Introduce el nombre del Categoría',
			required: true,
		},
		{
			label: 'Descripcion',
			type: 'textarea',
			name: 'description',
			id: 'description',
			placeholder: 'Introduce el descripcion del Categoría',
			required: false,
		},
	];

	const {
		response: categoryCreateResponse,
		isLoading: categoryCreateIsLoading,
		error: categoryCreateError,
		fetchPost: categoryCreateFetchPost,
	} = usePost();

	const onSubmit = async (data, e) => {
		console.log(data);
		const dataToSend = {
			name: data.name,
			description: data.description,
			value: Number(data.value),
		};
		console.log(dataToSend);
		await categoryCreateFetchPost('/categories', dataToSend);
		e.target.reset();
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (categoryCreateResponse || categoryCreateError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [categoryCreateResponse, categoryCreateError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={categoryCreateResponse}
				error={categoryCreateError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Nuevo Categoría'}
						description={'Completa la información con el nuevo Categoría que deseas crear.'}
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
				{categoryCreateIsLoading ? (
					<button
						type='submit'
						disabled
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Creando Categoría ...
					</button>
				) : (
					<button
						type='submit'
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Crear Categoría
					</button>
				)}
			</div>
		</form>
	);
}
