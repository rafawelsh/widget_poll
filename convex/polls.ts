import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('polls').collect();
	},
});

export const getPoll = query({
	args: { pollId: v.float64() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('polls')
			.filter((query) => query.eq(query.field('id'), args.pollId))
			.first();
	},
});

export const getPollWithVotes = query({
	args: { pollId: v.number() },
	handler: async (ctx, args) => {
		const poll = await ctx.db
			.query('polls')
			.filter((q) => q.eq(q.field('id'), args.pollId))
			.first();

		if (!poll) return null;

		// Votes is its own DB where we store each vote with its corresponding pollId
		const votes = await ctx.db
			.query('votes')
			.withIndex('by_poll', (q) => q.eq('pollId', poll._id))
			.collect();

		const optionsWithVotes = poll.options.map((option) => ({
			option,
			votes: votes.filter((v) => v.answer === option).length,
		}));

		return {
			id: poll.id,
			title: poll.title,
			pollOptions: optionsWithVotes,
			totalVotes: votes.length,
		};
	},
});

export const createPoll = mutation({
	args: {
		title: v.string(),
		pollOptions: v.array(v.string()),
	},
	handler: async (ctx, args) => {
		const allPosts = await ctx.db.query('polls').collect();

		const latestPostNumber = allPosts.length + 1;

		await ctx.db.insert('polls', {
			id: latestPostNumber,
			title: args.title,
			options: args.pollOptions,
		});
	},
});
