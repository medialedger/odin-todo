import { initListData, getLists, addList, getActiveList, getActiveListId, setActiveListId, deleteList } from './lists.js';
import { initTodoData, getTodos, addTodo, getTodoCount, deleteTodo } from './todos';


// initiate data
const initAllData = () => {
	if (!getLists()) {
		initListData();
	}
	if (!getTodos()) {
		initTodoData();
	}
	if (!getActiveListId()) {
		setActiveListId();
	}
}

// render lists
const renderLists = () => {
	const listContainer = document.querySelector('.lists');
	const listData = getLists();
	let listHtml = '';
	listData.forEach(list => {
		const listCount = getTodoCount(Number(list.id));
		listHtml += `<li data-id="${list.id}"><button>${list.name} <span class="count">[${listCount}]</span></button></li>`;
	})
	listContainer.innerHTML = listHtml;
	const allListButtons = document.querySelectorAll('.lists button');
	allListButtons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const thisId = Number(e.target.closest('li').dataset.id);
			setActiveListId(thisId);
			renderTodos(thisId);
		});
	})
}

// render todos
const renderTodos = () => {
	const activeListId = Number(getActiveListId());
	// container id
	document.querySelector('.todos').dataset.listId = activeListId;
	// header
	const listHeader = document.querySelector('.todo-title');
	const btnListDelete = document.querySelector('.todos .delete');
	listHeader.innerText = getActiveList(activeListId).name;
	// todos
	const todoContainer = document.querySelector('.todos ul');
	let todoHtml = '';
	const todoData = getTodos(activeListId);
	if (todoData.length > 0) {
		todoData.forEach(todo => {
			todoHtml += `<li data-id="${todo.id}" data-priority="${todo.priority}"><input type="checkbox" name="completed-${todo.id}" id="completed-${todo.id}"> <label for="completed-${todo.id}" class="todo-title">${todo.title}</label>`;
			if (todo.dueDate) {
				todoHtml += `<span class="todo-date">${todo.dueDate} ${todo.dueTime}</span>`;
			}
			todoHtml += '<button class="delete"><svg width="7" height="8"><use href="#icon-trash"></use></svg></button>';
			if (todo.description || todo.notes) {
				todoHtml += `<details><summary>more info</summary>`;
				if (todo.description) {
					todoHtml += `<p>${todo.description}</p>`;
				}
				if (todo.notes) {
					todoHtml += `<h4>Notes:</h4><p>${todo.notes}</p>`;
				}
				todoHtml += '</details>';
			}
			todoHtml += '</li>';
		})
		todoContainer.innerHTML = todoHtml;
		btnListDelete.disabled = true;
		const btnsTodoDelete = document.querySelectorAll('.todos .delete');
		btnsTodoDelete.forEach(btn => {
			btn.addEventListener('click', deleteTodo);
		})
	} else {
		todoContainer.innerHTML = '<li>No ToDos yet!</li>';
		btnListDelete.disabled = false;
	}
}

// list dialog button
const btnListDialog = () => {
	const btnListDialog = document.querySelector('.btn-add-list');
	const listDialog = document.getElementById('dialog-add-list');
	btnListDialog.addEventListener('click', () => {
		listDialog.querySelector('form').reset();
		listDialog.showModal();
	});
}

// todo dialog button
const btnTodoDialog = () => {
	const btnTodoDialog = document.querySelector('.btn-add-todo');
	const todoDialog = document.getElementById('dialog-add-todo');
	const todoContainer =document.querySelector('.todos');
	btnTodoDialog.addEventListener('click', () => {
		todoDialog.querySelector('form').reset();
		todoDialog.showModal();
		document.querySelector('#dialog-add-todo .list-name').innerText = getActiveList(Number(todoContainer.dataset.listId)).name;
	});
}

// btn add list
const btnAddList = () => {
	const formAddList = document.querySelector('#dialog-add-list form');
	formAddList.addEventListener('submit', () => {
		addList(new FormData(formAddList));
	})
}

// btn delete list
const btnDeleteList = () => {
	const btnListDelete = document.querySelector('.todos .delete');
	btnListDelete.addEventListener('click', deleteList);
}

// btn add todo
const btnAddTodo = () => {
	const todoContainer = document.querySelector('.todos');
	const formAddTodo = document.querySelector('#dialog-add-todo form');
	formAddTodo.addEventListener('submit', () => {
		addTodo(new FormData(formAddTodo), Number(todoContainer.dataset.listId));
	})
}

// render all
const renderAll = () => {
	initAllData();
	renderLists();
	renderTodos();
	btnListDialog();
	btnAddList();
	btnTodoDialog();
	btnAddTodo();
	btnDeleteList();
}





export { renderLists, renderTodos, renderAll };