import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function SearchInput({ searchText, setSearchText }) {
	return (
		<div className='relative flex flex-1 mb-4'>
			<label htmlFor='search-field' className='sr-only'>
				Search
			</label>
			<MagnifyingGlassCircleIcon
				className='pointer-events-none absolute inset-y-0 left-0 ml-2 h-full w-6 text-gray-400'
				aria-hidden='true'
			/>
			<input
				id='search-field'
				className='block h-full w-full py-4 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm rounded-lg border border-gray-300 bg-white'
				placeholder='Buscar...'
				type='text'
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				name='buscar'
			/>
		</div>
	);
}
