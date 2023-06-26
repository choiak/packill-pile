<template>
	<div class="group h-fit transition hover:backdrop-blur">
		<div v-for="(section, index) in sections">
			<div
				class="flex cursor-pointer items-center space-x-2"
				@click.prevent="action(section.arg)"
			>
				<div
					class="h-8 w-2 min-w-fit rounded-full border-2 bg-white transition group-hover:shadow"
					:class="{ '!bg-blue-600': index <= nowAtIndex }"
				/>
				<p
					class="invisible mb-auto mt-auto rounded px-1 text-sm font-medium transition group-hover:!visible group-hover:shadow-lg"
					:class="{
						'!visible bg-blue-600 text-white': nowAtIndex === index,
					}"
				>
					{{ section.name }}
				</p>
			</div>
			<div class="w-2">
				<div
					class="ml-auto mr-auto h-2 w-1 border-x-2 transition"
					v-if="index < sections.length - 1"
				/>
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
