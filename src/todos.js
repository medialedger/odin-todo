import { renderTodos } from "./app";

// get todos from local
const getTodos = (listId = 1) => {
	const allTodos = JSON.parse(localStorage.getItem('todos'));
	if (allTodos) {
		if (listId === 'all') {
			return allTodos;
		} else {
			return allTodos.filter(todo => todo.listId === listId);
		}
	} else {
		const _firstTodo = [];
		localStorage.setItem('todos', JSON.stringify(_firstTodo));
		return null;
	}
}

// save todos to local
const saveTodos = (todoData) => {
	localStorage.setItem('todos', JSON.stringify(todoData));
}

// todo factory
const Todo = (listId, title, description, dueDate, dueTime, priority, notes) => {
	const saveTodo = () => {
		let savedTodos = getTodos('all');
		if (savedTodos.length > 0) {
			const maxTodoID = Math.max(...savedTodos.map(todo => todo.id));
			const newTodoId = maxTodoID + 1;
			const newTodo = {id: newTodoId, listId, title, description, dueDate, dueTime, priority, notes};
			savedTodos.push(newTodo);
			saveTodos(savedTodos);
		} else {
			const firstTodo = [{id: 1, listId, title, description, dueDate, dueTime, priority, notes}];
			saveTodos(firstTodo);
		}
		renderTodos(listId);
	}
	return {saveTodo};
}

// add todo
const addTodo = (formDataObject, listId) => {
	const newTodo = Todo(
		listId,
		formDataObject.get('title'),
		formDataObject.get('description'),
		formDataObject.get('dueDate'),
		formDataObject.get('dueTime'),
		formDataObject.get('priority'),
		formDataObject.get('notes')
	);
	newTodo.saveTodo();
}



export { getTodos, addTodo };