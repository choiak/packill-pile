<template>
	<div class="h-full w-full bg-stone-50">
		<div class="flex h-full min-h-fit w-full">
			<Menubar class="hidden sm:flex" />
			<div class="flex-1 overflow-auto">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup>
import Menubar from '@/layouts/menuBar/menubar.vue';
import Topic from '@/layouts/topic/topic.vue';
import Dock from '@/layouts/dock/dock.vue';
</script>
