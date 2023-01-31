/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAll": () => (/* binding */ renderAll),
/* harmony export */   "renderLists": () => (/* binding */ renderLists),
/* harmony export */   "renderTodos": () => (/* binding */ renderTodos)
/* harmony export */ });
/* harmony import */ var _lists_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lists.js */ "./src/lists.js");
/* harmony import */ var _todos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todos */ "./src/todos.js");




// initiate data
const initAllData = () => {
	if (!(0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getLists)()) {
		(0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.initListData)();
	}
	if (!(0,_todos__WEBPACK_IMPORTED_MODULE_1__.getTodos)()) {
		(0,_todos__WEBPACK_IMPORTED_MODULE_1__.initTodoData)();
	}
	if (!(0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getActiveListId)()) {
		(0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.setActiveListId)();
	}
}

// render lists
const renderLists = () => {
	const listContainer = document.querySelector('.lists ul');
	const listData = (0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getLists)();
	let listHtml = '';
	listData.forEach(list => {
		const listCount = (0,_todos__WEBPACK_IMPORTED_MODULE_1__.getTodoCount)(Number(list.id));
		listHtml += `<li data-id="${list.id}" ${list.id === Number((0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getActiveListId)()) ? 'class="active"' : ''}><button>${list.name} <span class="count">[${listCount}]</span></button></li>`;
	})
	listContainer.innerHTML = listHtml;
	const allListButtons = document.querySelectorAll('.lists li button');
	allListButtons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const thisId = Number(e.target.closest('li').dataset.id);
			(0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.setActiveListId)(thisId);
			renderLists();
			renderTodos(thisId);
		});
	})
}

// render todos
const renderTodos = () => {
	const activeListId = Number((0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getActiveListId)());
	// container id
	document.querySelector('.todos').dataset.listId = activeListId;
	// header
	const listHeader = document.querySelector('.todo-title');
	const btnListDelete = document.querySelector('.todos .delete');
	listHeader.innerText = (0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getActiveList)(activeListId).name;
	// todos
	const todoContainer = document.querySelector('.todos ul');
	let todoHtml = '';
	const todoData = (0,_todos__WEBPACK_IMPORTED_MODULE_1__.getTodos)(activeListId);
	if (todoData.length > 0) {
		todoData.forEach(todo => {
			todoHtml += `<li data-id="${todo.id}" data-priority="${todo.priority}"><input type="checkbox" name="completed-${todo.id}" id="completed-${todo.id}" ${todo.completed ? 'checked' : ''}><span class="todo-info"><label for="completed-${todo.id}" class="todo-title">${todo.title}</label>`;
			if (todo.dueDate) {
				todoHtml += `<span class="todo-date">${todo.dueDate} ${todo.dueTime}</span>`;
			}
			if (todo.description || todo.notes) {
				todoHtml += `<details><summary>more info</summary>`;
				if (todo.description) {
					todoHtml += `<p>${todo.description}</p>`;
				}
				if (todo.notes) {
					todoHtml += `<h3>Notes:</h3><p>${todo.notes}</p>`;
				}
				todoHtml += '</details>';
			}
			todoHtml += '</span><button class="delete"><svg width="7" height="8"><use href="#icon-trash"></use></svg></button></li>';
		})
		todoContainer.innerHTML = todoHtml;
		btnListDelete.disabled = true;
		// complete buttons
		const btnsTodoComplete = document.querySelectorAll('.todos input[type="checkbox"]');
		btnsTodoComplete.forEach(btn => {
			btn.addEventListener('change', _todos__WEBPACK_IMPORTED_MODULE_1__.completeTodo);
		})
		// delete buttons
		const btnsTodoDelete = document.querySelectorAll('.todos ul .delete');
		btnsTodoDelete.forEach(btn => {
			btn.addEventListener('click', _todos__WEBPACK_IMPORTED_MODULE_1__.deleteTodo);
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
		document.querySelector('#dialog-add-todo .list-name').innerText = (0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getActiveList)(Number(todoContainer.dataset.listId)).name;
	});
}

// btn add list
const btnAddList = () => {
	const formAddList = document.querySelector('#dialog-add-list form');
	formAddList.addEventListener('submit', () => {
		(0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.addList)(new FormData(formAddList));
	})
}

// btn delete list
const btnDeleteList = () => {
	const btnListDelete = document.querySelector('.todos h2 .delete');
	btnListDelete.addEventListener('click', _lists_js__WEBPACK_IMPORTED_MODULE_0__.deleteList);
}

// btn add todo
const btnAddTodo = () => {
	const todoContainer = document.querySelector('.todos');
	const formAddTodo = document.querySelector('#dialog-add-todo form');
	formAddTodo.addEventListener('submit', () => {
		(0,_todos__WEBPACK_IMPORTED_MODULE_1__.addTodo)(new FormData(formAddTodo), Number(todoContainer.dataset.listId));
	})
}

// btn dialog close
const btnsDialogClose = () => {
	const btnsClose = document.querySelectorAll('dialog .close');
	btnsClose.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.target.closest('dialog').close();
		})
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
	btnsDialogClose();
}







