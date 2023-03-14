<script setup></script>

<template>
	<link
		href="https://api.fontshare.com/v2/css?f[]=general-sans@1,2&display=swap"
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
	<Suspense>
		<div id="app" class="flex justify-center bg-stone-100 w-screen h-screen min-h-[392px]">
			<router-view class='max-w-[2560px]'/>
		</div>
	</Suspense>
</template>
