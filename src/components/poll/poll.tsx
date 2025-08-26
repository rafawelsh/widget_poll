import { useQuery } from 'convex/react';
import { useParams } from 'react-router';
import { api } from '../../../convex/_generated/api';
import type { Doc } from '../../../convex/_generated/dataModel';
import './poll.css';

type PollType = Doc<'polls'>;

export default function Poll() {
	const { id } = useParams();

	const poll = useQuery(api.polls.getPoll, { pollId: Number(id) });

	if (!poll) {
		return null;
	}

	return (
		<div>
			<h1>{poll.title}</h1>
			<PollCard poll={poll} />
		</div>
	);
}

export function PollCard({ poll }: { poll: PollType }) {
	return (
		<div className='poll-card'>
			{poll.options.map(({ name, votes }) => {
				const percentageForOption = Math.floor((votes / poll.totalVotes) * 100);

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
