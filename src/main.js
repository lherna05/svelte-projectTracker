import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Lani',
		questions: '', 
		counter: 0
	}
});

export default app;