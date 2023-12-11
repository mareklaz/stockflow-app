import { useForm } from 'react-hook-form';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const { register, handleSubmit } = useForm();

	const { login, user } = useContext(AuthContext);

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		console.log(data);
		try {
			await login(data.email, data.password);
			navigate('/profile');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='mx-auto max-w-md'>
			<div className='flex flex-col items-center justify-center mb-4'>
				<img
					src={logo}
					alt='logo'
					className='w-36 h-36 rounded-full'
				/>
				<h2 className='my-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Warehouse App</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-sm font-medium leading-6 text-gray-900'>
						Correo electrónico
					</label>
					<div className='mt-2'>
						<input
							type='email'
							name='email'
							id='email'
							{...register('email')}
							className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							placeholder='you@example.com'
						/>
					</div>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-sm font-medium leading-6 text-gray-900'>
						Password
					</label>
					<div className='mt-2'>
						<input
							type='password'
							name='password'
							id='password'
							{...register('password')}
							className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							placeholder='you@example.com'
						/>
					</div>
				</div>
				<div className=''>
					<button
						type='submit'
						className='w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Iniciar sesión
					</button>
				</div>
			</form>
		</div>
	);
}
