import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	polls: defineTable({
		id: v.number(),
		title: v.string(),
		options: v.array(v.string()),
	}),
	votes: defineTable({
		pollId: v.id('polls'),
		answer: v.string(),
		userId: v.string(),
	}).index('by_poll', ['pollId']), // Fast lookup of all votes for a poll
});