/***/ }),

/***/ "./src/lists.js":
/*!**********************!*\
  !*** ./src/lists.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addList": () => (/* binding */ addList),
/* harmony export */   "deleteList": () => (/* binding */ deleteList),
/* harmony export */   "getActiveList": () => (/* binding */ getActiveList),
/* harmony export */   "getActiveListId": () => (/* binding */ getActiveListId),
/* harmony export */   "getLists": () => (/* binding */ getLists),
/* harmony export */   "initListData": () => (/* binding */ initListData),
/* harmony export */   "setActiveListId": () => (/* binding */ setActiveListId)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _todos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todos */ "./src/todos.js");



// init list data
const initListData = () => {
	const idArray = new Uint32Array(1);
	const id = self.crypto.getRandomValues(idArray)[0];
	const _firstList = [{
		id,
		name: 'My List',
		color: '#000'
	}];
	saveLists(_firstList);
}

// get lists from local storage
const getLists = () => {
	const allLists = JSON.parse(localStorage.getItem('lists'));
	return allLists;
}

// save active list ID
const setActiveListId = (listId) => {
	if (listId) {
		localStorage.setItem('activeList', listId);
	} else {
		const firstListId = getLists()[0].id;
		localStorage.setItem('activeList', firstListId);
	}
}

// get Active list ID
const getActiveListId = () => {
	return localStorage.getItem('activeList');
}

// get active list
const getActiveList = (listId) => {
	const allLists = getLists();
	return allLists.find(list => list.id === Number(listId));
}

// save lists to local storage
const saveLists = (listData) => {
	localStorage.setItem('lists', JSON.stringify(listData));
}

// list factory
const List = (name, color) => {
	const saveList = () => {
		let savedLists = getLists();
		const idArray = new Uint32Array(1);
		const id = self.crypto.getRandomValues(idArray)[0];
		const newList = {id, name, color};
		savedLists.push(newList);
		saveLists(savedLists);
		setActiveListId(id);
		(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderLists)();
		(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderTodos)();
		
	}
	return {saveList};
}

// add list
const addList = (formDataObject) => {
	const newList = List(formDataObject.get('name'), formDataObject.get('color'));
	newList.saveList();
}

// delete list
const deleteList = () => {
	let thisId = Number(getActiveListId());
	if ((0,_todos__WEBPACK_IMPORTED_MODULE_1__.getTodoCount)(thisId) > 0) {
		console.log('list not empty');
	} else {
		let savedLists = getLists();
		const thisIndex = savedLists.findIndex(list => list.id === thisId);
		savedLists.splice(thisIndex, 1);
		saveLists(savedLists);
		(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderLists)();
		setActiveListId();
		(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderTodos)();
	}
}




/***/ }),

