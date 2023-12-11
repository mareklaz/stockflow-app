import React from 'react';

export default function CheckboxField({ label, name, id, register }) {
	return (
		<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
			<label
				htmlFor={id}
				className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
				{label}
			</label>
			<div className='mt-2 sm:col-span-2 sm:mt-0'>
				<input
					{...register(name)}
					id={id}
					name={name}
					type='checkbox'
					className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
				/>
			</div>
		</div>
	);
}
