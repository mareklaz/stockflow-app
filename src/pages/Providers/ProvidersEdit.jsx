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

export default function ProvidersEdit() {
	const { register, handleSubmit, setValue } = useForm();

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

	const { id } = useParams();

	const {
		response: providerUpdateResponse,
		isLoading: providerUpdateIsLoading,
		error: providerUpdateError,
		fetchPut: providerUpdateFetchPost,
	} = usePut();

	const {
		data: providerData,
		isLoading: providerIsLoading,
		error: providerError,
		fetchGet: providerFetchGet,
	} = useGet();

	useEffect(() => {
		providerFetchGet(`/providers/${id}`);
	}, []);

	useEffect(() => {
		providerFetchGet(`/providers/${id}`);
	}, [providerUpdateResponse]);

	useEffect(() => {
		if (providerData) {
			setValue('name', providerData.name);
			setValue('description', providerData.description);
			setValue('address', providerData.address);
			setValue('city', providerData.city);
			setValue('province', providerData.province);
		}
	}, [providerData, setValue]);

	const onSubmit = async (data) => {
		console.log(data);
		await providerUpdateFetchPost(`/providers/${providerData.id}`, data);
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (providerUpdateResponse || providerUpdateError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [providerUpdateResponse, providerUpdateError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={providerUpdateResponse}
				error={providerUpdateError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Editar usuario'}
						description={'Completa la información con el nuevo usuario que deseas crear.'}
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
				{providerUpdateIsLoading ? (
					<button
						type='submit'
						disabled
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Actualizando Proveedor ...
					</button>
				) : (
					<button
						type='submit'
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Actualizar Proveedor
					</button>
				)}
			</div>
		</form>
	);
}
