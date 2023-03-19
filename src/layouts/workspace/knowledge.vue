<template>
	<div class='space-y-4'>
		<div class='flex items-center justify-between'>
			<div class='space-y-1'>
				<h5
					class='rounded-lg bg-blue-600 px-2 font-semibold uppercase tracking-widest text-white'
				>
					{{ order + 1 }}. {{ header }}
				</h5>
				<div class='flex items-center space-x-1'>
					<div v-for='area in areas'>
						<div
							class='rounded border border-neutral-500 px-2 text-xs font-medium text-neutral-500'
						>
							{{ area.attributes.tag }}
						</div>
					</div>
				</div>
			</div>
			<div class='flex items-center space-x-2'>
				<div class='text-right text-sm'>
					<p class='font-medium'>
						<span
							class='rounded border border-neutral-500 px-2 text-xs text-neutral-500'
						>
							BY</span>
						{{ authorDisplayName }}
					</p>
					<p class='text-neutral-500'>{{ publishDateTime }}</p>
				</div>
				<Avatar :img-src='"http://192.168.1.22:1337" + authorAvatarUrl' />
			</div>
		</div>
		<div
			v-html='content'
			class='prose-article text-justify font-text'
			v-highlight
		></div>
		<DividerHorizontal />
	</div>
</template>

<script setup>
import * as MarkdownIt from 'markdown-it';
import 'highlight.js/styles/a11y-dark.css';
import { computed, ref } from 'vue';
import DividerHorizontal from '@/components/venust/divider/dividerHorizontal.vue';
import Avatar from '@/components/venust/avatar/avatar.vue';

const props = defineProps({
	order: Number,
	header: String,
	areas: Array,
	rawPublishDateTime: Date,
	authorDisplayName: String,
	authorAvatarUrl: String,
	rawContent: String,
	avatar: String,
});

const publishDateTime = computed(() => {
	return props.rawPublishDateTime.toLocaleString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
});

const md = new MarkdownIt();
const content = ref(md.render(props.rawContent));
</script>
