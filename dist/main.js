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
		listHtml += `<li><button data-id="${list.id}">${list.name} <span class="count">[${listCount}]</span></button></li>`;
	})
	listContainer.innerHTML = listHtml;
	const allListButtons = document.querySelectorAll('.lists button');
	allListButtons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const thisId = Number(e.target.dataset.id);
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
			todoHtml += `<li data-id="${todo.id}">${todo.title}</li>`;
		})
		todoContainer.innerHTML = todoHtml;
		btnListDelete.disabled = true;
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
		const thisIndex = savedLists.findIndex(list => list.id ===thisId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7O0FBRWxDLCtDQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvbGlzdHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL3RvZG9zLmpzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0TGlzdERhdGEsIGdldExpc3RzLCBhZGRMaXN0LCBnZXRBY3RpdmVMaXN0LCBnZXRBY3RpdmVMaXN0SWQsIHNldEFjdGl2ZUxpc3RJZCwgZGVsZXRlTGlzdCB9IGZyb20gJy4vbGlzdHMuanMnO1xuaW1wb3J0IHsgaW5pdFRvZG9EYXRhLCBnZXRUb2RvcywgYWRkVG9kbywgZ2V0VG9kb0NvdW50IH0gZnJvbSAnLi90b2Rvcyc7XG5cblxuLy8gaW5pdGlhdGUgZGF0YVxuY29uc3QgaW5pdEFsbERhdGEgPSAoKSA9PiB7XG5cdGlmICghZ2V0TGlzdHMoKSkge1xuXHRcdGluaXRMaXN0RGF0YSgpO1xuXHR9XG5cdGlmICghZ2V0VG9kb3MoKSkge1xuXHRcdGluaXRUb2RvRGF0YSgpO1xuXHR9XG5cdGlmICghZ2V0QWN0aXZlTGlzdElkKCkpIHtcblx0XHRzZXRBY3RpdmVMaXN0SWQoKTtcblx0fVxufVxuXG4vLyByZW5kZXIgbGlzdHNcbmNvbnN0IHJlbmRlckxpc3RzID0gKCkgPT4ge1xuXHRjb25zdCBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RzJyk7XG5cdGNvbnN0IGxpc3REYXRhID0gZ2V0TGlzdHMoKTtcblx0bGV0IGxpc3RIdG1sID0gJyc7XG5cdGxpc3REYXRhLmZvckVhY2gobGlzdCA9PiB7XG5cdFx0Y29uc3QgbGlzdENvdW50ID0gZ2V0VG9kb0NvdW50KE51bWJlcihsaXN0LmlkKSk7XG5cdFx0bGlzdEh0bWwgKz0gYDxsaT48YnV0dG9uIGRhdGEtaWQ9XCIke2xpc3QuaWR9XCI+JHtsaXN0Lm5hbWV9IDxzcGFuIGNsYXNzPVwiY291bnRcIj5bJHtsaXN0Q291bnR9XTwvc3Bhbj48L2J1dHRvbj48L2xpPmA7XG5cdH0pXG5cdGxpc3RDb250YWluZXIuaW5uZXJIVE1MID0gbGlzdEh0bWw7XG5cdGNvbnN0IGFsbExpc3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RzIGJ1dHRvbicpO1xuXHRhbGxMaXN0QnV0dG9ucy5mb3JFYWNoKGJ0biA9PiB7XG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGNvbnN0IHRoaXNJZCA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmlkKTtcblx0XHRcdHNldEFjdGl2ZUxpc3RJZCh0aGlzSWQpO1xuXHRcdFx0cmVuZGVyVG9kb3ModGhpc0lkKTtcblx0XHR9KTtcblx0fSlcbn1cblxuLy8gcmVuZGVyIHRvZG9zXG5jb25zdCByZW5kZXJUb2RvcyA9ICgpID0+IHtcblx0Y29uc3QgYWN0aXZlTGlzdElkID0gTnVtYmVyKGdldEFjdGl2ZUxpc3RJZCgpKTtcblx0Ly8gY29udGFpbmVyIGlkXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpLmRhdGFzZXQubGlzdElkID0gYWN0aXZlTGlzdElkO1xuXHQvLyBoZWFkZXJcblx0Y29uc3QgbGlzdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXRpdGxlJyk7XG5cdGNvbnN0IGJ0bkxpc3REZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MgLmRlbGV0ZScpO1xuXHRsaXN0SGVhZGVyLmlubmVyVGV4dCA9IGdldEFjdGl2ZUxpc3QoYWN0aXZlTGlzdElkKS5uYW1lO1xuXHQvLyB0b2Rvc1xuXHRjb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zIHVsJyk7XG5cdGxldCB0b2RvSHRtbCA9ICcnO1xuXHRjb25zdCB0b2RvRGF0YSA9IGdldFRvZG9zKGFjdGl2ZUxpc3RJZCk7XG5cdGlmICh0b2RvRGF0YS5sZW5ndGggPiAwKSB7XG5cdFx0dG9kb0RhdGEuZm9yRWFjaCh0b2RvID0+IHtcblx0XHRcdHRvZG9IdG1sICs9IGA8bGkgZGF0YS1pZD1cIiR7dG9kby5pZH1cIj4ke3RvZG8udGl0bGV9PC9saT5gO1xuXHRcdH0pXG5cdFx0dG9kb0NvbnRhaW5lci5pbm5lckhUTUwgPSB0b2RvSHRtbDtcblx0XHRidG5MaXN0RGVsZXRlLmRpc2FibGVkID0gdHJ1ZTtcblx0fSBlbHNlIHtcblx0XHR0b2RvQ29udGFpbmVyLmlubmVySFRNTCA9ICc8bGk+Tm8gVG9Eb3MgeWV0ITwvbGk+Jztcblx0XHRidG5MaXN0RGVsZXRlLmRpc2FibGVkID0gZmFsc2U7XG5cdH1cbn1cblxuLy8gbGlzdCBkaWFsb2cgYnV0dG9uXG5jb25zdCBidG5MaXN0RGlhbG9nID0gKCkgPT4ge1xuXHRjb25zdCBidG5MaXN0RGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1hZGQtbGlzdCcpO1xuXHRjb25zdCBsaXN0RGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZy1hZGQtbGlzdCcpO1xuXHRidG5MaXN0RGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdGxpc3REaWFsb2cuc2hvd01vZGFsKCk7XG5cdH0pO1xufVxuXG4vLyB0b2RvIGRpYWxvZyBidXR0b25cbmNvbnN0IGJ0blRvZG9EaWFsb2cgPSAoKSA9PiB7XG5cdGNvbnN0IGJ0blRvZG9EaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWFkZC10b2RvJyk7XG5cdGNvbnN0IHRvZG9EaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nLWFkZC10b2RvJyk7XG5cdGNvbnN0IHRvZG9Db250YWluZXIgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpO1xuXHRidG5Ub2RvRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdHRvZG9EaWFsb2cuc2hvd01vZGFsKCk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpYWxvZy1hZGQtdG9kbyAubGlzdC1uYW1lJykuaW5uZXJUZXh0ID0gZ2V0QWN0aXZlTGlzdChOdW1iZXIodG9kb0NvbnRhaW5lci5kYXRhc2V0Lmxpc3RJZCkpLm5hbWU7XG5cdH0pO1xufVxuXG4vLyBidG4gYWRkIGxpc3RcbmNvbnN0IGJ0bkFkZExpc3QgPSAoKSA9PiB7XG5cdGNvbnN0IGZvcm1BZGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpYWxvZy1hZGQtbGlzdCBmb3JtJyk7XG5cdGZvcm1BZGRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsICgpID0+IHtcblx0XHRhZGRMaXN0KG5ldyBGb3JtRGF0YShmb3JtQWRkTGlzdCkpO1xuXHR9KVxufVxuXG4vLyBidG4gZGVsZXRlIGxpc3RcbmNvbnN0IGJ0bkRlbGV0ZUxpc3QgPSAoKSA9PiB7XG5cdGNvbnN0IGJ0bkxpc3REZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MgLmRlbGV0ZScpO1xuXHRidG5MaXN0RGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlTGlzdCk7XG59XG5cbi8vIGJ0biBhZGQgdG9kb1xuY29uc3QgYnRuQWRkVG9kbyA9ICgpID0+IHtcblx0Y29uc3QgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpO1xuXHRjb25zdCBmb3JtQWRkVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2ctYWRkLXRvZG8gZm9ybScpO1xuXHRmb3JtQWRkVG9kby5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoKSA9PiB7XG5cdFx0YWRkVG9kbyhuZXcgRm9ybURhdGEoZm9ybUFkZFRvZG8pLCBOdW1iZXIodG9kb0NvbnRhaW5lci5kYXRhc2V0Lmxpc3RJZCkpO1xuXHR9KVxufVxuXG4vLyByZW5kZXIgYWxsXG5jb25zdCByZW5kZXJBbGwgPSAoKSA9PiB7XG5cdGluaXRBbGxEYXRhKCk7XG5cdHJlbmRlckxpc3RzKCk7XG5cdHJlbmRlclRvZG9zKCk7XG5cdGJ0bkxpc3REaWFsb2coKTtcblx0YnRuQWRkTGlzdCgpO1xuXHRidG5Ub2RvRGlhbG9nKCk7XG5cdGJ0bkFkZFRvZG8oKTtcblx0YnRuRGVsZXRlTGlzdCgpO1xufVxuXG5cblxuXG5cbmV4cG9ydCB7IHJlbmRlckxpc3RzLCByZW5kZXJUb2RvcywgcmVuZGVyQWxsIH07IiwiaW1wb3J0IHsgcmVuZGVyTGlzdHMsIHJlbmRlclRvZG9zIH0gZnJvbSBcIi4vYXBwXCI7XG5pbXBvcnQgeyBnZXRUb2RvQ291bnQgfSBmcm9tIFwiLi90b2Rvc1wiO1xuXG4vLyBpbml0IGxpc3QgZGF0YVxuY29uc3QgaW5pdExpc3REYXRhID0gKCkgPT4ge1xuXHRjb25zdCBpZEFycmF5ID0gbmV3IFVpbnQzMkFycmF5KDEpO1xuXHRjb25zdCBpZCA9IHNlbGYuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhpZEFycmF5KVswXTtcblx0Y29uc3QgX2ZpcnN0TGlzdCA9IFt7XG5cdFx0aWQsXG5cdFx0bmFtZTogJ015IExpc3QnLFxuXHRcdGNvbG9yOiAnIzAwMCdcblx0fV07XG5cdHNhdmVMaXN0cyhfZmlyc3RMaXN0KTtcbn1cblxuLy8gZ2V0IGxpc3RzIGZyb20gbG9jYWwgc3RvcmFnZVxuY29uc3QgZ2V0TGlzdHMgPSAoKSA9PiB7XG5cdGNvbnN0IGFsbExpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKSk7XG5cdHJldHVybiBhbGxMaXN0cztcbn1cblxuLy8gc2F2ZSBhY3RpdmUgbGlzdCBJRFxuY29uc3Qgc2V0QWN0aXZlTGlzdElkID0gKGxpc3RJZCkgPT4ge1xuXHRpZiAobGlzdElkKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjdGl2ZUxpc3QnLCBsaXN0SWQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGZpcnN0TGlzdElkID0gZ2V0TGlzdHMoKVswXS5pZDtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWN0aXZlTGlzdCcsIGZpcnN0TGlzdElkKTtcblx0fVxufVxuXG4vLyBnZXQgQWN0aXZlIGxpc3QgSURcbmNvbnN0IGdldEFjdGl2ZUxpc3RJZCA9ICgpID0+IHtcblx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY3RpdmVMaXN0Jyk7XG59XG5cbi8vIGdldCBhY3RpdmUgbGlzdFxuY29uc3QgZ2V0QWN0aXZlTGlzdCA9IChsaXN0SWQpID0+IHtcblx0Y29uc3QgYWxsTGlzdHMgPSBnZXRMaXN0cygpO1xuXHRyZXR1cm4gYWxsTGlzdHMuZmluZChsaXN0ID0+IGxpc3QuaWQgPT09IE51bWJlcihsaXN0SWQpKTtcbn1cblxuLy8gc2F2ZSBsaXN0cyB0byBsb2NhbCBzdG9yYWdlXG5jb25zdCBzYXZlTGlzdHMgPSAobGlzdERhdGEpID0+IHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RzJywgSlNPTi5zdHJpbmdpZnkobGlzdERhdGEpKTtcbn1cblxuLy8gbGlzdCBmYWN0b3J5XG5jb25zdCBMaXN0ID0gKG5hbWUsIGNvbG9yKSA9PiB7XG5cdGNvbnN0IHNhdmVMaXN0ID0gKCkgPT4ge1xuXHRcdGxldCBzYXZlZExpc3RzID0gZ2V0TGlzdHMoKTtcblx0XHRjb25zdCBpZEFycmF5ID0gbmV3IFVpbnQzMkFycmF5KDEpO1xuXHRcdGNvbnN0IGlkID0gc2VsZi5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGlkQXJyYXkpWzBdO1xuXHRcdGNvbnN0IG5ld0xpc3QgPSB7aWQsIG5hbWUsIGNvbG9yfTtcblx0XHRzYXZlZExpc3RzLnB1c2gobmV3TGlzdCk7XG5cdFx0c2F2ZUxpc3RzKHNhdmVkTGlzdHMpO1xuXHRcdHNldEFjdGl2ZUxpc3RJZChpZCk7XG5cdFx0cmVuZGVyTGlzdHMoKTtcblx0XHRyZW5kZXJUb2RvcygpO1xuXHRcdFxuXHR9XG5cdHJldHVybiB7c2F2ZUxpc3R9O1xufVxuXG4vLyBhZGQgbGlzdFxuY29uc3QgYWRkTGlzdCA9IChmb3JtRGF0YU9iamVjdCkgPT4ge1xuXHRjb25zdCBuZXdMaXN0ID0gTGlzdChmb3JtRGF0YU9iamVjdC5nZXQoJ25hbWUnKSwgZm9ybURhdGFPYmplY3QuZ2V0KCdjb2xvcicpKTtcblx0bmV3TGlzdC5zYXZlTGlzdCgpO1xufVxuXG4vLyBkZWxldGUgbGlzdFxuY29uc3QgZGVsZXRlTGlzdCA9ICgpID0+IHtcblx0bGV0IHRoaXNJZCA9IE51bWJlcihnZXRBY3RpdmVMaXN0SWQoKSk7XG5cdGlmIChnZXRUb2RvQ291bnQodGhpc0lkKSA+IDApIHtcblx0XHRjb25zb2xlLmxvZygnbGlzdCBub3QgZW1wdHknKTtcblx0fSBlbHNlIHtcblx0XHRsZXQgc2F2ZWRMaXN0cyA9IGdldExpc3RzKCk7XG5cdFx0Y29uc3QgdGhpc0luZGV4ID0gc2F2ZWRMaXN0cy5maW5kSW5kZXgobGlzdCA9PiBsaXN0LmlkID09PXRoaXNJZCk7XG5cdFx0c2F2ZWRMaXN0cy5zcGxpY2UodGhpc0luZGV4LCAxKTtcblx0XHRzYXZlTGlzdHMoc2F2ZWRMaXN0cyk7XG5cdFx0cmVuZGVyTGlzdHMoKTtcblx0XHRzZXRBY3RpdmVMaXN0SWQoKTtcblx0XHRyZW5kZXJUb2RvcygpO1xuXHR9XG59XG5cblxuZXhwb3J0IHsgaW5pdExpc3REYXRhLCBnZXRMaXN0cywgYWRkTGlzdCwgZ2V0QWN0aXZlTGlzdCwgZ2V0QWN0aXZlTGlzdElkLCBzZXRBY3RpdmVMaXN0SWQsIGRlbGV0ZUxpc3QgfTsiLCJpbXBvcnQgeyByZW5kZXJUb2RvcyB9IGZyb20gXCIuL2FwcFwiO1xuXG4vLyBpbml0IHRvZG8gZGF0YVxuY29uc3QgaW5pdFRvZG9EYXRhID0gKCkgPT4ge1xuXHRjb25zdCBfZmlyc3RUb2RvID0gW107XG5cdHNhdmVUb2RvcyhfZmlyc3RUb2RvKTtcbn1cblxuLy8gZ2V0IHRvZG9zIGZyb20gbG9jYWxcbmNvbnN0IGdldFRvZG9zID0gKGxpc3RJZCkgPT4ge1xuXHRjb25zdCBhbGxUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xuXHRpZiAoIWxpc3RJZCB8fCBsaXN0SWQgPT09ICdhbGwnKSB7XG5cdFx0cmV0dXJuIGFsbFRvZG9zO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBhbGxUb2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmxpc3RJZCA9PT0gbGlzdElkKTtcblx0fVxufVxuXG4vLyBzYXZlIHRvZG9zIHRvIGxvY2FsXG5jb25zdCBzYXZlVG9kb3MgPSAodG9kb0RhdGEpID0+IHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb0RhdGEpKTtcbn1cblxuLy8gdG9kbyBmYWN0b3J5XG5jb25zdCBUb2RvID0gKGxpc3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBkdWVUaW1lLCBwcmlvcml0eSwgbm90ZXMpID0+IHtcblx0Y29uc3Qgc2F2ZVRvZG8gPSAoKSA9PiB7XG5cdFx0bGV0IHNhdmVkVG9kb3MgPSBnZXRUb2RvcygnYWxsJyk7XG5cdFx0aWYgKHNhdmVkVG9kb3MubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgaWRBcnJheSA9IG5ldyBVaW50MzJBcnJheSgxKTtcblx0XHRcdGNvbnN0IGlkID0gc2VsZi5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGlkQXJyYXkpWzBdO1xuXHRcdFx0Y29uc3QgbmV3VG9kbyA9IHtpZCwgbGlzdElkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGR1ZVRpbWUsIHByaW9yaXR5LCBub3Rlc307XG5cdFx0XHRzYXZlZFRvZG9zLnB1c2gobmV3VG9kbyk7XG5cdFx0XHRzYXZlVG9kb3Moc2F2ZWRUb2Rvcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGlkQXJyYXkgPSBuZXcgVWludDMyQXJyYXkoMSk7XG5cdFx0XHRjb25zdCBpZCA9IHNlbGYuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhpZEFycmF5KVswXTtcblx0XHRcdGNvbnN0IGZpcnN0VG9kbyA9IFt7aWQsIGxpc3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBkdWVUaW1lLCBwcmlvcml0eSwgbm90ZXN9XTtcblx0XHRcdHNhdmVUb2RvcyhmaXJzdFRvZG8pO1xuXHRcdH1cblx0XHRyZW5kZXJUb2RvcyhsaXN0SWQpO1xuXHR9XG5cdHJldHVybiB7c2F2ZVRvZG99O1xufVxuXG4vLyBhZGQgdG9kb1xuY29uc3QgYWRkVG9kbyA9IChmb3JtRGF0YU9iamVjdCwgbGlzdElkKSA9PiB7XG5cdGNvbnN0IG5ld1RvZG8gPSBUb2RvKFxuXHRcdGxpc3RJZCxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ3RpdGxlJyksXG5cdFx0Zm9ybURhdGFPYmplY3QuZ2V0KCdkZXNjcmlwdGlvbicpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgnZHVlRGF0ZScpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgnZHVlVGltZScpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgncHJpb3JpdHknKSxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ25vdGVzJylcblx0KTtcblx0bmV3VG9kby5zYXZlVG9kbygpO1xufVxuXG4vLyBnZXQgdG9kbyBjb3VudCBwZXIgbGlzdFxuY29uc3QgZ2V0VG9kb0NvdW50ID0gKGxpc3RJZCkgPT4ge1xuXHRyZXR1cm4gZ2V0VG9kb3MobGlzdElkKS5sZW5ndGg7XG59XG5cbmV4cG9ydCB7IGluaXRUb2RvRGF0YSwgZ2V0VG9kb3MsIGFkZFRvZG8sIGdldFRvZG9Db3VudCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyQWxsIH0gZnJvbSAnLi9hcHAnO1xuXG5yZW5kZXJBbGwoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==