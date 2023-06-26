<template>
	<link
		href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://api.fontshare.com/v2/css?f[]=supreme@2,1&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://api.fontshare.com/v2/css?f[]=azeret-mono@2,1&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://api.fontshare.com/v2/css?f[]=zodiak@1,2&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://api.fontshare.com/v2/css?f[]=clash-display@1&display=swap"
		rel="stylesheet"
	/>
	<Suspense>
		<router-view class="h-full w-full" />
	</Suspense>
</template>

<script setup></script>
