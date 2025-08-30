import { useMutation } from 'convex/react';
import { useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { PollOption } from './poll';

export default function CreatePoll() {
	const [currentOption, setCurrentOption] = useState('');
	const [pollOptions, setPollOptions] = useState<string[]>([]);
	const [pollTitle, setPollTitle] = useState('');

	const createPoll = useMutation(api.polls.createPoll);

	const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!currentOption) {
			console.log('cannot submit empty');
			return;
		}

		if (currentOption.trim()) {
			setPollOptions((prev) => [...prev, currentOption]);
			setCurrentOption('');
		}
	};

	const handleSavePoll = () => {
		createPoll({ title: pollTitle, pollOptions: pollOptions });
		// reset currentOption and pollOptions
		setCurrentOption('');
		setPollOptions([]);
	};

	return (
		<div>
			<div>Create a new poll</div>

			<h3>{pollTitle}</h3>

			<PollCard pollOptions={pollOptions} />

			<div>
				<label>
					Poll title:
					<input
						type='text'
						value={pollTitle}
						onChange={(e) => setPollTitle(e.target.value)}
					/>
				</label>
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

			<button onClick={() => handleSavePoll()}>Save Poll</button>
		</div>
	);
}

export function PollCard({ pollOptions }: { pollOptions: string[] }) {
	return (
		<div className='poll-card'>
			{pollOptions.map((name) => {
				return <PollOption optionText={name} votes={0} percentage={0} />;
			})}
		</div>
	);
}
