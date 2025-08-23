import { useParams } from 'react-router';
import { mockPollData } from './mockData/mockPolls';
import './poll.css';

export default function Poll() {
	const { id } = useParams();

	return (
		<div>
			<h1>Poll Name</h1>
			<PollCard id={id} />
		</div>
	);
}

export function PollCard({ id }) {
	const pollData = mockPollData[id - 1];
	return (
		<div className='poll-card'>
			{pollData.options.map(({ name, votes }) => {
				const percentageForOption = Math.floor(
					(votes / pollData.totalVotes) * 100
				);

				return (
					<PollOption
						optionText={name}
						votes={votes}
						percentage={percentageForOption}
					/>
				);
			})}
		</div>
	);
}

export function PollOption({
	optionText,
	votes,
	percentage,
}: {
	optionText: string;
	votes: number;
	percentage: number;
}) {
	return (
		<div className='poll-option'>
			<div className='poll-option-content'>
				<div
					className='poll-option-fill'
					style={
						{
							width: `${percentage}%`,
							backgroundColor: 'cyan',
							'--fill-percentage': `${percentage}%`,
						} as React.CSSProperties & { '--fill-percentage': string }
					}
				/>
				<div className='poll-option-text'>
					<span className='option-name'>{optionText}</span>
					<span className='option-stats'>
						{percentage}% {votes && `(${votes} votes)`}
					</span>
				</div>
			</div>
		</div>
	);
}
