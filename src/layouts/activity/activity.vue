<template>
	<div class='flex items-start space-x-2'>
		<div class='flex items-start self-stretch space-x-2'>
			<div class='pb-4 w-[90px]'>
				<p class='text-neutral-500 text-sm font-bold text-right'><slot name='createdAtDate'/></p>
				<p class='text-neutral-500 font-semibold text-xs text-right'><slot name='createdAtTime'/></p>
			</div>
			<div class='flex flex-col items-center self-stretch'>
				<div class='rounded-full border border-blue-600 bg-white p-2 w-fit'>
					<slot name='icon' />
				</div>
				<div class='w-0.5 bg-neutral-300 h-full' />
			</div>
		</div>
		<div class='pt-1.5 pb-4 space-y-2 border-b'>
			<p class='font-semibold text-neutral-700'><slot name='message'/></p>
			<slot name='details'/>
		</div>
	</div>
</template>

<script setup>
</script>
