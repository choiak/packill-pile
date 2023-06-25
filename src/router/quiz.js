const Quiz = () => import('@/views/quiz/quiz.vue');
const QuizSubmissions = () => import('@/views/quiz/quizSubmissions.vue');
const QuizSubmission = () => import('@/views/quiz/quizSubmission.vue');

export default [
	{
		name: 'Quiz',
		path: '/quizzes/:id',
		component: Quiz,
	},
	{
		name: 'QuizSubmissions',
		path: '/submissions/quizzes/:quizId',
		component: QuizSubmissions,
	}, {
		name: 'QuizSubmission',
		path: '/submission/quiz/:quizSubmissionId',
		component: QuizSubmission,
	},
];