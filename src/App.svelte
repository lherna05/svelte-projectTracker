<script>
	import {useForm, Hint, HintGroup, validators, minLength,email,required} from "svelte-use-form";
	const form = useForm();

	export let name;
	export let questions = 'What are your goals for today?';
	export let counter;
	let color = 'orange';
	const currentTasks = [{task: 'Buy a dog'}];

	$: {
		console.log('CurrentTasks: ', currentTasks);
		console.log('Counter: ', counter)
	}

	const handleClick = () => {
		const questionArr = ['What will you accomplish today?', 
		'What will you figure out today?', 
		'What needs to get done today?', 
		'What are your goals today?'];
		console.log('counter is ', counter)
		if (questionArr[counter]) {
			questions = questionArr[counter];
			counter++
		} else {
			counter = 0; 
			questions = questionArr[counter];
		}
	}
	
	const handleInput = (e) => {
		const newInput = e.target.value; 
		console.log('new input: ', newInput)
		currentTasks.push(newInput);
		console.log('Current tasks are now: ', currentTasks)

	}


</script>

<main>
	<h1>Hello {name}!</h1>
	<p style="color: {color}">{questions}</p>
	<button on:click={handleClick} value={questions}> Ask me another!</button>

	<section>
		<h2>Project Tasks</h2>
		<form on:submit={handleInput} >
			<input type='text' placeholder='Enter new task here'>	
		</form>
		<p>
			{#each currentTasks as task}
			  <label>
				<input type=checkbox bind:checked={yes}>
				{task}
			  </label>
			{/each}
		</p>
	</section>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>