<template>
	<SearchPreviewPackage
		v-if="category === 'package'"
		:package-object="item"
	/>
	<SearchPreviewTopic v-else-if="category === 'topic'" :topic-object="item" />
	<SearchPreviewKnowledge
		v-else-if="category === 'knowledge'"
		:knowledge-object="item"
	/>
	<SearchPreviewProblem
		v-else-if="category === 'problem'"
		:problem-object="item"
	/>
	<SearchPreviewUser v-else-if="category === 'user'" :user-object="item" />
</template>

<script setup>
import SearchPreviewPackage from '@/layouts/search/preview/searchPreviewPackage.vue';
import SearchPreviewTopic from '@/layouts/search/preview/searchPreviewTopic.vue';
import SearchPreviewKnowledge from '@/layouts/search/preview/searchPreviewKnowledge.vue';
import SearchPreviewProblem from '@/layouts/search/preview/searchPreviewProblem.vue';
import SearchPreviewUser from '@/layouts/search/preview/searchPreviewUser.vue';

const props = defineProps({
	item: Object,
	category: String,
});
</script>
