import { getLists, addList, getCurrentList } from './lists.js';
import { getTodos, addTodo } from './todos';


// list dialog button
const btnListDialog = () => {
	const btnListDialog = document.querySelector('.btn-add-list');
	const listDialog = document.getElementById('dialog-add-list');
	btnListDialog.addEventListener('click', () => {
		listDialog.showModal();
	});
}

// todo dialog button
const btnTodoDialog = () => {
	const btnTodoDialog = document.querySelector('.btn-add-todo');
	const todoDialog = document.getElementById('dialog-add-todo');
	const todoContainer =document.querySelector('.todos');
	btnTodoDialog.addEventListener('click', () => {
		todoDialog.showModal();
		document.querySelector('#dialog-add-todo .list-name').innerText = getCurrentList(Number(todoContainer.dataset.listId)).name;
	});
}

// add list
const btnAddList = () => {
	const formAddList = document.querySelector('#dialog-add-list form');
	formAddList.addEventListener('submit', () => {
		addList(new FormData(formAddList));
	})
}

// add todo
const btnAddTodo = () => {
	const todoContainer = document.querySelector('.todos');
	const formAddTodo = document.querySelector('#dialog-add-todo form');
	formAddTodo.addEventListener('submit', () => {
		addTodo(new FormData(formAddTodo), Number(todoContainer.dataset.listId));
	})
}

// render lists
const renderLists = () => {
	const listContainer = document.querySelector('.lists');
	const listData = getLists();
	let listHtml = '';
	listData.forEach(list => {
		listHtml += `<li><button data-id="${list.id}" data-color="${list.color}">${list.name}</button></li>`;
	})
	listContainer.innerHTML = listHtml;
	const allListButtons = document.querySelectorAll('.lists button');
	allListButtons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			renderTodos(Number(e.target.dataset.id));
		});
	})
}

// render active list
const renderActiveList = (listId = 1) => {
	const listHeader = document.querySelector('.todos h2');
	listHeader.innerText = getCurrentList(listId).name;
}

// render todos
const renderTodos = (listId = 1) => {
	document.querySelector('.todos').dataset.listId = listId;
	const todoContainer = document.querySelector('.todos ul');
	let todoHtml = '';
	const todoData = getTodos(listId);
	if (todoData.length > 0) {
		todoData.forEach(todo => {
			todoHtml += `<li data-id="${todo.id}">${todo.title}</li>`;
		})
		todoContainer.innerHTML = todoHtml;
	} else {
		todoContainer.innerHTML = '<li>No ToDos yet!</li>';
	}
	renderActiveList(listId);
}

// render all
const renderAll = () => {
	renderLists();
	renderTodos();
	renderActiveList();
	btnListDialog();
	btnAddList();
	btnTodoDialog();
	btnAddTodo();
}





export { renderLists, renderTodos, renderAll };