<template>
	<div class='group h-fit transition hover:backdrop-blur'>
		<div v-for='(section, index) in sections'>
			<div class='flex items-center space-x-2 cursor-pointer' @click.prevent='action(section.arg)'>
				<div
					class='bg-white rounded-full w-2 h-8 border-2 min-w-fit group-hover:shadow transition'
					:class='{"!bg-blue-600": index <= nowAtIndex }'
				/>
				<p
					class='text-sm font-medium px-1 rounded invisible group-hover:!visible mt-auto mb-auto group-hover:shadow-lg transition'
					:class='{"!visible bg-blue-600 text-white": nowAtIndex === index}'
				>
					{{ section.name }}
				</p>
			</div>
			<div class='w-2'>
				<div class='w-1 h-2 ml-auto mr-auto border-x-2 transition' v-if='index < sections.length - 1'/>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	sections: Array,
	nowAtIndex: Number,
	action: Function,
});
</script>


