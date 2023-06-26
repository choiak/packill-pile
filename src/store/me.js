import { defineStore } from 'pinia';
import { computed, watch } from 'vue';
import { getMe } from '@/api/me.js';
import { useLocalStorage } from '@vueuse/core';

export const useMyStore = defineStore('me', () => {
	const token = useLocalStorage('token', '');

	function setToken(jwt) {
		token.value = jwt;
	}

	function clearToken() {
		token.value = '';
	}

	watch(token, (newToken, oldToken) => {
		if (newToken !== oldToken) {
			meResponse.execute();
		}
	});

	const meResponse = getMe({
		populate: {
			currentPackage: true,
			currentTopicOrQuiz: {
				populate: {
					topic: {
						populate: {
							partitions: {
								populate: {
									topics: true,
									quiz: true,
									package: true,
								},
							},
						},
					},
					quiz: {
						populate: {
							partition: {
								populate: {
									topics: true,
									quiz: true,
									package: true,
								},
							},
						},
					},
				},
			},
			completedTopics: true,
			completedQuizzes: true,
			completedProblems: true,
			completedPackages: true,
		},
	});

	const meIsLoading = computed(() => {
		return (
			meResponse.isFetching.value ||
			(!meResponse.isFetching.value && !meResponse.isFinished.value)
		);
	});

	const me = computed(() => {
		return meResponse.data.value;
	});

	const username = computed(() => {
		return me.value?.username;
	});

	const displayName = computed(() => {
		return me.value?.displayName;
	});

	const bio = computed(() => {
		return me.value?.bio;
	});

	const birthday = computed(() => {
		return me.value?.birthday;
	});

	const myId = computed(() => {
		return me.value?.id;
	});

	const email = computed(() => {
		return me.value?.email;
	});

	const createdAt = computed(() => {
		return new Date(me.value?.createdAt);
	});

	const currentPackage = computed(() => {
		return me.value?.currentPackage;
	});

	const currentTopicOrQuiz = computed(() => {
		switch (currentType.value) {
			case 'topic':
				return me.value.currentTopicOrQuiz[0].topic;
			case 'quiz':
				return me.value.currentTopicOrQuiz[0].quiz;
			default:
				return null;
		}
	});

	const currentType = computed(() => {
		if (me.value?.currentTopicOrQuiz.length) {
			switch (me.value?.currentTopicOrQuiz[0].__component) {
				case 'relation.topic-connector':
					return 'topic';
				case 'relation.quiz-connector':
					return 'quiz';
				default:
					return null;
			}
		} else {
			return null;
		}
	});

	const currentPartition = computed(() => {
		switch (currentType.value) {
			case 'topic':
				return currentTopicOrQuiz.value?.partitions?.filter(
					(partition) =>
						partition.package.id === currentPackage.value?.id,
				)[0];
			case 'quiz':
				return currentTopicOrQuiz.value?.partition;
			default:
				return null;
		}
	});

	const topicsAndQuizInCurrentPartition = computed(() => {
		if (currentPartition.value) {
			return [
				...currentPartition.value.topics.map((topic) => {
					return { type: 'topic', ...topic };
				}),
				{ type: 'quiz', ...currentPartition.value.quiz },
			];
		} else {
			return null;
		}
	});

	const completedTopics = computed(() => {
		return me.value?.completedTopics;
	});

	const completedQuizzes = computed(() => {
		return me.value?.completedQuizzes;
	});

	const completedTopicsAndQuizInCurrentPartition = computed(() => {
		if (topicsAndQuizInCurrentPartition.value) {
			return topicsAndQuizInCurrentPartition.value.filter(
				(item) =>
					(item.type === 'topic' &&
						completedTopics.value.some(
							(topic) => topic.id === item.id,
						)) ||
					(item.type === 'quiz' &&
						completedQuizzes.value.some(
							(quiz) => quiz.id === item.id,
						)),
			);
		} else {
			return null;
		}
	});

	const currentPartitionProgress = computed(() => {
		if (topicsAndQuizInCurrentPartition.value) {
			return (
				completedTopicsAndQuizInCurrentPartition.value.length /
				topicsAndQuizInCurrentPartition.value.length
			);
		} else {
			return null;
		}
	});

	const completedProblems = computed(() => {
		return me.value?.completedProblems;
	});

	const completedPackages = computed(() => {
		return me.value?.completedPackages;
	});

	const isCurrentPackageCompleted = computed(() => {
		if (completedPackages.value && currentPackage.value) {
			return completedPackages.value.some(
				(pack) => pack.id === currentPackage.value.id,
			);
		} else {
			return null;
		}
	});

	return {
		token,
		setToken,
		clearToken,
		meResponse,
		meIsLoading,
		username,
		displayName,
		bio,
		birthday,
		myId,
		email,
		createdAt,
		currentPackage,
		currentTopicOrQuiz,
		currentType,
		completedProblems,
		completedPackages,
		currentPartition,
		currentPartitionProgress,
		completedTopics,
		completedQuizzes,
		isCurrentPackageCompleted,
		refresh: meResponse.execute,
	};
});
