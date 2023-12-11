import { useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import CheckboxField from '../../components/Forms/CheckboxField';
import usePost from '../../hooks/usePost/usePost';
import SectionHeader from '../../components/Headers/SectionHeader';
import { useEffect, useState } from 'react';
import useGet from '../../hooks/useGet/useGet';
import { useParams } from 'react-router-dom';
import usePut from '../../hooks/usePut/usePut';
import SimpleNotification from '../../components/Notifications/SimpleNotification';

export default function UsersEdit() {
	const { register, handleSubmit, setValue } = useForm();

	const inputs = [
		{
			label: 'Usuario',
			type: 'text',
			name: 'username',
			id: 'username',
			placeholder: 'Introduce el nombre de usuario',
			required: true,
		},
		{
			label: 'Email',
			type: 'email',
			name: 'email',
			id: 'email',
			placeholder: 'Introduce el email de usuario',
			required: true,
		},
		{
			label: 'Activo',
			type: 'checkbox',
			name: 'active',
			id: 'active',
		},
		{
			label: 'Administrador',
			type: 'checkbox',
			name: 'admin',
			id: 'admin',
		},
	];

	const { id } = useParams();

	const {
		response: userUpdateResponse,
		isLoading: userUpdateIsLoading,
		error: userUpdateError,
		fetchPut: userUpdateFetchPost,
	} = usePut();
	const { data: userData, isLoading: userIsLoading, error: userError, fetchGet: userFetchGet } = useGet();

	useEffect(() => {
		userFetchGet(`/users/${id}`);
	}, []);

	useEffect(() => {
		userFetchGet(`/users/${id}`);
	}, [userUpdateResponse]);

	useEffect(() => {
		if (userData) {
			setValue('username', userData.username);
			setValue('email', userData.email);
			setValue('active', userData.active);
			setValue('admin', userData.admin);
		}
	}, [userData, setValue]);

	const onSubmit = async (data) => {
		console.log(data);
		await userUpdateFetchPost(`/users/${userData.id}`, data);
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (userUpdateResponse || userUpdateError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [userUpdateResponse, userUpdateError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={userUpdateResponse}
				error={userUpdateError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Editar usuario'}
						description={'Completa la información con el nuevo usuario que deseas crear.'}
					/>
					<div className='space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
						{inputs.map((input, index) =>
							input.type != 'checkbox' ? (
								<InputField
									key={index}
									{...input}
									register={register}
								/>
							) : (
								<CheckboxField
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
				{userUpdateIsLoading ? (
					<button
						type='submit'
						disabled
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Actualizando usuario ...
					</button>
				) : (
					<button
						type='submit'
						className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Actualizar Usuario
					</button>
				)}
			</div>
		</form>
	);
}
