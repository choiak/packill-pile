<template>
	<div class="flex w-max flex-col space-y-2 rounded-xl bg-white p-2">
		<button class="btn-nav-menu">
			<RectangleGroupIcon class="h-5 w-5" />
		</button>
		<Tracker></Tracker>
		<button class="btn-menu">
			<DocumentTextIcon class="h-5 w-5" />
		</button>
		<button class="btn-menu">
			<PencilIcon class="h-5 w-5" />
		</button>
		<DividerHorizontal />
		<button class="btn-menu">
			<Square3Stack3DIcon class="h-5 w-5" />
		</button>
		<button class="btn-menu">
			<MagnifyingGlassIcon class="h-5 w-5" />
		</button>
	</div>
</template>

<script setup>
import {
	DocumentTextIcon,
	MagnifyingGlassIcon,
	PencilIcon,
	RectangleGroupIcon,
	Square3Stack3DIcon,
} from '@heroicons/vue/24/outline';
import Tracker from '@/components/progress/tracker.vue';
import { useUserStore } from '@/store/index.js';
import DividerHorizontal from '@/components/venust/divider/dividerHorizontal.vue';

const userStore = useUserStore();
</script>
