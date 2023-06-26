<template>
	<Error
		:code="401"
		status-text="Unauthorized"
		description="Uh oh, looks like you're not on the VIP list! You'll need to provide the secret password to gain access to this page. Or, you know, maybe try to become more popular."
	>
		<h5
			class="w-fit rounded-lg bg-blue-600 px-2 font-semibold uppercase tracking-widest text-white"
		>
			What is 401?
		</h5>
		<div class="prose font-text text-white drop-shadow-xl">
			<p>
				The 401 status code belongs to the HTTP (Hypertext Transfer
				Protocol) standard response codes. This error occurs when the
				client is not authenticated to access the requested resource or
				API endpoint. The server requires the client to provide valid
				credentials (e.g. username and password) to access the resource,
				but the client has not done so or the credentials provided are
				invalid. Common causes are:
			</p>
			<ul aria-label="Causes of 401 error">
				<li>Invalid or expired authentication token;</li>
				<li>Incorrect or missing credentials;</li>
				<li>Unauthorized access to the resource.</li>
			</ul>
			<p>
				To resolve the 401 error, the client should provide valid
				credentials (e.g. username and password) to access the resource.
				If the client is unable to provide valid credentials, they
				should contact the system administrator or service provider for
				assistance.
			</p>
		</div>
	</Error>
</template>

<script setup>
import Error from '@/layouts/error/error.vue';
</script>
