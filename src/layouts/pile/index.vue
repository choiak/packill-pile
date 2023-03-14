<template>
	<div class="h-full bg-stone-100">
		<div class="flex h-full min-h-fit overflow-auto sm:p-6 sm:space-x-6">
			<Menubar class='hidden sm:flex'/>
			<div class="flex-1">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup>
import Menubar from '@/layouts/menuBar/menubar.vue';
import Topic from '@/layouts/pile/topic.vue';
</script>
