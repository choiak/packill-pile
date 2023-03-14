<template>
	<Index>
		<div class="flex flex-col h-full w-full space-y-4 rounded-xl bg-white p-8">
			<div class='space-y-1'>
				<h3 class='font-semibold'>{{ userObject.displayName }}</h3>
				<div class='flex items-center space-x-1'>
					<p
						class='rounded border border-neutral-500 px-2 text-xs font-medium text-neutral-500'
					>
						Editor
					</p>
				</div>
			</div>
			<Profile class='flex-1' :user-object='userObject'/>
		</div>
	</Index>
</template>

<script setup>
import Index from '@/layouts/pile/index.vue';
import { useUserStore } from '@/store/index.js';
import Profile from '@/layouts/user/profile.vue';
import { useRoute } from 'vue-router';
import { getUser } from '@/api/user.js';

const route = useRoute();
const userId = route.params.id;

const userObject = await getUser(userId);

</script>
