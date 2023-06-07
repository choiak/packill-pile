<template>
	<div class='flex flex-col items-center justify-center'>
		<div class='space-y-2'>
			<DocumentCheckIcon
				class='ml-auto mr-auto h-10 w-10 text-neutral-300'
			/>
			<p
				class='max-w-[300px] text-center text-sm font-medium tracking-wide text-neutral-500'
			>
				Hey, you are a
				<span
					class='bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'
				>
						master
					</span>
				now. You have finished all the problems that are related to
				this topic.
			</p>
		</div>
	</div>
</template>

<script setup>
import { DocumentCheckIcon } from '@heroicons/vue/24/solid';
</script>
