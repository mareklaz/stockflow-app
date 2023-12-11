export default function SectionHeader({ title, description }) {
	return (
		<div className='py-4 mb-4'>
			<h2 className='text-2xl font-bold leading-7 text-gray-600 sm:truncate sm:text-3xl sm:tracking-tight'>{title}</h2>
			<p className='mt-1 max-w-2xl text-sm leading-6 text-gray-600'>{description}</p>
		</div>
	);
}
