<template>
	<Error
		:code="403"
		status-text="Forbidden"
		description="Whoops! It looks like you stumbled upon a forbidden area. No trespassing allowed! You might want to check with our bouncer to get access."
	>
		<h5
			class="w-fit rounded-lg bg-blue-600 px-2 font-semibold uppercase tracking-widest text-white"
		>
			What is 403?
		</h5>
		<div class="prose font-text text-white drop-shadow-xl">
			<p>
				The 403 status code belongs to the HTTP (Hypertext Transfer
				Protocol) standard response codes. This error occurs when the
				client is authenticated, but does not have sufficient permission
				to access the requested resource or API endpoint. The server
				recognizes the client's identity, but the client's credentials
				do not grant access to the resource. Common causes are:
			</p>
			<ul aria-label="Causes of 403 error">
				<li>Insufficient permissions;</li>
				<li>Access to the resource is forbidden;</li>
				<li>
					The client's credentials do not grant access to the
					resource.
				</li>
			</ul>
			<p>
				To resolve the 403 error, the client should contact the system
				administrator or API provider to request permission to access
				the resource. Alternatively, the system administrator or API
				provider can adjust the client's permissions to grant access to
				the resource.
			</p>
		</div>
	</Error>
</template>

<script setup>
import Error from '@/layouts/error/error.vue';
</script>
