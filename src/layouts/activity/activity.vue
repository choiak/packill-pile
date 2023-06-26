<template>
	<div class="flex items-start space-x-2">
		<div class="flex items-start space-x-2 self-stretch">
			<div class="w-[90px] pb-4">
				<p class="text-right text-sm font-bold text-neutral-500">
					<slot name="createdAtDate" />
				</p>
				<p class="text-right text-xs font-semibold text-neutral-500">
					<slot name="createdAtTime" />
				</p>
			</div>
			<div class="flex flex-col items-center self-stretch">
				<div
					class="w-fit rounded-full border border-blue-600 bg-white p-2"
				>
					<slot name="icon" />
				</div>
				<div class="h-full w-0.5 bg-neutral-300" />
			</div>
		</div>
		<div class="flex-1 space-y-2 border-b pb-4 pt-1.5">
			<p class="font-semibold text-neutral-700">
				<slot name="message" />
			</p>
			<slot name="details" />
		</div>
	</div>
</template>

<script setup></script>
