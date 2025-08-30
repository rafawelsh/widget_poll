// localStorage utility for tracking user votes
const VOTE_STORAGE_KEY = 'poll_votes';

interface VoteRecord {
	pollId: string;
	timestamp: number;
	optionName: string;
}

interface VoteStorage {
	[pollId: string]: VoteRecord;
}

export const voteStorage = {
	// Check if user has already voted for a specific poll
	hasVoted: (pollId: string): boolean => {
		try {
			const votes = localStorage.getItem(VOTE_STORAGE_KEY);
			if (!votes) return false;

			const parsedVotes: VoteStorage = JSON.parse(votes);
			return pollId in parsedVotes;
		} catch (error) {
			console.error('Error checking vote status:', error);
			return false;
		}
	},

	// Record a vote for a poll
	recordVote: (pollId: string, optionName: string): void => {
		try {
			const votes = localStorage.getItem(VOTE_STORAGE_KEY);
			const parsedVotes: VoteStorage = votes ? JSON.parse(votes) : {};

			parsedVotes[pollId] = {
				pollId,
				timestamp: Date.now(),
				optionName,
			};

			localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(parsedVotes));
		} catch (error) {
			console.error('Error recording vote:', error);
		}
	},

	// Clear all votes (for testing purposes)
	clearAllVotes: (): void => {
		try {
			localStorage.removeItem(VOTE_STORAGE_KEY);
		} catch (error) {
			console.error('Error clearing votes:', error);
		}
	},
};
