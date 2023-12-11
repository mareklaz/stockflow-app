import React from 'react';

export default function SelectField({ label, name, id, options, register, required }) {
	return (
		<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
			<label
				htmlFor={id}
				className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
				{label}
			</label>
			<div className='mt-2 sm:col-span-2 sm:mt-0'>
				<select
					{...register(name)}
					name={name}
					id={id}
					required={required}
					className='block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
					{options?.map((option, index) => (
						<option
							key={index}
							value={option.id}>
							{option.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
