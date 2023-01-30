import { renderTodos } from "./app";

// init todo data
const initTodoData = () => {
	const _firstTodo = [];
	saveTodos(_firstTodo);
}

// get todos from local
const getTodos = (listId) => {
	const allTodos = JSON.parse(localStorage.getItem('todos'));
	if (!listId || listId === 'all') {
		return allTodos;
	} else {
		return allTodos.filter(todo => todo.listId === listId);
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
			const idArray = new Uint32Array(1);
			const id = self.crypto.getRandomValues(idArray)[0];
			const newTodo = {id, listId, title, description, dueDate, dueTime, priority, notes};
			savedTodos.push(newTodo);
			saveTodos(savedTodos);
		} else {
			const idArray = new Uint32Array(1);
			const id = self.crypto.getRandomValues(idArray)[0];
			const firstTodo = [{id, listId, title, description, dueDate, dueTime, priority, notes}];
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

// get todo count per list
const getTodoCount = (listId) => {
	return getTodos(listId).length;
}

export { initTodoData, getTodos, addTodo, getTodoCount };