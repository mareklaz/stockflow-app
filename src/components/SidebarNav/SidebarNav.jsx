import { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
	BanknotesIcon,
	Bars3Icon,
	BuildingOffice2Icon,
	CubeIcon,
	HomeIcon,
	ArrowLeftOnRectangleIcon,
	TagIcon,
	UserCircleIcon,
	UserGroupIcon,
	XMarkIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

import globalLogo from '../../assets/logo.png';

const navigation = [
	{ name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
	{ name: 'Productos', to: '/products', icon: CubeIcon },
	{ name: 'Impuestos', to: '/taxes', icon: BanknotesIcon },
	{ name: 'Categorías', to: '/categories', icon: TagIcon },
	{ name: 'Proveedores', to: '/providers', icon: BuildingOffice2Icon },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function SidebarNav({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const { user, logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
		setSidebarOpen(false);
	};

	return (
		<>
			<Transition.Root
				show={sidebarOpen}
				as={Fragment}>
				<Dialog
					as='div'
					className='relative z-50 lg:hidden'
					onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter='transition-opacity ease-linear duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity ease-linear duration-300'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-gray-900/80' />
					</Transition.Child>

					<div className='fixed inset-0 flex'>
						<Transition.Child
							as={Fragment}
							enter='transition ease-in-out duration-300 transform'
							enterFrom='-translate-x-full'
							enterTo='translate-x-0'
							leave='transition ease-in-out duration-300 transform'
							leaveFrom='translate-x-0'
							leaveTo='-translate-x-full'>
							<Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
								<Transition.Child
									as={Fragment}
									enter='ease-in-out duration-300'
									enterFrom='opacity-0'
									enterTo='opacity-100'
									leave='ease-in-out duration-300'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'>
									<div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
										<button
											type='button'
											className='-m-2.5 p-2.5'
											onClick={() => setSidebarOpen(false)}>
											<span className='sr-only'>Close sidebar</span>
											<XMarkIcon
												className='h-6 w-6 text-white'
												aria-hidden='true'
											/>
										</button>
									</div>
								</Transition.Child>
								{/* Sidebar component, swap this element with another sidebar if you like */}
								<div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2'>
									<div className='flex h-16 shrink-0 items-center'>
										<img
											className='rounded-full h-12 w-auto'
											src={globalLogo}
											alt='Your Company'
										/>
									</div>
									<nav className='flex flex-1 flex-col'>
										<ul
											role='list'
											className='flex flex-1 flex-col gap-y-7'>
											<li>
												<ul className='-mx-2 space-y-1'>
													{navigation.map((item) => (
														<li key={item.name}>
															<NavLink
																onClick={() => setSidebarOpen(false)}
																to={item.to}
																className={({ isActive }) =>
																	classNames(
																		isActive
																			? 'text-indigo-700 bg-gray-100 hover:text-indigo-700 hover:bg-gray-100'
																			: 'text-gray-400 hover:text-indigo-700 hover:bg-gray-100',
																		'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
																	)
																}>
																<item.icon
																	className={classNames(
																		({ isActive }) =>
																			isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
																		'h-6 w-6 shrink-0'
																	)}
																	aria-hidden='true'
																/>
																{item.name}
															</NavLink>
														</li>
													))}
													<li>
														<NavLink
															onClick={() => setSidebarOpen(false)}
															to={'/users'}
															className={({ isActive }) =>
																classNames(
																	isActive
																		? 'text-indigo-700 bg-gray-100 hover:text-indigo-700 hover:bg-gray-100'
																		: 'text-gray-400 hover:text-indigo-700 hover:bg-gray-100',
																	'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
																)
															}>
															<UserGroupIcon
																className={classNames(
																	({ isActive }) =>
																		isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
																	'h-6 w-6 shrink-0'
																)}
																aria-hidden='true'
															/>
															Usuarios
														</NavLink>
													</li>
												</ul>
											</li>
										</ul>
									</nav>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'>
					<div className='flex h-16 shrink-0 items-center'>
						<img
							className='rounded-full h-12 w-auto'
							src={globalLogo}
							alt='Your Company'
						/>
					</div>
					<nav className='flex flex-1 flex-col'>
						<ul
							role='list'
							className='flex flex-1 flex-col gap-y-7'>
							<li>
								<ul
									role='list'
									className='-mx-2 space-y-1'>
									{navigation.map((item) => (
										<li key={item.name}>
											<NavLink
												to={item.to}
												className={({ isActive }) =>
													classNames(
														isActive
															? 'text-indigo-700 bg-gray-100 hover:text-indigo-700 hover:bg-gray-100'
															: 'text-gray-400 hover:text-indigo-700 hover:bg-gray-100',
														'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
													)
												}>
												<item.icon
													className={classNames(
														({ isActive }) =>
															isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
														'h-6 w-6 shrink-0'
													)}
													aria-hidden='true'
												/>
												{item.name}
											</NavLink>
										</li>
									))}
									<li>
										<NavLink
											onClick={() => setSidebarOpen(false)}
											to={'/users'}
											className={({ isActive }) =>
												classNames(
													isActive
														? 'text-indigo-700 bg-gray-100 hover:text-indigo-700 hover:bg-gray-100'
														: 'text-gray-400 hover:text-indigo-700 hover:bg-gray-100',
													'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
												)
											}>
											<UserGroupIcon
												className={classNames(
													({ isActive }) =>
														isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
													'h-6 w-6 shrink-0'
												)}
												aria-hidden='true'
											/>
											Usuarios
										</NavLink>
									</li>
								</ul>
							</li>

							<li className='mb-4 mt-auto'>
								{!user ? (
									<NavLink
										onClick={() => setSidebarOpen(false)}
										to={'/login'}
										className='text-gray-400 hover:text-green-700 hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
										<ArrowLeftOnRectangleIcon
											className={classNames(
												({ isActive }) => (isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600'),
												'h-6 w-6 shrink-0'
											)}
											aria-hidden='true'
										/>
										Login
									</NavLink>
								) : (
									<Fragment>
										<NavLink
											onClick={() => setSidebarOpen(false)}
											to={`/profile`}
											className='text-gray-400 hover:text-green-700 hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
											<UserCircleIcon
												className={classNames(
													({ isActive }) => (isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600'),
													'h-6 w-6 shrink-0'
												)}
												aria-hidden='true'
											/>
											Perfil {user.username}
										</NavLink>
										<NavLink
											onClick={() => handleLogout(false)}
											className='text-gray-400 hover:text-red-700 hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
											<ArrowRightOnRectangleIcon
												className={classNames(
													({ isActive }) => (isActive ? 'text-red-600' : 'text-red-400 group-hover:text-red-600'),
													'h-6 w-6 shrink-0'
												)}
												aria-hidden='true'
											/>
											Logout
										</NavLink>
									</Fragment>
								)}
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div className='sticky top-0 z-40 flex justify-between items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
				<button
					type='button'
					className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
					onClick={() => setSidebarOpen(true)}>
					<span className='sr-only'>Open sidebar</span>
					<Bars3Icon
						className='h-6 w-6'
						aria-hidden='true'
					/>
				</button>
				{/* <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div> */}
				<div className='flex flex-row gap-4'>
					{!user ? (
						<NavLink
							onClick={() => setSidebarOpen(false)}
							to={'/login'}
							className='text-gray-400 hover:text-green-700 hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
							<ArrowLeftOnRectangleIcon
								className={classNames(
									({ isActive }) => (isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600'),
									'h-6 w-6 shrink-0'
								)}
								aria-hidden='true'
							/>
							Login
						</NavLink>
					) : (
						<Fragment>
							<NavLink
								onClick={() => setSidebarOpen(false)}
								to={`/profile`}
								className='text-gray-400 hover:text-green-700 hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
								<UserCircleIcon
									className={classNames(
										({ isActive }) => (isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600'),
										'h-6 w-6 shrink-0'
									)}
									aria-hidden='true'
								/>
							</NavLink>
							<NavLink
								onClick={() => handleLogout(false)}
								className='text-gray-400 hover:text-red-700 hover:bg-gray-100 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
								<ArrowRightOnRectangleIcon
									className={classNames(
										({ isActive }) => (isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-red-600'),
										'h-6 w-6 shrink-0'
									)}
									aria-hidden='true'
								/>
								Logout
							</NavLink>
						</Fragment>
					)}
				</div>
			</div>

			<main className='py-10 lg:pl-72'>
				<div className='px-4 sm:px-6 lg:px-8'>{children}</div>
			</main>
		</>
	);
}
