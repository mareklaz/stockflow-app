import { ListBulletIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet, useParams } from 'react-router-dom';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function UsersLayout() {
	const param = useParams();

	return (
		<div>
			<div className='grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3 mb-4'>
				<NavLink
					to='/users/create'
					className={({ isActive }) =>
						classNames(
							isActive
								? 'justify-center flex items-center text-indigo-700 space-x-3 rounded-lg border border-indigo-300 bg-white px-6  shadow-sm   hover:border-indigo-700 group'
								: 'justify-center flex items-center text-gray-400 space-x-3 rounded-lg border border-gray-300 bg-white px-6  shadow-sm   hover:border-gray-400 group',
							'group flex justify-center items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
						)
					}>
					<PlusCircleIcon className={'h-6 w-6 shrink-0'} />
					Crear Nuevo Usuario
				</NavLink>
				<NavLink
					to='/users/list'
					className={({ isActive }) =>
						classNames(
							isActive
								? 'justify-center flex items-center text-indigo-700 space-x-3 rounded-lg border border-indigo-300 bg-white px-6  shadow-sm   hover:border-indigo-700 group'
								: 'justify-center flex items-center text-gray-400 space-x-3 rounded-lg border border-gray-300 bg-white px-6  shadow-sm   hover:border-gray-400 group',
							'group flex justify-center items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
						)
					}>
					<ListBulletIcon className={'h-6 w-6 shrink-0'} />
					Listado Usuarios
				</NavLink>
			</div>
			<Outlet />
		</div>
	);
}
