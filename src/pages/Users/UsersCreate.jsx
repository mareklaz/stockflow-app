import { useForm } from 'react-hook-form';
import InputField from '../../components/Forms/InputField';
import CheckboxField from '../../components/Forms/CheckboxField';
import usePost from '../../hooks/usePost/usePost';
import SectionHeader from '../../components/Headers/SectionHeader';
import { useEffect, useState } from 'react';
import SimpleNotification from '../../components/Notifications/SimpleNotification';
import SubmitButton from '../../components/Forms/SubmitButton';

export default function UsersCreate() {
	const { register, handleSubmit } = useForm();

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
			label: 'Contraseña',
			type: 'password',
			name: 'password',
			id: 'password',
			placeholder: 'Introduce la contraseña del usuario',
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

	const {
		response: createUserResponse,
		isLoading: createUserIsLoading,
		error: createUserError,
		fetchPost: createUserFetchPost,
	} = usePost();

	const onSubmit = async (data, e) => {
		console.log(data);
		await createUserFetchPost('/users', data);
		e.target.reset();
	};

	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (createUserResponse || createUserError) {
			setShowNotification(true);
			setTimeout(() => {
				setShowNotification(false);
			}, 2000);
		}
	}, [createUserResponse, createUserError]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleNotification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
				response={createUserResponse}
				error={createUserError}
			/>
			<div className='space-y-12 sm:space-y-16 mb-4'>
				<div>
					<SectionHeader
						title={'Nuevo Usuario'}
						description={
							'Completa la información con el nuevo usuario que deseas crear.'
						}
					/>
					<div className='space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
						{inputs.map((input, index) =>
							input.type != 'checkbox' ? (
								<InputField key={index} {...input} register={register} />
							) : (
								<CheckboxField key={index} {...input} register={register} />
							)
						)}
					</div>
				</div>
			</div>
			<div className='flex justify-start'>
				<SubmitButton
					buttonText={'Crear usuario'}
					loadingButtonText={'Creando usuario...'}
					isLoading={createUserIsLoading}
				/>
			</div>
		</form>
	);
}
