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
	const listContainer = document.querySelector('.lists');
	const listData = (0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getLists)();
	let listHtml = '';
	listData.forEach(list => {
		const listCount = (0,_todos__WEBPACK_IMPORTED_MODULE_1__.getTodoCount)(Number(list.id));
		listHtml += `<li data-id="${list.id}"><button>${list.name} <span class="count">[${listCount}]</span></button></li>`;
	})
	listContainer.innerHTML = listHtml;
	const allListButtons = document.querySelectorAll('.lists button');
	allListButtons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const thisId = Number(e.target.closest('li').dataset.id);
			(0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.setActiveListId)(thisId);
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
			todoHtml += `<li data-id="${todo.id}" data-priority="${todo.priority}"><input type="checkbox" name="completed-${todo.id}" id="completed-${todo.id}" ${todo.completed ? 'checked' : ''}> <label for="completed-${todo.id}" class="todo-title">${todo.title}</label>`;
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
		// complete buttons
		const btnsTodoComplete = document.querySelectorAll('.todos input[type="checkbox"]');
		btnsTodoComplete.forEach(btn => {
			btn.addEventListener('change', _todos__WEBPACK_IMPORTED_MODULE_1__.completeTodo);
		})
		// delete buttons
		const btnsTodoDelete = document.querySelectorAll('.todos .delete');
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
	const btnListDelete = document.querySelector('.todos .delete');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLEVBQUUsaURBQVc7QUFDYjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsaURBQVc7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsaURBQVc7QUFDWjs7Ozs7Ozs7O1VDMUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7O0FBRWxDLCtDQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvbGlzdHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL3RvZG9zLmpzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0TGlzdERhdGEsIGdldExpc3RzLCBhZGRMaXN0LCBnZXRBY3RpdmVMaXN0LCBnZXRBY3RpdmVMaXN0SWQsIHNldEFjdGl2ZUxpc3RJZCwgZGVsZXRlTGlzdCB9IGZyb20gJy4vbGlzdHMuanMnO1xuaW1wb3J0IHsgaW5pdFRvZG9EYXRhLCBnZXRUb2RvcywgYWRkVG9kbywgZ2V0VG9kb0NvdW50LCBkZWxldGVUb2RvLCBjb21wbGV0ZVRvZG8gfSBmcm9tICcuL3RvZG9zJztcblxuXG4vLyBpbml0aWF0ZSBkYXRhXG5jb25zdCBpbml0QWxsRGF0YSA9ICgpID0+IHtcblx0aWYgKCFnZXRMaXN0cygpKSB7XG5cdFx0aW5pdExpc3REYXRhKCk7XG5cdH1cblx0aWYgKCFnZXRUb2RvcygpKSB7XG5cdFx0aW5pdFRvZG9EYXRhKCk7XG5cdH1cblx0aWYgKCFnZXRBY3RpdmVMaXN0SWQoKSkge1xuXHRcdHNldEFjdGl2ZUxpc3RJZCgpO1xuXHR9XG59XG5cbi8vIHJlbmRlciBsaXN0c1xuY29uc3QgcmVuZGVyTGlzdHMgPSAoKSA9PiB7XG5cdGNvbnN0IGxpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdHMnKTtcblx0Y29uc3QgbGlzdERhdGEgPSBnZXRMaXN0cygpO1xuXHRsZXQgbGlzdEh0bWwgPSAnJztcblx0bGlzdERhdGEuZm9yRWFjaChsaXN0ID0+IHtcblx0XHRjb25zdCBsaXN0Q291bnQgPSBnZXRUb2RvQ291bnQoTnVtYmVyKGxpc3QuaWQpKTtcblx0XHRsaXN0SHRtbCArPSBgPGxpIGRhdGEtaWQ9XCIke2xpc3QuaWR9XCI+PGJ1dHRvbj4ke2xpc3QubmFtZX0gPHNwYW4gY2xhc3M9XCJjb3VudFwiPlske2xpc3RDb3VudH1dPC9zcGFuPjwvYnV0dG9uPjwvbGk+YDtcblx0fSlcblx0bGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSBsaXN0SHRtbDtcblx0Y29uc3QgYWxsTGlzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdHMgYnV0dG9uJyk7XG5cdGFsbExpc3RCdXR0b25zLmZvckVhY2goYnRuID0+IHtcblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0Y29uc3QgdGhpc0lkID0gTnVtYmVyKGUudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuZGF0YXNldC5pZCk7XG5cdFx0XHRzZXRBY3RpdmVMaXN0SWQodGhpc0lkKTtcblx0XHRcdHJlbmRlclRvZG9zKHRoaXNJZCk7XG5cdFx0fSk7XG5cdH0pXG59XG5cbi8vIHJlbmRlciB0b2Rvc1xuY29uc3QgcmVuZGVyVG9kb3MgPSAoKSA9PiB7XG5cdGNvbnN0IGFjdGl2ZUxpc3RJZCA9IE51bWJlcihnZXRBY3RpdmVMaXN0SWQoKSk7XG5cdC8vIGNvbnRhaW5lciBpZFxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MnKS5kYXRhc2V0Lmxpc3RJZCA9IGFjdGl2ZUxpc3RJZDtcblx0Ly8gaGVhZGVyXG5cdGNvbnN0IGxpc3RIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby10aXRsZScpO1xuXHRjb25zdCBidG5MaXN0RGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zIC5kZWxldGUnKTtcblx0bGlzdEhlYWRlci5pbm5lclRleHQgPSBnZXRBY3RpdmVMaXN0KGFjdGl2ZUxpc3RJZCkubmFtZTtcblx0Ly8gdG9kb3Ncblx0Y29uc3QgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcyB1bCcpO1xuXHRsZXQgdG9kb0h0bWwgPSAnJztcblx0Y29uc3QgdG9kb0RhdGEgPSBnZXRUb2RvcyhhY3RpdmVMaXN0SWQpO1xuXHRpZiAodG9kb0RhdGEubGVuZ3RoID4gMCkge1xuXHRcdHRvZG9EYXRhLmZvckVhY2godG9kbyA9PiB7XG5cdFx0XHR0b2RvSHRtbCArPSBgPGxpIGRhdGEtaWQ9XCIke3RvZG8uaWR9XCIgZGF0YS1wcmlvcml0eT1cIiR7dG9kby5wcmlvcml0eX1cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImNvbXBsZXRlZC0ke3RvZG8uaWR9XCIgaWQ9XCJjb21wbGV0ZWQtJHt0b2RvLmlkfVwiICR7dG9kby5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJ30+IDxsYWJlbCBmb3I9XCJjb21wbGV0ZWQtJHt0b2RvLmlkfVwiIGNsYXNzPVwidG9kby10aXRsZVwiPiR7dG9kby50aXRsZX08L2xhYmVsPmA7XG5cdFx0XHRpZiAodG9kby5kdWVEYXRlKSB7XG5cdFx0XHRcdHRvZG9IdG1sICs9IGA8c3BhbiBjbGFzcz1cInRvZG8tZGF0ZVwiPiR7dG9kby5kdWVEYXRlfSAke3RvZG8uZHVlVGltZX08L3NwYW4+YDtcblx0XHRcdH1cblx0XHRcdHRvZG9IdG1sICs9ICc8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+PHN2ZyB3aWR0aD1cIjdcIiBoZWlnaHQ9XCI4XCI+PHVzZSBocmVmPVwiI2ljb24tdHJhc2hcIj48L3VzZT48L3N2Zz48L2J1dHRvbj4nO1xuXHRcdFx0aWYgKHRvZG8uZGVzY3JpcHRpb24gfHwgdG9kby5ub3Rlcykge1xuXHRcdFx0XHR0b2RvSHRtbCArPSBgPGRldGFpbHM+PHN1bW1hcnk+bW9yZSBpbmZvPC9zdW1tYXJ5PmA7XG5cdFx0XHRcdGlmICh0b2RvLmRlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdFx0dG9kb0h0bWwgKz0gYDxwPiR7dG9kby5kZXNjcmlwdGlvbn08L3A+YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodG9kby5ub3Rlcykge1xuXHRcdFx0XHRcdHRvZG9IdG1sICs9IGA8aDQ+Tm90ZXM6PC9oND48cD4ke3RvZG8ubm90ZXN9PC9wPmA7XG5cdFx0XHRcdH1cblx0XHRcdFx0dG9kb0h0bWwgKz0gJzwvZGV0YWlscz4nO1xuXHRcdFx0fVxuXHRcdFx0dG9kb0h0bWwgKz0gJzwvbGk+Jztcblx0XHR9KVxuXHRcdHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gdG9kb0h0bWw7XG5cdFx0YnRuTGlzdERlbGV0ZS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0Ly8gY29tcGxldGUgYnV0dG9uc1xuXHRcdGNvbnN0IGJ0bnNUb2RvQ29tcGxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kb3MgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cdFx0YnRuc1RvZG9Db21wbGV0ZS5mb3JFYWNoKGJ0biA9PiB7XG5cdFx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY29tcGxldGVUb2RvKTtcblx0XHR9KVxuXHRcdC8vIGRlbGV0ZSBidXR0b25zXG5cdFx0Y29uc3QgYnRuc1RvZG9EZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kb3MgLmRlbGV0ZScpO1xuXHRcdGJ0bnNUb2RvRGVsZXRlLmZvckVhY2goYnRuID0+IHtcblx0XHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGV0ZVRvZG8pO1xuXHRcdH0pXG5cdH0gZWxzZSB7XG5cdFx0dG9kb0NvbnRhaW5lci5pbm5lckhUTUwgPSAnPGxpPk5vIFRvRG9zIHlldCE8L2xpPic7XG5cdFx0YnRuTGlzdERlbGV0ZS5kaXNhYmxlZCA9IGZhbHNlO1xuXHR9XG59XG5cbi8vIGxpc3QgZGlhbG9nIGJ1dHRvblxuY29uc3QgYnRuTGlzdERpYWxvZyA9ICgpID0+IHtcblx0Y29uc3QgYnRuTGlzdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tYWRkLWxpc3QnKTtcblx0Y29uc3QgbGlzdERpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2ctYWRkLWxpc3QnKTtcblx0YnRuTGlzdERpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRsaXN0RGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKS5yZXNldCgpO1xuXHRcdGxpc3REaWFsb2cuc2hvd01vZGFsKCk7XG5cdH0pO1xufVxuXG4vLyB0b2RvIGRpYWxvZyBidXR0b25cbmNvbnN0IGJ0blRvZG9EaWFsb2cgPSAoKSA9PiB7XG5cdGNvbnN0IGJ0blRvZG9EaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWFkZC10b2RvJyk7XG5cdGNvbnN0IHRvZG9EaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nLWFkZC10b2RvJyk7XG5cdGNvbnN0IHRvZG9Db250YWluZXIgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpO1xuXHRidG5Ub2RvRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdHRvZG9EaWFsb2cucXVlcnlTZWxlY3RvcignZm9ybScpLnJlc2V0KCk7XG5cdFx0dG9kb0RpYWxvZy5zaG93TW9kYWwoKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlhbG9nLWFkZC10b2RvIC5saXN0LW5hbWUnKS5pbm5lclRleHQgPSBnZXRBY3RpdmVMaXN0KE51bWJlcih0b2RvQ29udGFpbmVyLmRhdGFzZXQubGlzdElkKSkubmFtZTtcblx0fSk7XG59XG5cbi8vIGJ0biBhZGQgbGlzdFxuY29uc3QgYnRuQWRkTGlzdCA9ICgpID0+IHtcblx0Y29uc3QgZm9ybUFkZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlhbG9nLWFkZC1saXN0IGZvcm0nKTtcblx0Zm9ybUFkZExpc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCkgPT4ge1xuXHRcdGFkZExpc3QobmV3IEZvcm1EYXRhKGZvcm1BZGRMaXN0KSk7XG5cdH0pXG59XG5cbi8vIGJ0biBkZWxldGUgbGlzdFxuY29uc3QgYnRuRGVsZXRlTGlzdCA9ICgpID0+IHtcblx0Y29uc3QgYnRuTGlzdERlbGV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcyAuZGVsZXRlJyk7XG5cdGJ0bkxpc3REZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVMaXN0KTtcbn1cblxuLy8gYnRuIGFkZCB0b2RvXG5jb25zdCBidG5BZGRUb2RvID0gKCkgPT4ge1xuXHRjb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zJyk7XG5cdGNvbnN0IGZvcm1BZGRUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpYWxvZy1hZGQtdG9kbyBmb3JtJyk7XG5cdGZvcm1BZGRUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsICgpID0+IHtcblx0XHRhZGRUb2RvKG5ldyBGb3JtRGF0YShmb3JtQWRkVG9kbyksIE51bWJlcih0b2RvQ29udGFpbmVyLmRhdGFzZXQubGlzdElkKSk7XG5cdH0pXG59XG5cbi8vIHJlbmRlciBhbGxcbmNvbnN0IHJlbmRlckFsbCA9ICgpID0+IHtcblx0aW5pdEFsbERhdGEoKTtcblx0cmVuZGVyTGlzdHMoKTtcblx0cmVuZGVyVG9kb3MoKTtcblx0YnRuTGlzdERpYWxvZygpO1xuXHRidG5BZGRMaXN0KCk7XG5cdGJ0blRvZG9EaWFsb2coKTtcblx0YnRuQWRkVG9kbygpO1xuXHRidG5EZWxldGVMaXN0KCk7XG59XG5cblxuXG5cblxuZXhwb3J0IHsgcmVuZGVyTGlzdHMsIHJlbmRlclRvZG9zLCByZW5kZXJBbGwgfTsiLCJpbXBvcnQgeyByZW5kZXJMaXN0cywgcmVuZGVyVG9kb3MgfSBmcm9tIFwiLi9hcHBcIjtcbmltcG9ydCB7IGdldFRvZG9Db3VudCB9IGZyb20gXCIuL3RvZG9zXCI7XG5cbi8vIGluaXQgbGlzdCBkYXRhXG5jb25zdCBpbml0TGlzdERhdGEgPSAoKSA9PiB7XG5cdGNvbnN0IGlkQXJyYXkgPSBuZXcgVWludDMyQXJyYXkoMSk7XG5cdGNvbnN0IGlkID0gc2VsZi5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGlkQXJyYXkpWzBdO1xuXHRjb25zdCBfZmlyc3RMaXN0ID0gW3tcblx0XHRpZCxcblx0XHRuYW1lOiAnTXkgTGlzdCcsXG5cdFx0Y29sb3I6ICcjMDAwJ1xuXHR9XTtcblx0c2F2ZUxpc3RzKF9maXJzdExpc3QpO1xufVxuXG4vLyBnZXQgbGlzdHMgZnJvbSBsb2NhbCBzdG9yYWdlXG5jb25zdCBnZXRMaXN0cyA9ICgpID0+IHtcblx0Y29uc3QgYWxsTGlzdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaXN0cycpKTtcblx0cmV0dXJuIGFsbExpc3RzO1xufVxuXG4vLyBzYXZlIGFjdGl2ZSBsaXN0IElEXG5jb25zdCBzZXRBY3RpdmVMaXN0SWQgPSAobGlzdElkKSA9PiB7XG5cdGlmIChsaXN0SWQpIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWN0aXZlTGlzdCcsIGxpc3RJZCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgZmlyc3RMaXN0SWQgPSBnZXRMaXN0cygpWzBdLmlkO1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY3RpdmVMaXN0JywgZmlyc3RMaXN0SWQpO1xuXHR9XG59XG5cbi8vIGdldCBBY3RpdmUgbGlzdCBJRFxuY29uc3QgZ2V0QWN0aXZlTGlzdElkID0gKCkgPT4ge1xuXHRyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjdGl2ZUxpc3QnKTtcbn1cblxuLy8gZ2V0IGFjdGl2ZSBsaXN0XG5jb25zdCBnZXRBY3RpdmVMaXN0ID0gKGxpc3RJZCkgPT4ge1xuXHRjb25zdCBhbGxMaXN0cyA9IGdldExpc3RzKCk7XG5cdHJldHVybiBhbGxMaXN0cy5maW5kKGxpc3QgPT4gbGlzdC5pZCA9PT0gTnVtYmVyKGxpc3RJZCkpO1xufVxuXG4vLyBzYXZlIGxpc3RzIHRvIGxvY2FsIHN0b3JhZ2VcbmNvbnN0IHNhdmVMaXN0cyA9IChsaXN0RGF0YSkgPT4ge1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdHMnLCBKU09OLnN0cmluZ2lmeShsaXN0RGF0YSkpO1xufVxuXG4vLyBsaXN0IGZhY3RvcnlcbmNvbnN0IExpc3QgPSAobmFtZSwgY29sb3IpID0+IHtcblx0Y29uc3Qgc2F2ZUxpc3QgPSAoKSA9PiB7XG5cdFx0bGV0IHNhdmVkTGlzdHMgPSBnZXRMaXN0cygpO1xuXHRcdGNvbnN0IGlkQXJyYXkgPSBuZXcgVWludDMyQXJyYXkoMSk7XG5cdFx0Y29uc3QgaWQgPSBzZWxmLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoaWRBcnJheSlbMF07XG5cdFx0Y29uc3QgbmV3TGlzdCA9IHtpZCwgbmFtZSwgY29sb3J9O1xuXHRcdHNhdmVkTGlzdHMucHVzaChuZXdMaXN0KTtcblx0XHRzYXZlTGlzdHMoc2F2ZWRMaXN0cyk7XG5cdFx0c2V0QWN0aXZlTGlzdElkKGlkKTtcblx0XHRyZW5kZXJMaXN0cygpO1xuXHRcdHJlbmRlclRvZG9zKCk7XG5cdFx0XG5cdH1cblx0cmV0dXJuIHtzYXZlTGlzdH07XG59XG5cbi8vIGFkZCBsaXN0XG5jb25zdCBhZGRMaXN0ID0gKGZvcm1EYXRhT2JqZWN0KSA9PiB7XG5cdGNvbnN0IG5ld0xpc3QgPSBMaXN0KGZvcm1EYXRhT2JqZWN0LmdldCgnbmFtZScpLCBmb3JtRGF0YU9iamVjdC5nZXQoJ2NvbG9yJykpO1xuXHRuZXdMaXN0LnNhdmVMaXN0KCk7XG59XG5cbi8vIGRlbGV0ZSBsaXN0XG5jb25zdCBkZWxldGVMaXN0ID0gKCkgPT4ge1xuXHRsZXQgdGhpc0lkID0gTnVtYmVyKGdldEFjdGl2ZUxpc3RJZCgpKTtcblx0aWYgKGdldFRvZG9Db3VudCh0aGlzSWQpID4gMCkge1xuXHRcdGNvbnNvbGUubG9nKCdsaXN0IG5vdCBlbXB0eScpO1xuXHR9IGVsc2Uge1xuXHRcdGxldCBzYXZlZExpc3RzID0gZ2V0TGlzdHMoKTtcblx0XHRjb25zdCB0aGlzSW5kZXggPSBzYXZlZExpc3RzLmZpbmRJbmRleChsaXN0ID0+IGxpc3QuaWQgPT09IHRoaXNJZCk7XG5cdFx0c2F2ZWRMaXN0cy5zcGxpY2UodGhpc0luZGV4LCAxKTtcblx0XHRzYXZlTGlzdHMoc2F2ZWRMaXN0cyk7XG5cdFx0cmVuZGVyTGlzdHMoKTtcblx0XHRzZXRBY3RpdmVMaXN0SWQoKTtcblx0XHRyZW5kZXJUb2RvcygpO1xuXHR9XG59XG5cblxuZXhwb3J0IHsgaW5pdExpc3REYXRhLCBnZXRMaXN0cywgYWRkTGlzdCwgZ2V0QWN0aXZlTGlzdCwgZ2V0QWN0aXZlTGlzdElkLCBzZXRBY3RpdmVMaXN0SWQsIGRlbGV0ZUxpc3QgfTsiLCJpbXBvcnQgeyByZW5kZXJUb2RvcyB9IGZyb20gXCIuL2FwcFwiO1xuXG4vLyBpbml0IHRvZG8gZGF0YVxuY29uc3QgaW5pdFRvZG9EYXRhID0gKCkgPT4ge1xuXHRjb25zdCBfZmlyc3RUb2RvID0gW107XG5cdHNhdmVUb2RvcyhfZmlyc3RUb2RvKTtcbn1cblxuLy8gZ2V0IHRvZG9zIGZyb20gbG9jYWxcbmNvbnN0IGdldFRvZG9zID0gKGxpc3RJZCkgPT4ge1xuXHRjb25zdCBhbGxUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xuXHRpZiAoIWxpc3RJZCB8fCBsaXN0SWQgPT09ICdhbGwnKSB7XG5cdFx0cmV0dXJuIGFsbFRvZG9zO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBhbGxUb2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmxpc3RJZCA9PT0gbGlzdElkKTtcblx0fVxufVxuXG4vLyBzYXZlIHRvZG9zIHRvIGxvY2FsXG5jb25zdCBzYXZlVG9kb3MgPSAodG9kb0RhdGEpID0+IHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb0RhdGEpKTtcbn1cblxuLy8gdG9kbyBmYWN0b3J5XG5jb25zdCBUb2RvID0gKGxpc3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBkdWVUaW1lLCBwcmlvcml0eSwgbm90ZXMsIGNvbXBsZXRlZCkgPT4ge1xuXHRjb25zdCBzYXZlVG9kbyA9ICgpID0+IHtcblx0XHRsZXQgc2F2ZWRUb2RvcyA9IGdldFRvZG9zKCdhbGwnKTtcblx0XHRjb25zdCBpZEFycmF5ID0gbmV3IFVpbnQzMkFycmF5KDEpO1xuXHRcdGNvbnN0IGlkID0gc2VsZi5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGlkQXJyYXkpWzBdO1xuXHRcdGNvbnN0IG5ld1RvZG8gPSB7aWQsIGxpc3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBkdWVUaW1lLCBwcmlvcml0eSwgbm90ZXMsIGNvbXBsZXRlZDogZmFsc2V9O1xuXHRcdHNhdmVkVG9kb3MucHVzaChuZXdUb2RvKTtcblx0XHRzYXZlVG9kb3Moc2F2ZWRUb2Rvcyk7XG5cdFx0cmVuZGVyVG9kb3MobGlzdElkKTtcblx0fVxuXHRyZXR1cm4ge3NhdmVUb2RvfTtcbn1cblxuLy8gYWRkIHRvZG9cbmNvbnN0IGFkZFRvZG8gPSAoZm9ybURhdGFPYmplY3QsIGxpc3RJZCkgPT4ge1xuXHRjb25zdCBuZXdUb2RvID0gVG9kbyhcblx0XHRsaXN0SWQsXG5cdFx0Zm9ybURhdGFPYmplY3QuZ2V0KCd0aXRsZScpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgnZGVzY3JpcHRpb24nKSxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ2R1ZURhdGUnKSxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ2R1ZVRpbWUnKSxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ3ByaW9yaXR5JyksXG5cdFx0Zm9ybURhdGFPYmplY3QuZ2V0KCdub3RlcycpXG5cdCk7XG5cdG5ld1RvZG8uc2F2ZVRvZG8oKTtcbn1cblxuLy8gZ2V0IHRvZG8gY291bnQgcGVyIGxpc3RcbmNvbnN0IGdldFRvZG9Db3VudCA9IChsaXN0SWQpID0+IHtcblx0cmV0dXJuIGdldFRvZG9zKGxpc3RJZCkubGVuZ3RoO1xufVxuXG4vLyBjb21wbGV0ZSB0b2RvXG5jb25zdCBjb21wbGV0ZVRvZG8gPSAoZSkgPT4ge1xuXHRjb25zdCB0aGlzSWQgPSBOdW1iZXIoZS50YXJnZXQuY2xvc2VzdCgnbGknKS5kYXRhc2V0LmlkKTtcblx0bGV0IHNhdmVkVG9kb3MgPSBnZXRUb2RvcygpO1xuXHRjb25zdCB0aGlzVG9kbyA9IHNhdmVkVG9kb3MuZmluZEluZGV4KHRvZG8gPT4gdG9kby5pZCA9PT0gdGhpc0lkKTtcblx0c2F2ZWRUb2Rvc1t0aGlzVG9kb10uY29tcGxldGVkID0gZS50YXJnZXQuY2hlY2tlZDtcblx0c2F2ZVRvZG9zKHNhdmVkVG9kb3MpO1xuXHRyZW5kZXJUb2RvcygpO1xufVxuXG4vLyBkZWxldGUgdG9kb1xuY29uc3QgZGVsZXRlVG9kbyA9IChlKSA9PiB7XG5cdGNvbnN0IHRoaXNJZCA9IE51bWJlcihlLnRhcmdldC5jbG9zZXN0KCdsaScpLmRhdGFzZXQuaWQpO1xuXHRsZXQgc2F2ZWRUb2RvcyA9IGdldFRvZG9zKCk7XG5cdGNvbnN0IHRoaXNUb2RvID0gc2F2ZWRUb2Rvcy5maW5kSW5kZXgodG9kbyA9PiB0b2RvLmlkID09PSB0aGlzSWQpO1xuXHRzYXZlZFRvZG9zLnNwbGljZSh0aGlzVG9kbywgMSk7XG5cdHNhdmVUb2RvcyhzYXZlZFRvZG9zKTtcblx0cmVuZGVyVG9kb3MoKTtcbn1cblxuXG5leHBvcnQgeyBpbml0VG9kb0RhdGEsIGdldFRvZG9zLCBhZGRUb2RvLCBnZXRUb2RvQ291bnQsIGRlbGV0ZVRvZG8sIGNvbXBsZXRlVG9kbyB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyQWxsIH0gZnJvbSAnLi9hcHAnO1xuXG5yZW5kZXJBbGwoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==