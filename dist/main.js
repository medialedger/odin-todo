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
		listHtml += `<li><button data-id="${list.id}" data-color="${list.color}">${list.name}</button></li>`;
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

// render active list
const renderActiveList = () => {
	const activeListId = (0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getActiveListId)();
	const listHeader = document.querySelector('.todos h2');
	listHeader.innerText = (0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getActiveList)(activeListId).name;
}

// render todos
const renderTodos = () => {
	const activeListId = Number((0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getActiveListId)());
	document.querySelector('.todos').dataset.listId = activeListId;
	const todoContainer = document.querySelector('.todos ul');
	let todoHtml = '';
	const todoData = (0,_todos__WEBPACK_IMPORTED_MODULE_1__.getTodos)(activeListId);
	if (todoData.length > 0) {
		todoData.forEach(todo => {
			todoHtml += `<li data-id="${todo.id}">${todo.title}</li>`;
		})
		todoContainer.innerHTML = todoHtml;
	} else {
		todoContainer.innerHTML = '<li>No ToDos yet!</li>';
	}
	renderActiveList(activeListId);
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

// add list
const btnAddList = () => {
	const formAddList = document.querySelector('#dialog-add-list form');
	formAddList.addEventListener('submit', () => {
		(0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.addList)(new FormData(formAddList));
	})
}

// add todo
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
	renderActiveList();
	btnListDialog();
	btnAddList();
	btnTodoDialog();
	btnAddTodo();
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
/* harmony export */   "getActiveList": () => (/* binding */ getActiveList),
/* harmony export */   "getActiveListId": () => (/* binding */ getActiveListId),
/* harmony export */   "getLists": () => (/* binding */ getLists),
/* harmony export */   "initListData": () => (/* binding */ initListData),
/* harmony export */   "setActiveListId": () => (/* binding */ setActiveListId)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


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




/***/ }),

