import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const postVote = mutation({
	args: { textOption: v.string(), pollId: v.number() },
	handler: async (ctx, args) => {
		const poll = await ctx.db
			.query('polls')
			.filter((q) => q.eq(q.field('id'), args.pollId))
			.first();

		if (!poll) {
			throw new Error(`Poll with id ${args.pollId} not found`);
		}

		await ctx.db.insert('votes', {
			pollId: poll?._id,
			answer: args.textOption,
			userId: '',
		});
	},
});
