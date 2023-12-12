export default function SubmitButton({
	buttonText,
	loadingButtonText,
	isLoading,
}) {
	if (isLoading) {
		return (
			<button
				type='submit'
				disabled
				className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
				{loadingButtonText}
			</button>
		);
	} else {
		return (
			<button
				type='submit'
				className='rounded-md h-12 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
				{buttonText}
			</button>
		);
	}
}