/***/ "./src/todos.js":
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTodo": () => (/* binding */ addTodo),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtDOztBQUVsQywrQ0FBUyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL2xpc3RzLmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy90b2Rvcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdExpc3REYXRhLCBnZXRMaXN0cywgYWRkTGlzdCwgZ2V0QWN0aXZlTGlzdCwgZ2V0QWN0aXZlTGlzdElkLCBzZXRBY3RpdmVMaXN0SWQgfSBmcm9tICcuL2xpc3RzLmpzJztcbmltcG9ydCB7IGluaXRUb2RvRGF0YSwgZ2V0VG9kb3MsIGFkZFRvZG8gfSBmcm9tICcuL3RvZG9zJztcblxuXG4vLyBpbml0aWF0ZSBkYXRhXG5jb25zdCBpbml0QWxsRGF0YSA9ICgpID0+IHtcblx0aWYgKCFnZXRMaXN0cygpKSB7XG5cdFx0aW5pdExpc3REYXRhKCk7XG5cdH1cblx0aWYgKCFnZXRUb2RvcygpKSB7XG5cdFx0aW5pdFRvZG9EYXRhKCk7XG5cdH1cblx0aWYgKCFnZXRBY3RpdmVMaXN0SWQoKSkge1xuXHRcdHNldEFjdGl2ZUxpc3RJZCgpO1xuXHR9XG59XG5cbi8vIHJlbmRlciBsaXN0c1xuY29uc3QgcmVuZGVyTGlzdHMgPSAoKSA9PiB7XG5cdGNvbnN0IGxpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdHMnKTtcblx0Y29uc3QgbGlzdERhdGEgPSBnZXRMaXN0cygpO1xuXHRsZXQgbGlzdEh0bWwgPSAnJztcblx0bGlzdERhdGEuZm9yRWFjaChsaXN0ID0+IHtcblx0XHRsaXN0SHRtbCArPSBgPGxpPjxidXR0b24gZGF0YS1pZD1cIiR7bGlzdC5pZH1cIiBkYXRhLWNvbG9yPVwiJHtsaXN0LmNvbG9yfVwiPiR7bGlzdC5uYW1lfTwvYnV0dG9uPjwvbGk+YDtcblx0fSlcblx0bGlzdENvbnRhaW5lci5pbm5lckhUTUwgPSBsaXN0SHRtbDtcblx0Y29uc3QgYWxsTGlzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdHMgYnV0dG9uJyk7XG5cdGFsbExpc3RCdXR0b25zLmZvckVhY2goYnRuID0+IHtcblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0Y29uc3QgdGhpc0lkID0gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaWQpO1xuXHRcdFx0c2V0QWN0aXZlTGlzdElkKHRoaXNJZCk7XG5cdFx0XHRyZW5kZXJUb2Rvcyh0aGlzSWQpO1xuXHRcdH0pO1xuXHR9KVxufVxuXG4vLyByZW5kZXIgYWN0aXZlIGxpc3RcbmNvbnN0IHJlbmRlckFjdGl2ZUxpc3QgPSAoKSA9PiB7XG5cdGNvbnN0IGFjdGl2ZUxpc3RJZCA9IGdldEFjdGl2ZUxpc3RJZCgpO1xuXHRjb25zdCBsaXN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zIGgyJyk7XG5cdGxpc3RIZWFkZXIuaW5uZXJUZXh0ID0gZ2V0QWN0aXZlTGlzdChhY3RpdmVMaXN0SWQpLm5hbWU7XG59XG5cbi8vIHJlbmRlciB0b2Rvc1xuY29uc3QgcmVuZGVyVG9kb3MgPSAoKSA9PiB7XG5cdGNvbnN0IGFjdGl2ZUxpc3RJZCA9IE51bWJlcihnZXRBY3RpdmVMaXN0SWQoKSk7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpLmRhdGFzZXQubGlzdElkID0gYWN0aXZlTGlzdElkO1xuXHRjb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zIHVsJyk7XG5cdGxldCB0b2RvSHRtbCA9ICcnO1xuXHRjb25zdCB0b2RvRGF0YSA9IGdldFRvZG9zKGFjdGl2ZUxpc3RJZCk7XG5cdGlmICh0b2RvRGF0YS5sZW5ndGggPiAwKSB7XG5cdFx0dG9kb0RhdGEuZm9yRWFjaCh0b2RvID0+IHtcblx0XHRcdHRvZG9IdG1sICs9IGA8bGkgZGF0YS1pZD1cIiR7dG9kby5pZH1cIj4ke3RvZG8udGl0bGV9PC9saT5gO1xuXHRcdH0pXG5cdFx0dG9kb0NvbnRhaW5lci5pbm5lckhUTUwgPSB0b2RvSHRtbDtcblx0fSBlbHNlIHtcblx0XHR0b2RvQ29udGFpbmVyLmlubmVySFRNTCA9ICc8bGk+Tm8gVG9Eb3MgeWV0ITwvbGk+Jztcblx0fVxuXHRyZW5kZXJBY3RpdmVMaXN0KGFjdGl2ZUxpc3RJZCk7XG59XG5cbi8vIGxpc3QgZGlhbG9nIGJ1dHRvblxuY29uc3QgYnRuTGlzdERpYWxvZyA9ICgpID0+IHtcblx0Y29uc3QgYnRuTGlzdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tYWRkLWxpc3QnKTtcblx0Y29uc3QgbGlzdERpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2ctYWRkLWxpc3QnKTtcblx0YnRuTGlzdERpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRsaXN0RGlhbG9nLnNob3dNb2RhbCgpO1xuXHR9KTtcbn1cblxuLy8gdG9kbyBkaWFsb2cgYnV0dG9uXG5jb25zdCBidG5Ub2RvRGlhbG9nID0gKCkgPT4ge1xuXHRjb25zdCBidG5Ub2RvRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1hZGQtdG9kbycpO1xuXHRjb25zdCB0b2RvRGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZy1hZGQtdG9kbycpO1xuXHRjb25zdCB0b2RvQ29udGFpbmVyID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MnKTtcblx0YnRuVG9kb0RpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0b2RvRGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2ctYWRkLXRvZG8gLmxpc3QtbmFtZScpLmlubmVyVGV4dCA9IGdldEFjdGl2ZUxpc3QoTnVtYmVyKHRvZG9Db250YWluZXIuZGF0YXNldC5saXN0SWQpKS5uYW1lO1xuXHR9KTtcbn1cblxuLy8gYWRkIGxpc3RcbmNvbnN0IGJ0bkFkZExpc3QgPSAoKSA9PiB7XG5cdGNvbnN0IGZvcm1BZGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpYWxvZy1hZGQtbGlzdCBmb3JtJyk7XG5cdGZvcm1BZGRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsICgpID0+IHtcblx0XHRhZGRMaXN0KG5ldyBGb3JtRGF0YShmb3JtQWRkTGlzdCkpO1xuXHR9KVxufVxuXG4vLyBhZGQgdG9kb1xuY29uc3QgYnRuQWRkVG9kbyA9ICgpID0+IHtcblx0Y29uc3QgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpO1xuXHRjb25zdCBmb3JtQWRkVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2ctYWRkLXRvZG8gZm9ybScpO1xuXHRmb3JtQWRkVG9kby5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoKSA9PiB7XG5cdFx0YWRkVG9kbyhuZXcgRm9ybURhdGEoZm9ybUFkZFRvZG8pLCBOdW1iZXIodG9kb0NvbnRhaW5lci5kYXRhc2V0Lmxpc3RJZCkpO1xuXHR9KVxufVxuXG4vLyByZW5kZXIgYWxsXG5jb25zdCByZW5kZXJBbGwgPSAoKSA9PiB7XG5cdGluaXRBbGxEYXRhKCk7XG5cdHJlbmRlckxpc3RzKCk7XG5cdHJlbmRlclRvZG9zKCk7XG5cdHJlbmRlckFjdGl2ZUxpc3QoKTtcblx0YnRuTGlzdERpYWxvZygpO1xuXHRidG5BZGRMaXN0KCk7XG5cdGJ0blRvZG9EaWFsb2coKTtcblx0YnRuQWRkVG9kbygpO1xufVxuXG5cblxuXG5cbmV4cG9ydCB7IHJlbmRlckxpc3RzLCByZW5kZXJUb2RvcywgcmVuZGVyQWxsIH07IiwiaW1wb3J0IHsgcmVuZGVyTGlzdHMsIHJlbmRlclRvZG9zIH0gZnJvbSBcIi4vYXBwXCI7XG5cbi8vIGluaXQgbGlzdCBkYXRhXG5jb25zdCBpbml0TGlzdERhdGEgPSAoKSA9PiB7XG5cdGNvbnN0IGlkQXJyYXkgPSBuZXcgVWludDMyQXJyYXkoMSk7XG5cdGNvbnN0IGlkID0gc2VsZi5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGlkQXJyYXkpWzBdO1xuXHRjb25zdCBfZmlyc3RMaXN0ID0gW3tcblx0XHRpZCxcblx0XHRuYW1lOiAnTXkgTGlzdCcsXG5cdFx0Y29sb3I6ICcjMDAwJ1xuXHR9XTtcblx0c2F2ZUxpc3RzKF9maXJzdExpc3QpO1xufVxuXG4vLyBnZXQgbGlzdHMgZnJvbSBsb2NhbCBzdG9yYWdlXG5jb25zdCBnZXRMaXN0cyA9ICgpID0+IHtcblx0Y29uc3QgYWxsTGlzdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaXN0cycpKTtcblx0cmV0dXJuIGFsbExpc3RzO1xufVxuXG4vLyBzYXZlIGFjdGl2ZSBsaXN0IElEXG5jb25zdCBzZXRBY3RpdmVMaXN0SWQgPSAobGlzdElkKSA9PiB7XG5cdGlmIChsaXN0SWQpIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWN0aXZlTGlzdCcsIGxpc3RJZCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgZmlyc3RMaXN0SWQgPSBnZXRMaXN0cygpWzBdLmlkO1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY3RpdmVMaXN0JywgZmlyc3RMaXN0SWQpO1xuXHR9XG59XG5cbi8vIGdldCBBY3RpdmUgbGlzdCBJRFxuY29uc3QgZ2V0QWN0aXZlTGlzdElkID0gKCkgPT4ge1xuXHRyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjdGl2ZUxpc3QnKTtcbn1cblxuLy8gZ2V0IGFjdGl2ZSBsaXN0XG5jb25zdCBnZXRBY3RpdmVMaXN0ID0gKGxpc3RJZCkgPT4ge1xuXHRjb25zdCBhbGxMaXN0cyA9IGdldExpc3RzKCk7XG5cdHJldHVybiBhbGxMaXN0cy5maW5kKGxpc3QgPT4gbGlzdC5pZCA9PT0gTnVtYmVyKGxpc3RJZCkpO1xufVxuXG4vLyBzYXZlIGxpc3RzIHRvIGxvY2FsIHN0b3JhZ2VcbmNvbnN0IHNhdmVMaXN0cyA9IChsaXN0RGF0YSkgPT4ge1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdHMnLCBKU09OLnN0cmluZ2lmeShsaXN0RGF0YSkpO1xufVxuXG4vLyBsaXN0IGZhY3RvcnlcbmNvbnN0IExpc3QgPSAobmFtZSwgY29sb3IpID0+IHtcblx0Y29uc3Qgc2F2ZUxpc3QgPSAoKSA9PiB7XG5cdFx0bGV0IHNhdmVkTGlzdHMgPSBnZXRMaXN0cygpO1xuXHRcdGNvbnN0IGlkQXJyYXkgPSBuZXcgVWludDMyQXJyYXkoMSk7XG5cdFx0Y29uc3QgaWQgPSBzZWxmLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoaWRBcnJheSlbMF07XG5cdFx0Y29uc3QgbmV3TGlzdCA9IHtpZCwgbmFtZSwgY29sb3J9O1xuXHRcdHNhdmVkTGlzdHMucHVzaChuZXdMaXN0KTtcblx0XHRzYXZlTGlzdHMoc2F2ZWRMaXN0cyk7XG5cdFx0c2V0QWN0aXZlTGlzdElkKGlkKTtcblx0XHRyZW5kZXJMaXN0cygpO1xuXHRcdHJlbmRlclRvZG9zKCk7XG5cdFx0XG5cdH1cblx0cmV0dXJuIHtzYXZlTGlzdH07XG59XG5cbi8vIGFkZCBsaXN0XG5jb25zdCBhZGRMaXN0ID0gKGZvcm1EYXRhT2JqZWN0KSA9PiB7XG5cdGNvbnN0IG5ld0xpc3QgPSBMaXN0KGZvcm1EYXRhT2JqZWN0LmdldCgnbmFtZScpLCBmb3JtRGF0YU9iamVjdC5nZXQoJ2NvbG9yJykpO1xuXHRuZXdMaXN0LnNhdmVMaXN0KCk7XG59XG5cblxuZXhwb3J0IHsgaW5pdExpc3REYXRhLCBnZXRMaXN0cywgYWRkTGlzdCwgZ2V0QWN0aXZlTGlzdCwgZ2V0QWN0aXZlTGlzdElkLCBzZXRBY3RpdmVMaXN0SWQgfTsiLCJpbXBvcnQgeyByZW5kZXJUb2RvcyB9IGZyb20gXCIuL2FwcFwiO1xuXG4vLyBpbml0IHRvZG8gZGF0YVxuY29uc3QgaW5pdFRvZG9EYXRhID0gKCkgPT4ge1xuXHRjb25zdCBfZmlyc3RUb2RvID0gW107XG5cdHNhdmVUb2RvcyhfZmlyc3RUb2RvKTtcbn1cblxuLy8gZ2V0IHRvZG9zIGZyb20gbG9jYWxcbmNvbnN0IGdldFRvZG9zID0gKGxpc3RJZCkgPT4ge1xuXHRjb25zdCBhbGxUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpO1xuXHRpZiAoIWxpc3RJZCB8fCBsaXN0SWQgPT09ICdhbGwnKSB7XG5cdFx0cmV0dXJuIGFsbFRvZG9zO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBhbGxUb2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmxpc3RJZCA9PT0gbGlzdElkKTtcblx0fVxufVxuXG4vLyBzYXZlIHRvZG9zIHRvIGxvY2FsXG5jb25zdCBzYXZlVG9kb3MgPSAodG9kb0RhdGEpID0+IHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb0RhdGEpKTtcbn1cblxuLy8gdG9kbyBmYWN0b3J5XG5jb25zdCBUb2RvID0gKGxpc3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBkdWVUaW1lLCBwcmlvcml0eSwgbm90ZXMpID0+IHtcblx0Y29uc3Qgc2F2ZVRvZG8gPSAoKSA9PiB7XG5cdFx0bGV0IHNhdmVkVG9kb3MgPSBnZXRUb2RvcygnYWxsJyk7XG5cdFx0aWYgKHNhdmVkVG9kb3MubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgaWRBcnJheSA9IG5ldyBVaW50MzJBcnJheSgxKTtcblx0XHRcdGNvbnN0IGlkID0gc2VsZi5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGlkQXJyYXkpWzBdO1xuXHRcdFx0Y29uc3QgbmV3VG9kbyA9IHtpZCwgbGlzdElkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGR1ZVRpbWUsIHByaW9yaXR5LCBub3Rlc307XG5cdFx0XHRzYXZlZFRvZG9zLnB1c2gobmV3VG9kbyk7XG5cdFx0XHRzYXZlVG9kb3Moc2F2ZWRUb2Rvcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGlkQXJyYXkgPSBuZXcgVWludDMyQXJyYXkoMSk7XG5cdFx0XHRjb25zdCBpZCA9IHNlbGYuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhpZEFycmF5KVswXTtcblx0XHRcdGNvbnN0IGZpcnN0VG9kbyA9IFt7aWQsIGxpc3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBkdWVUaW1lLCBwcmlvcml0eSwgbm90ZXN9XTtcblx0XHRcdHNhdmVUb2RvcyhmaXJzdFRvZG8pO1xuXHRcdH1cblx0XHRyZW5kZXJUb2RvcyhsaXN0SWQpO1xuXHR9XG5cdHJldHVybiB7c2F2ZVRvZG99O1xufVxuXG4vLyBhZGQgdG9kb1xuY29uc3QgYWRkVG9kbyA9IChmb3JtRGF0YU9iamVjdCwgbGlzdElkKSA9PiB7XG5cdGNvbnN0IG5ld1RvZG8gPSBUb2RvKFxuXHRcdGxpc3RJZCxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ3RpdGxlJyksXG5cdFx0Zm9ybURhdGFPYmplY3QuZ2V0KCdkZXNjcmlwdGlvbicpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgnZHVlRGF0ZScpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgnZHVlVGltZScpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgncHJpb3JpdHknKSxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ25vdGVzJylcblx0KTtcblx0bmV3VG9kby5zYXZlVG9kbygpO1xufVxuXG5cblxuZXhwb3J0IHsgaW5pdFRvZG9EYXRhLCBnZXRUb2RvcywgYWRkVG9kbyB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyQWxsIH0gZnJvbSAnLi9hcHAnO1xuXG5yZW5kZXJBbGwoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==