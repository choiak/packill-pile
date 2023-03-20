<template>
	<div class='h-screen w-screen bg-orange-600 p-8 flex flex-col justify-between'>
		<div>
			<button class='flex items-center space-x-1 w-fit rounded-lg text-white hover:bg-white hover:text-black p-2 transition hover:bg-blue-600 hover:shadow active:shadow-blue-900' @click.prevent='router.push("/dashboard")'>
				<ArrowLeftCircleIcon class='h-5 w-5' />
				<label>Back</label>
			</button>
		</div>
		<div class='flex justify-between items-end'>
			<div class='space-y-4 text-white'>
				<h1 class='font-semibold drop-shadow-xl'>404</h1>
				<h6 class='leading-5 drop-shadow-xl'>
					Oops, something's missing or we have moved the page to somewhere else.
				</h6>
			</div>
			<div class='space-y-4 max-w-[25%]'>
				<h5
					class='rounded-lg bg-blue-600 px-2 font-semibold uppercase tracking-widest text-white w-fit'
				>
					What is 404?
				</h5>
				<div class='prose font-text text-white drop-shadow-xl'>
					<p>
						The 404 status code belongs to the HTTP (Hypertext Transfer Protocol) standard response codes.
						This error pops up when the client has successfully requested from or communicated with the
						server,
						but the server is unable to find the information that was requested.

						Common causes are:
					</p>
					<ul>
						<li>Mistyped URL; or</li>
						<li>the page has been moved or deleted.</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/outline';
import router from '@/router/index.js';
</script>
