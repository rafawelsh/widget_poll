import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	polls: defineTable({
		id: v.number(),
		title: v.string(),
		options: v.array(
			v.object({
				name: v.string(),
				votes: v.number(),
			})
		),
		totalVotes: v.number(),
	}),
	votes: defineTable({
		pollId: v.id('polls'),
		answer: v.string(),
		userId: v.string(), // may not be needed, we shall see
	}).index('by_poll', ['pollId']), // Fast lookup of all votes for a poll
});
