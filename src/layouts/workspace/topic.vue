<template>
	<div
		class="h-full min-w-min max-w-[800px] resize-x space-y-4 overflow-auto rounded-lg border p-4"
	>
		<div class="flex items-center space-x-2">
			<DocumentTextIcon class="h-5 w-5" />
			<h4 class="font-medium">Theory</h4>
		</div>
		<div v-for="(knowledge, index) in knowledges">
			<Knowledge
				:order="index"
				:header="knowledge.attributes.Title"
				:raw-publish-date-time="
					new Date(knowledge.attributes.publishedAt)
				"
				:areas="knowledge.attributes.areas.data"
				:raw-content="knowledge.attributes.Content"
				:author-id="'a'"
				:author-display-name="
					knowledge.attributes.author.data.attributes.displayName
				"
				:author-avatar-url="
					knowledge.attributes.author.data.attributes.avatar.data
						.attributes.url
				"
			/>
		</div>
	</div>
</template>

<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';
import { getTopic } from '@/api/workspace.js';
import Knowledge from '@/layouts/workspace/knowledge.vue';

const route = useRoute();
const topicId = route.params.topicId;

const topicObject = await getTopic(topicId);
const knowledges = topicObject.attributes.knowledges.data;
</script>
