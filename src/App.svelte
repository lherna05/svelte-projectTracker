<script>
	import {useForm, Hint, HintGroup, validators, minLength,email,required} from "svelte-use-form";
	import { afterUpdate } from 'svelte';
	export let name;
	let counter = 0;
	let questions; 
	const form = useForm();

	afterUpdate(() => {
	  document.querySelector('.js-todo-input').focus();
      });

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
	
	let todoItems = [];
	let newTodo = '';

	function addTodo() {
	  newTodo = newTodo.trim();
	  if (!newTodo) return;

	  const todo = {
	      text: newTodo,
	      checked: false,
	      id: Date.now(),
	  };

	  todoItems = [...todoItems, todo];
	  newTodo = '';
	}

	function toggleDone(id) {
	  const index = todoItems.findIndex(item => item.id === Number(id));
	  todoItems[index].checked = !todoItems[index].checked;
	}

	function deleteTodo(id) {
	  todoItems = todoItems.filter(item => item.id !== Number(id));
	}

</script>

<main>
	<h1>Hello {name}!</h1>
	<!-- <p>{questions}</p> -->
	<!-- <button on:click={handleClick} value={questions}> Ask me another!</button> -->
		<div class="container">
			<h1 class="app-title">Today's Tasks</h1>
			<ul class="todo-list"></ul>
			<div class="empty-state">
			  <!-- <svg class="checklist-icon"><use href="#checklist-icon"></use></svg> -->
			  <h2 class="empty-state__title">Add your first todo</h2>
			</div>
			<form on:submit|preventDefault={addTodo}>
			  <input class="js-todo-input" type="text" aria-label="Enter a new todo item" placeholder="Enter new Task Here..." bind:value={newTodo} />
			</form>
		  </div>
		<div>
		  <ul class="todo-list">
			{#each todoItems as todo (todo.id)}
			  <li class="todo-item {todo.checked ? 'done' : ''}">
				<input id={todo.id} type="checkbox" />
				<label for={todo.id} class="tick" on:click={() => toggleDone(todo.id)}></label>
				<span>{todo.text}</span>
				<button class="delete-todo" on:click={() => deleteTodo(todo.id)}>
					X
				  </button>
			  </li>
			{/each}
		  </ul>
		</div>  
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