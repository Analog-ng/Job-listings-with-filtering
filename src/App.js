import React, { useEffect, useState } from 'react';
import data from './assets/API/data.json';
import JobBoardComponent from './components/JobBoardComponent/JobBoardComponent';

function App() {
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		setJobs(data);
	}, []);

	const [filterValue, setFilterValue] = useState([]);

	const filterHandler = (filter) => {
		if (filterValue.includes(filter)) return;
		setFilterValue([...filterValue, filter]);
	};

	const removeFilterHandler = (filterToRemove) => {
		setFilterValue(filterValue.filter((f) => f !== filterToRemove));
	};

	const clearFilter = () => {
		setFilterValue([]);
	};

	const filteredJobs = jobs.filter((job) => {
		if (filterValue.length === 0) {
			return true;
		}
		const tags = [job.role, job.level];
		if (job.languages) {
			tags.push(...job.languages);
		}
		if (job.tools) {
			tags.push(...job.tools);
		}
		return filterValue.every((filter) => tags.includes(filter));
	});

	return (
		<>
			<header className='bg-[#63BABA] justify-center items-center'>
				<img
					src='/images/bg-header-mobile.svg'
					alt='Mobile-Img'
					className='w-full block md:hidden object-cover object-center bg-[#5b8c8f]'
				/>
				<img
					src={`/images/bg-header-desktop.svg`}
					alt='Desktop-Img'
					className='w-full hidden md:block bg-[#5b8c8f]'
				/>
			</header>

			<div className='container mx-auto md:mt-10'>
				{filterValue.length > 0 && (
					<div className='flex flex-wrap items-center mt-[-25px] md:mt-[-85px] md:mb-10 bg-white shadow-xl mx-8 md:mx-20 p-4 rounded relative z-10'>
						<div className='w-3/4 '>
							<div className='flex flex-wrap md:flex-nowrap'>
								{filterValue.map((filter) => (
									<span
										className='mb-4 md:mb-0 cursor-pointer md:m-4 md:mr-0 mr-[12px]'
										key={filter}
									>
										<span className='p-[0.4rem] text-[#63BABA] bg-[#f2f9fc]'>
											{filter}
										</span>
										<span
											className='p-[0.4rem] font-bold text-[#fff] bg-[#63BABA]'
											onClick={() => removeFilterHandler(filter)}
										>
											✕
										</span>
									</span>
								))}
							</div>
						</div>
						<div className='w-1/4 flex items-center justify-center'>
							<button
								className='w-2/5 ml-auto items-center text-gray-600 font-bold'
								onClick={clearFilter}
							>
								Clear
							</button>
						</div>
					</div>
				)}

				{jobs.length === 0 ? (
					<p>Job List is Loading</p>
				) : (
					filteredJobs.map((job) => (
						<JobBoardComponent
							job={job}
							key={job.id}
							handleTagClick={filterHandler}
						/>
					))
				)}
			</div>
		</>
	);
}

export default App;
