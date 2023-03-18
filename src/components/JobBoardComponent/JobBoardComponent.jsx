import React from 'react';

function JobBoardComponent({
	job: {
		id,
		company,
		logo,
		isNew,
		featured,
		position,
		role,
		level,
		postedAt,
		contract,
		location,
		languages,
		tools
	},

	handleTagClick
}) {
	const newCopies = [role, level];

	if (tools) {
		newCopies.push(...tools);
	}

	if (languages) {
		newCopies.push(...languages);
	}

	return (
		<div
			className={`flex flex-col md:flex-row md:items-center bg-white shadow-xl mx-8 md:mx-20 md:my-6 my-20 p-8 rounded ${
				featured && 'border-l-[5px] border-solid border-[#63BABA]'
			}`}
		>
			<div className='img'>
				<img className='mt-[-80px] mb-2 md:m-0' src={logo} alt={company} />
			</div>

			<div className='md:ml-4 flex flex-col justify-evenly'>
				<div className='flex items-center'>
					<h4 className='text-lg text-[#63BABA] mr-4 font-bold'>{company}</h4>
					{isNew && (
						<span className='m-1 bg-[#8fccd4] text-white rounded-full py-1 px-2 font-bold text-sm'>
							NEW!
						</span>
					)}
					{featured && (
						<span className='m-1 bg-[#010d0f] text-white rounded-full py-1 px-2 font-bold text-sm'>
							FEATURED
						</span>
					)}
				</div>
				<div className='my-2'>
					<h2 className='text-xl font-bold'>{position}</h2>
				</div>
				<div>
					<p className='text-base text-[#9ba9ab]'>
						{postedAt} · {contract} · {location}
					</p>
				</div>
			</div>

			<div className='mt-4 md:mt-0 pt-4 md:pt-0 flex flex-wrap items-center  md:justify-center md:ml-auto border-t-2 border-solid border-gray-300 md:border-none'>
				{newCopies
					? newCopies.map((copy) => (
							<span
								onClick={() => handleTagClick(copy)}
								className=' cursor-pointer md:m-4 md:mr-0 mr-[12px] mb-4 p-2 text-[#63BABA] bg-[#f2f9fc] rounded'
							>
								{copy}
							</span>
					  ))
					: ''}
			</div>
		</div>
	);
}

export default JobBoardComponent;
