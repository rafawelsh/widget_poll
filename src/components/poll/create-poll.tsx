import { useState } from 'react';
import { PollOption } from './poll';

export default function CreatePoll() {
	const [currentOption, setCurrentOption] = useState('');
	const [pollOptions, setPollOptions] = useState([]);

	const handleAdd = (e) => {
		e.preventDefault();

		if (!currentOption) {
			console.log('cannot submit empty');
			return;
		}

		if (currentOption.trim()) {
			setPollOptions((prev) => [...prev, { name: currentOption, votes: 0 }]);
			setCurrentOption('');
		}
	};

	const handleSavePoll = (e) => {
		// reset currentOption and pollOptions
		setCurrentOption('');
		setPollOptions([]);
	};

	return (
		<div>
			<div>Create a new poll</div>

			<PollCard pollOptions={pollOptions} />

			<div>
				<label>
					Option:
					<input
						type='text'
						value={currentOption}
						onChange={(e) => setCurrentOption(e.target.value)}
					/>
				</label>
			</div>

			<button onClick={(e) => handleAdd(e)}>Add to poll</button>

			<button onClick={(e) => handleSavePoll(e)}>Save Poll</button>
		</div>
	);
}

export function PollCard({ pollOptions }) {
	return (
		<div className='poll-card'>
			{pollOptions.map(({ name, votes }) => {
				// const percentageForOption = Math.floor(
				// 	(votes / pollData[0].totalVotes) * 100
				// );

				return <PollOption optionText={name} votes={votes} percentage={0} />;
			})}
		</div>
	);
}