/***/ "./src/todos.js":
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTodo": () => (/* binding */ addTodo),
/* harmony export */   "completeTodo": () => (/* binding */ completeTodo),
/* harmony export */   "deleteTodo": () => (/* binding */ deleteTodo),
/* harmony export */   "getTodoCount": () => (/* binding */ getTodoCount),
/* harmony export */   "getTodos": () => (/* binding */ getTodos),
/* harmony export */   "initTodoData": () => (/* binding */ initTodoData)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


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
const Todo = (listId, title, description, dueDate, dueTime, priority, notes, completed) => {
	const saveTodo = () => {
		let savedTodos = getTodos('all');
		const idArray = new Uint32Array(1);
		const id = self.crypto.getRandomValues(idArray)[0];
		const newTodo = {id, listId, title, description, dueDate, dueTime, priority, notes, completed: false};
		savedTodos.push(newTodo);
		saveTodos(savedTodos);
		(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderTodos)(listId);
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

// complete todo
const completeTodo = (e) => {
	const thisId = Number(e.target.closest('li').dataset.id);
	let savedTodos = getTodos();
	const thisTodo = savedTodos.findIndex(todo => todo.id === thisId);
	savedTodos[thisTodo].completed = e.target.checked;
	saveTodos(savedTodos);
	(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderTodos)();
}

// delete todo
const deleteTodo = (e) => {
	const thisId = Number(e.target.closest('li').dataset.id);
	let savedTodos = getTodos();
	const thisTodo = savedTodos.findIndex(todo => todo.id === thisId);
	savedTodos.splice(thisTodo, 1);
	saveTodos(savedTodos);
	(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderTodos)();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderAll)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7QUNwRm9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsRUFBRSxpREFBVztBQUNiO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxpREFBVztBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxpREFBVztBQUNaOzs7Ozs7Ozs7VUMxRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rQzs7QUFFbEMsK0NBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9saXN0cy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRMaXN0RGF0YSwgZ2V0TGlzdHMsIGFkZExpc3QsIGdldEFjdGl2ZUxpc3QsIGdldEFjdGl2ZUxpc3RJZCwgc2V0QWN0aXZlTGlzdElkLCBkZWxldGVMaXN0IH0gZnJvbSAnLi9saXN0cy5qcyc7XG5pbXBvcnQgeyBpbml0VG9kb0RhdGEsIGdldFRvZG9zLCBhZGRUb2RvLCBnZXRUb2RvQ291bnQsIGRlbGV0ZVRvZG8sIGNvbXBsZXRlVG9kbyB9IGZyb20gJy4vdG9kb3MnO1xuXG5cbi8vIGluaXRpYXRlIGRhdGFcbmNvbnN0IGluaXRBbGxEYXRhID0gKCkgPT4ge1xuXHRpZiAoIWdldExpc3RzKCkpIHtcblx0XHRpbml0TGlzdERhdGEoKTtcblx0fVxuXHRpZiAoIWdldFRvZG9zKCkpIHtcblx0XHRpbml0VG9kb0RhdGEoKTtcblx0fVxuXHRpZiAoIWdldEFjdGl2ZUxpc3RJZCgpKSB7XG5cdFx0c2V0QWN0aXZlTGlzdElkKCk7XG5cdH1cbn1cblxuLy8gcmVuZGVyIGxpc3RzXG5jb25zdCByZW5kZXJMaXN0cyA9ICgpID0+IHtcblx0Y29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0cyB1bCcpO1xuXHRjb25zdCBsaXN0RGF0YSA9IGdldExpc3RzKCk7XG5cdGxldCBsaXN0SHRtbCA9ICcnO1xuXHRsaXN0RGF0YS5mb3JFYWNoKGxpc3QgPT4ge1xuXHRcdGNvbnN0IGxpc3RDb3VudCA9IGdldFRvZG9Db3VudChOdW1iZXIobGlzdC5pZCkpO1xuXHRcdGxpc3RIdG1sICs9IGA8bGkgZGF0YS1pZD1cIiR7bGlzdC5pZH1cIiAke2xpc3QuaWQgPT09IE51bWJlcihnZXRBY3RpdmVMaXN0SWQoKSkgPyAnY2xhc3M9XCJhY3RpdmVcIicgOiAnJ30+PGJ1dHRvbj4ke2xpc3QubmFtZX0gPHNwYW4gY2xhc3M9XCJjb3VudFwiPlske2xpc3RDb3VudH1dPC9zcGFuPjwvYnV0dG9uPjwvbGk+YDtcblx0fSlcblx0bGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSBsaXN0SHRtbDtcblx0Y29uc3QgYWxsTGlzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdHMgbGkgYnV0dG9uJyk7XG5cdGFsbExpc3RCdXR0b25zLmZvckVhY2goYnRuID0+IHtcblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0Y29uc3QgdGhpc0lkID0gTnVtYmVyKGUudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuZGF0YXNldC5pZCk7XG5cdFx0XHRzZXRBY3RpdmVMaXN0SWQodGhpc0lkKTtcblx0XHRcdHJlbmRlckxpc3RzKCk7XG5cdFx0XHRyZW5kZXJUb2Rvcyh0aGlzSWQpO1xuXHRcdH0pO1xuXHR9KVxufVxuXG4vLyByZW5kZXIgdG9kb3NcbmNvbnN0IHJlbmRlclRvZG9zID0gKCkgPT4ge1xuXHRjb25zdCBhY3RpdmVMaXN0SWQgPSBOdW1iZXIoZ2V0QWN0aXZlTGlzdElkKCkpO1xuXHQvLyBjb250YWluZXIgaWRcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zJykuZGF0YXNldC5saXN0SWQgPSBhY3RpdmVMaXN0SWQ7XG5cdC8vIGhlYWRlclxuXHRjb25zdCBsaXN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tdGl0bGUnKTtcblx0Y29uc3QgYnRuTGlzdERlbGV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcyAuZGVsZXRlJyk7XG5cdGxpc3RIZWFkZXIuaW5uZXJUZXh0ID0gZ2V0QWN0aXZlTGlzdChhY3RpdmVMaXN0SWQpLm5hbWU7XG5cdC8vIHRvZG9zXG5cdGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MgdWwnKTtcblx0bGV0IHRvZG9IdG1sID0gJyc7XG5cdGNvbnN0IHRvZG9EYXRhID0gZ2V0VG9kb3MoYWN0aXZlTGlzdElkKTtcblx0aWYgKHRvZG9EYXRhLmxlbmd0aCA+IDApIHtcblx0XHR0b2RvRGF0YS5mb3JFYWNoKHRvZG8gPT4ge1xuXHRcdFx0dG9kb0h0bWwgKz0gYDxsaSBkYXRhLWlkPVwiJHt0b2RvLmlkfVwiIGRhdGEtcHJpb3JpdHk9XCIke3RvZG8ucHJpb3JpdHl9XCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJjb21wbGV0ZWQtJHt0b2RvLmlkfVwiIGlkPVwiY29tcGxldGVkLSR7dG9kby5pZH1cIiAke3RvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJyd9PjxzcGFuIGNsYXNzPVwidG9kby1pbmZvXCI+PGxhYmVsIGZvcj1cImNvbXBsZXRlZC0ke3RvZG8uaWR9XCIgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+JHt0b2RvLnRpdGxlfTwvbGFiZWw+YDtcblx0XHRcdGlmICh0b2RvLmR1ZURhdGUpIHtcblx0XHRcdFx0dG9kb0h0bWwgKz0gYDxzcGFuIGNsYXNzPVwidG9kby1kYXRlXCI+JHt0b2RvLmR1ZURhdGV9ICR7dG9kby5kdWVUaW1lfTwvc3Bhbj5gO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRvZG8uZGVzY3JpcHRpb24gfHwgdG9kby5ub3Rlcykge1xuXHRcdFx0XHR0b2RvSHRtbCArPSBgPGRldGFpbHM+PHN1bW1hcnk+bW9yZSBpbmZvPC9zdW1tYXJ5PmA7XG5cdFx0XHRcdGlmICh0b2RvLmRlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdFx0dG9kb0h0bWwgKz0gYDxwPiR7dG9kby5kZXNjcmlwdGlvbn08L3A+YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodG9kby5ub3Rlcykge1xuXHRcdFx0XHRcdHRvZG9IdG1sICs9IGA8aDM+Tm90ZXM6PC9oMz48cD4ke3RvZG8ubm90ZXN9PC9wPmA7XG5cdFx0XHRcdH1cblx0XHRcdFx0dG9kb0h0bWwgKz0gJzwvZGV0YWlscz4nO1xuXHRcdFx0fVxuXHRcdFx0dG9kb0h0bWwgKz0gJzwvc3Bhbj48YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+PHN2ZyB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI4XCI+PHVzZSBocmVmPVwiI2ljb24tdHJhc2hcIj48L3VzZT48L3N2Zz48L2J1dHRvbj48L2xpPic7XG5cdFx0fSlcblx0XHR0b2RvQ29udGFpbmVyLmlubmVySFRNTCA9IHRvZG9IdG1sO1xuXHRcdGJ0bkxpc3REZWxldGUuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdC8vIGNvbXBsZXRlIGJ1dHRvbnNcblx0XHRjb25zdCBidG5zVG9kb0NvbXBsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG9zIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuXHRcdGJ0bnNUb2RvQ29tcGxldGUuZm9yRWFjaChidG4gPT4ge1xuXHRcdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNvbXBsZXRlVG9kbyk7XG5cdFx0fSlcblx0XHQvLyBkZWxldGUgYnV0dG9uc1xuXHRcdGNvbnN0IGJ0bnNUb2RvRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG9zIHVsIC5kZWxldGUnKTtcblx0XHRidG5zVG9kb0RlbGV0ZS5mb3JFYWNoKGJ0biA9PiB7XG5cdFx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVUb2RvKTtcblx0XHR9KVxuXHR9IGVsc2Uge1xuXHRcdHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gJzxsaT5ObyBUb0RvcyB5ZXQhPC9saT4nO1xuXHRcdGJ0bkxpc3REZWxldGUuZGlzYWJsZWQgPSBmYWxzZTtcblx0fVxufVxuXG4vLyBsaXN0IGRpYWxvZyBidXR0b25cbmNvbnN0IGJ0bkxpc3REaWFsb2cgPSAoKSA9PiB7XG5cdGNvbnN0IGJ0bkxpc3REaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWFkZC1saXN0Jyk7XG5cdGNvbnN0IGxpc3REaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nLWFkZC1saXN0Jyk7XG5cdGJ0bkxpc3REaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0bGlzdERpYWxvZy5xdWVyeVNlbGVjdG9yKCdmb3JtJykucmVzZXQoKTtcblx0XHRsaXN0RGlhbG9nLnNob3dNb2RhbCgpO1xuXHR9KTtcbn1cblxuLy8gdG9kbyBkaWFsb2cgYnV0dG9uXG5jb25zdCBidG5Ub2RvRGlhbG9nID0gKCkgPT4ge1xuXHRjb25zdCBidG5Ub2RvRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1hZGQtdG9kbycpO1xuXHRjb25zdCB0b2RvRGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZy1hZGQtdG9kbycpO1xuXHRjb25zdCB0b2RvQ29udGFpbmVyID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MnKTtcblx0YnRuVG9kb0RpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0b2RvRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKS5yZXNldCgpO1xuXHRcdHRvZG9EaWFsb2cuc2hvd01vZGFsKCk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpYWxvZy1hZGQtdG9kbyAubGlzdC1uYW1lJykuaW5uZXJUZXh0ID0gZ2V0QWN0aXZlTGlzdChOdW1iZXIodG9kb0NvbnRhaW5lci5kYXRhc2V0Lmxpc3RJZCkpLm5hbWU7XG5cdH0pO1xufVxuXG4vLyBidG4gYWRkIGxpc3RcbmNvbnN0IGJ0bkFkZExpc3QgPSAoKSA9PiB7XG5cdGNvbnN0IGZvcm1BZGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpYWxvZy1hZGQtbGlzdCBmb3JtJyk7XG5cdGZvcm1BZGRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsICgpID0+IHtcblx0XHRhZGRMaXN0KG5ldyBGb3JtRGF0YShmb3JtQWRkTGlzdCkpO1xuXHR9KVxufVxuXG4vLyBidG4gZGVsZXRlIGxpc3RcbmNvbnN0IGJ0bkRlbGV0ZUxpc3QgPSAoKSA9PiB7XG5cdGNvbnN0IGJ0bkxpc3REZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MgaDIgLmRlbGV0ZScpO1xuXHRidG5MaXN0RGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlTGlzdCk7XG59XG5cbi8vIGJ0biBhZGQgdG9kb1xuY29uc3QgYnRuQWRkVG9kbyA9ICgpID0+IHtcblx0Y29uc3QgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpO1xuXHRjb25zdCBmb3JtQWRkVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2ctYWRkLXRvZG8gZm9ybScpO1xuXHRmb3JtQWRkVG9kby5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoKSA9PiB7XG5cdFx0YWRkVG9kbyhuZXcgRm9ybURhdGEoZm9ybUFkZFRvZG8pLCBOdW1iZXIodG9kb0NvbnRhaW5lci5kYXRhc2V0Lmxpc3RJZCkpO1xuXHR9KVxufVxuXG4vLyBidG4gZGlhbG9nIGNsb3NlXG5jb25zdCBidG5zRGlhbG9nQ2xvc2UgPSAoKSA9PiB7XG5cdGNvbnN0IGJ0bnNDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpYWxvZyAuY2xvc2UnKTtcblx0YnRuc0Nsb3NlLmZvckVhY2goYnRuID0+IHtcblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS50YXJnZXQuY2xvc2VzdCgnZGlhbG9nJykuY2xvc2UoKTtcblx0XHR9KVxuXHR9KVxufVxuXG4vLyByZW5kZXIgYWxsXG5jb25zdCByZW5kZXJBbGwgPSAoKSA9PiB7XG5cdGluaXRBbGxEYXRhKCk7XG5cdHJlbmRlckxpc3RzKCk7XG5cdHJlbmRlclRvZG9zKCk7XG5cdGJ0bkxpc3REaWFsb2coKTtcblx0YnRuQWRkTGlzdCgpO1xuXHRidG5Ub2RvRGlhbG9nKCk7XG5cdGJ0bkFkZFRvZG8oKTtcblx0YnRuRGVsZXRlTGlzdCgpO1xuXHRidG5zRGlhbG9nQ2xvc2UoKTtcbn1cblxuXG5cblxuXG5leHBvcnQgeyByZW5kZXJMaXN0cywgcmVuZGVyVG9kb3MsIHJlbmRlckFsbCB9OyIsImltcG9ydCB7IHJlbmRlckxpc3RzLCByZW5kZXJUb2RvcyB9IGZyb20gXCIuL2FwcFwiO1xuaW1wb3J0IHsgZ2V0VG9kb0NvdW50IH0gZnJvbSBcIi4vdG9kb3NcIjtcblxuLy8gaW5pdCBsaXN0IGRhdGFcbmNvbnN0IGluaXRMaXN0RGF0YSA9ICgpID0+IHtcblx0Y29uc3QgaWRBcnJheSA9IG5ldyBVaW50MzJBcnJheSgxKTtcblx0Y29uc3QgaWQgPSBzZWxmLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoaWRBcnJheSlbMF07XG5cdGNvbnN0IF9maXJzdExpc3QgPSBbe1xuXHRcdGlkLFxuXHRcdG5hbWU6ICdNeSBMaXN0Jyxcblx0XHRjb2xvcjogJyMwMDAnXG5cdH1dO1xuXHRzYXZlTGlzdHMoX2ZpcnN0TGlzdCk7XG59XG5cbi8vIGdldCBsaXN0cyBmcm9tIGxvY2FsIHN0b3JhZ2VcbmNvbnN0IGdldExpc3RzID0gKCkgPT4ge1xuXHRjb25zdCBhbGxMaXN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpc3RzJykpO1xuXHRyZXR1cm4gYWxsTGlzdHM7XG59XG5cbi8vIHNhdmUgYWN0aXZlIGxpc3QgSURcbmNvbnN0IHNldEFjdGl2ZUxpc3RJZCA9IChsaXN0SWQpID0+IHtcblx0aWYgKGxpc3RJZCkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY3RpdmVMaXN0JywgbGlzdElkKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBmaXJzdExpc3RJZCA9IGdldExpc3RzKClbMF0uaWQ7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjdGl2ZUxpc3QnLCBmaXJzdExpc3RJZCk7XG5cdH1cbn1cblxuLy8gZ2V0IEFjdGl2ZSBsaXN0IElEXG5jb25zdCBnZXRBY3RpdmVMaXN0SWQgPSAoKSA9PiB7XG5cdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWN0aXZlTGlzdCcpO1xufVxuXG4vLyBnZXQgYWN0aXZlIGxpc3RcbmNvbnN0IGdldEFjdGl2ZUxpc3QgPSAobGlzdElkKSA9PiB7XG5cdGNvbnN0IGFsbExpc3RzID0gZ2V0TGlzdHMoKTtcblx0cmV0dXJuIGFsbExpc3RzLmZpbmQobGlzdCA9PiBsaXN0LmlkID09PSBOdW1iZXIobGlzdElkKSk7XG59XG5cbi8vIHNhdmUgbGlzdHMgdG8gbG9jYWwgc3RvcmFnZVxuY29uc3Qgc2F2ZUxpc3RzID0gKGxpc3REYXRhKSA9PiB7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0cycsIEpTT04uc3RyaW5naWZ5KGxpc3REYXRhKSk7XG59XG5cbi8vIGxpc3QgZmFjdG9yeVxuY29uc3QgTGlzdCA9IChuYW1lLCBjb2xvcikgPT4ge1xuXHRjb25zdCBzYXZlTGlzdCA9ICgpID0+IHtcblx0XHRsZXQgc2F2ZWRMaXN0cyA9IGdldExpc3RzKCk7XG5cdFx0Y29uc3QgaWRBcnJheSA9IG5ldyBVaW50MzJBcnJheSgxKTtcblx0XHRjb25zdCBpZCA9IHNlbGYuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhpZEFycmF5KVswXTtcblx0XHRjb25zdCBuZXdMaXN0ID0ge2lkLCBuYW1lLCBjb2xvcn07XG5cdFx0c2F2ZWRMaXN0cy5wdXNoKG5ld0xpc3QpO1xuXHRcdHNhdmVMaXN0cyhzYXZlZExpc3RzKTtcblx0XHRzZXRBY3RpdmVMaXN0SWQoaWQpO1xuXHRcdHJlbmRlckxpc3RzKCk7XG5cdFx0cmVuZGVyVG9kb3MoKTtcblx0XHRcblx0fVxuXHRyZXR1cm4ge3NhdmVMaXN0fTtcbn1cblxuLy8gYWRkIGxpc3RcbmNvbnN0IGFkZExpc3QgPSAoZm9ybURhdGFPYmplY3QpID0+IHtcblx0Y29uc3QgbmV3TGlzdCA9IExpc3QoZm9ybURhdGFPYmplY3QuZ2V0KCduYW1lJyksIGZvcm1EYXRhT2JqZWN0LmdldCgnY29sb3InKSk7XG5cdG5ld0xpc3Quc2F2ZUxpc3QoKTtcbn1cblxuLy8gZGVsZXRlIGxpc3RcbmNvbnN0IGRlbGV0ZUxpc3QgPSAoKSA9PiB7XG5cdGxldCB0aGlzSWQgPSBOdW1iZXIoZ2V0QWN0aXZlTGlzdElkKCkpO1xuXHRpZiAoZ2V0VG9kb0NvdW50KHRoaXNJZCkgPiAwKSB7XG5cdFx0Y29uc29sZS5sb2coJ2xpc3Qgbm90IGVtcHR5Jyk7XG5cdH0gZWxzZSB7XG5cdFx0bGV0IHNhdmVkTGlzdHMgPSBnZXRMaXN0cygpO1xuXHRcdGNvbnN0IHRoaXNJbmRleCA9IHNhdmVkTGlzdHMuZmluZEluZGV4KGxpc3QgPT4gbGlzdC5pZCA9PT0gdGhpc0lkKTtcblx0XHRzYXZlZExpc3RzLnNwbGljZSh0aGlzSW5kZXgsIDEpO1xuXHRcdHNhdmVMaXN0cyhzYXZlZExpc3RzKTtcblx0XHRyZW5kZXJMaXN0cygpO1xuXHRcdHNldEFjdGl2ZUxpc3RJZCgpO1xuXHRcdHJlbmRlclRvZG9zKCk7XG5cdH1cbn1cblxuXG5leHBvcnQgeyBpbml0TGlzdERhdGEsIGdldExpc3RzLCBhZGRMaXN0LCBnZXRBY3RpdmVMaXN0LCBnZXRBY3RpdmVMaXN0SWQsIHNldEFjdGl2ZUxpc3RJZCwgZGVsZXRlTGlzdCB9OyIsImltcG9ydCB7IHJlbmRlclRvZG9zIH0gZnJvbSBcIi4vYXBwXCI7XG5cbi8vIGluaXQgdG9kbyBkYXRhXG5jb25zdCBpbml0VG9kb0RhdGEgPSAoKSA9PiB7XG5cdGNvbnN0IF9maXJzdFRvZG8gPSBbXTtcblx0c2F2ZVRvZG9zKF9maXJzdFRvZG8pO1xufVxuXG4vLyBnZXQgdG9kb3MgZnJvbSBsb2NhbFxuY29uc3QgZ2V0VG9kb3MgPSAobGlzdElkKSA9PiB7XG5cdGNvbnN0IGFsbFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSk7XG5cdGlmICghbGlzdElkIHx8IGxpc3RJZCA9PT0gJ2FsbCcpIHtcblx0XHRyZXR1cm4gYWxsVG9kb3M7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGFsbFRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8ubGlzdElkID09PSBsaXN0SWQpO1xuXHR9XG59XG5cbi8vIHNhdmUgdG9kb3MgdG8gbG9jYWxcbmNvbnN0IHNhdmVUb2RvcyA9ICh0b2RvRGF0YSkgPT4ge1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvRGF0YSkpO1xufVxuXG4vLyB0b2RvIGZhY3RvcnlcbmNvbnN0IFRvZG8gPSAobGlzdElkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGR1ZVRpbWUsIHByaW9yaXR5LCBub3RlcywgY29tcGxldGVkKSA9PiB7XG5cdGNvbnN0IHNhdmVUb2RvID0gKCkgPT4ge1xuXHRcdGxldCBzYXZlZFRvZG9zID0gZ2V0VG9kb3MoJ2FsbCcpO1xuXHRcdGNvbnN0IGlkQXJyYXkgPSBuZXcgVWludDMyQXJyYXkoMSk7XG5cdFx0Y29uc3QgaWQgPSBzZWxmLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoaWRBcnJheSlbMF07XG5cdFx0Y29uc3QgbmV3VG9kbyA9IHtpZCwgbGlzdElkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGR1ZVRpbWUsIHByaW9yaXR5LCBub3RlcywgY29tcGxldGVkOiBmYWxzZX07XG5cdFx0c2F2ZWRUb2Rvcy5wdXNoKG5ld1RvZG8pO1xuXHRcdHNhdmVUb2RvcyhzYXZlZFRvZG9zKTtcblx0XHRyZW5kZXJUb2RvcyhsaXN0SWQpO1xuXHR9XG5cdHJldHVybiB7c2F2ZVRvZG99O1xufVxuXG4vLyBhZGQgdG9kb1xuY29uc3QgYWRkVG9kbyA9IChmb3JtRGF0YU9iamVjdCwgbGlzdElkKSA9PiB7XG5cdGNvbnN0IG5ld1RvZG8gPSBUb2RvKFxuXHRcdGxpc3RJZCxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ3RpdGxlJyksXG5cdFx0Zm9ybURhdGFPYmplY3QuZ2V0KCdkZXNjcmlwdGlvbicpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgnZHVlRGF0ZScpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgnZHVlVGltZScpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgncHJpb3JpdHknKSxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ25vdGVzJylcblx0KTtcblx0bmV3VG9kby5zYXZlVG9kbygpO1xufVxuXG4vLyBnZXQgdG9kbyBjb3VudCBwZXIgbGlzdFxuY29uc3QgZ2V0VG9kb0NvdW50ID0gKGxpc3RJZCkgPT4ge1xuXHRyZXR1cm4gZ2V0VG9kb3MobGlzdElkKS5sZW5ndGg7XG59XG5cbi8vIGNvbXBsZXRlIHRvZG9cbmNvbnN0IGNvbXBsZXRlVG9kbyA9IChlKSA9PiB7XG5cdGNvbnN0IHRoaXNJZCA9IE51bWJlcihlLnRhcmdldC5jbG9zZXN0KCdsaScpLmRhdGFzZXQuaWQpO1xuXHRsZXQgc2F2ZWRUb2RvcyA9IGdldFRvZG9zKCk7XG5cdGNvbnN0IHRoaXNUb2RvID0gc2F2ZWRUb2Rvcy5maW5kSW5kZXgodG9kbyA9PiB0b2RvLmlkID09PSB0aGlzSWQpO1xuXHRzYXZlZFRvZG9zW3RoaXNUb2RvXS5jb21wbGV0ZWQgPSBlLnRhcmdldC5jaGVja2VkO1xuXHRzYXZlVG9kb3Moc2F2ZWRUb2Rvcyk7XG5cdHJlbmRlclRvZG9zKCk7XG59XG5cbi8vIGRlbGV0ZSB0b2RvXG5jb25zdCBkZWxldGVUb2RvID0gKGUpID0+IHtcblx0Y29uc3QgdGhpc0lkID0gTnVtYmVyKGUudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuZGF0YXNldC5pZCk7XG5cdGxldCBzYXZlZFRvZG9zID0gZ2V0VG9kb3MoKTtcblx0Y29uc3QgdGhpc1RvZG8gPSBzYXZlZFRvZG9zLmZpbmRJbmRleCh0b2RvID0+IHRvZG8uaWQgPT09IHRoaXNJZCk7XG5cdHNhdmVkVG9kb3Muc3BsaWNlKHRoaXNUb2RvLCAxKTtcblx0c2F2ZVRvZG9zKHNhdmVkVG9kb3MpO1xuXHRyZW5kZXJUb2RvcygpO1xufVxuXG5cbmV4cG9ydCB7IGluaXRUb2RvRGF0YSwgZ2V0VG9kb3MsIGFkZFRvZG8sIGdldFRvZG9Db3VudCwgZGVsZXRlVG9kbywgY29tcGxldGVUb2RvIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZW5kZXJBbGwgfSBmcm9tICcuL2FwcCc7XG5cbnJlbmRlckFsbCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9