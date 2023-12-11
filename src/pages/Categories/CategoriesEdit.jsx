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

export default function CategoriesEdit() {
	const { register, handleSubmit, setValue } = useForm();

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

	const { id } = useParams();

	const {
		response: categoryUpdateResponse,
		isLoading: categoryUpdateIsLoading,
		error: categoryUpdateError,
		fetchPut: categoryUpdateFetchPost,
	} = usePut();

	const {
		data: categoryData,
		isLoading: categoryIsLoading,
		error: categoryError,
		fetchGet: categoryFetchGet,
	} = useGet();

	useEffect(() => {
		categoryFetchGet(`/categories/${id}`);
	}, []);

	useEffect(() => {
		categoryFetchGet(`/categories/${id}`);
	}, [categoryUpdateResponse]);

	useEffect(() => {
		if (categoryData) {
			setValue('name', categoryData.name);
			setValue('description', categoryData.description);
		}
	}, [categoryData, setValue]);

	const onSubmit = async (data) => {
		console.log(data);
		await categoryUpdateFetchPost(`/categories/${categoryData.id}`, data);
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (categoryUpdateResponse || categoryUpdateError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [categoryUpdateResponse, categoryUpdateError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={categoryUpdateResponse}
				error={categoryUpdateError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Editar Categoría'}
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
				{categoryUpdateIsLoading ? (
					<button
						type='submit'
						disabled
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Actualizando Categoría ...
					</button>
				) : (
					<button
						type='submit'
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Actualizar Categoría
					</button>
				)}
			</div>
		</form>
	);
}
