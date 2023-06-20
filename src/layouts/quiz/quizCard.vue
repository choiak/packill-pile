<template>
	<div
		class='rounded-lg border p-4 flex items-start space-x-4 bg-white hover:brightness-95 active:scale-95 transition'
	>
		<div class='rounded-full border border-blue-600 bg-white p-2 w-fit'>
			<DocumentIcon class='h-4 w-4' />
		</div>
		<div class='space-y-2 flex-1'>
			<div class='space-y-1'>
				<h6 class='font-semibold font-display text-neutral-700'>{{ name }}</h6>
				<div class='flex items-center space-x-1'>
					<div v-for='area in areas'>
						<div
							class='rounded border px-1 text-xs font-medium text-neutral-500 bg-white'
						>
							{{ area?.attributes?.name }}
						</div>
					</div>
				</div>
			</div>
			<div>

			</div>
		</div>
	</div>
</template>

<script setup>
import { DocumentIcon } from '@heroicons/vue/24/outline/index.js';
import { getQuiz } from '@/api/quiz.js';
import { computed, onUnmounted, toRefs, watch } from 'vue';

const props = defineProps({
	quizId: Number,
});

const { quizId } = toRefs(props);

const quizResponse = getQuiz(quizId, {
	fields: ['name'],
	populate: {
		areas: {
			fields: ['name'],
		}
	}
}, { immediate: false });

if (quizId.value) {
	quizResponse.execute();
}

watch(quizId, (newId) => {
	if (newId) {
		quizResponse.execute();
	}
});

const quiz = computed(() => {
	return quizResponse.data.value?.data?.attributes;
});

const name = computed(() => {
	return quiz.value?.name;
});

const areas = computed(() => {
	return quiz.value?.areas?.data;
});

onUnmounted(() => {
	if (quizResponse.canAbort.value) {
		quizResponse.abort();
	}
})
</script>