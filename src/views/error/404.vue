<template>
	<Error :code='404'
		   status-text='Not Found'
		   description="Oops, something's missing or we have moved the page to
		   somewhere else.">
		<h5
			class='w-fit rounded-lg bg-blue-600 px-2 font-semibold uppercase tracking-widest text-white'
		>
			What is 404?
		</h5>
		<div class='prose font-text text-white drop-shadow-xl'>
			<p>
				The 404 status code belongs to the HTTP (Hypertext
				Transfer Protocol) standard response codes. This error
				pops up when the client has successfully requested from
				or communicated with the server, but the server is
				unable to find the information that was requested.
				Common causes are:
			</p>
			<ul aria-label="Causes of 404 error">
				<li>Mistyped URL; or</li>
				<li>the page has been moved or deleted.</li>
			</ul>
		</div>
	</Error>
</template>

<script setup>
import Error from '@/layouts/error/error.vue';
</script>
