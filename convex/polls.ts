import { v } from 'convex/values';
import { query } from './_generated/server';

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
