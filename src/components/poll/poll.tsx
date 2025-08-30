import { useMutation, useQuery } from 'convex/react';
import { useParams } from 'react-router';
import { api } from '../../../convex/_generated/api';
import type { Doc } from '../../../convex/_generated/dataModel';
import { voteStorage } from '../../utils/voteStorage';
import './poll.css';

type PollType = Pick<Doc<'polls'>, 'id' | 'title'> & {
	pollOptions: { option: string; votes: number }[];
	totalVotes: number;
};

export default function Poll() {
	const { id } = useParams();

	const poll = useQuery(api.polls.getPollWithVotes, { pollId: Number(id) });

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
			{Object.values(poll.pollOptions).map(({ option, votes }) => {
				const percentageForOption = Math.floor((votes / poll.totalVotes) * 100);

				return (
					<PollOption
						id={poll.id}
						optionText={option}
						votes={votes}
						percentage={percentageForOption}
					/>
				);
			})}
		</div>
	);
}

export function PollOption({
	id,
	optionText,
	votes,
	percentage,
}: {
	id?: number;
	optionText: string;
	votes: number;
	percentage: number;
}) {
	const postVoteOption = useMutation(api.votes.postVote);
	const handlePostVote = (option: string) => {
		if (!id) {
			return;
		}

		// should check to see if person already voted.
		const hasUserVoted = voteStorage.hasVoted(String(id));
		if (hasUserVoted) {
			console.log('ALREADY VOTED IN THIS POLL');
			return;
		}

		// has not voted, record voted
		voteStorage.recordVote(String(id), optionText);

		postVoteOption({ textOption: option, pollId: id });
	};

	return (
		<div className='poll-option' onClick={() => handlePostVote(optionText)}>
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
