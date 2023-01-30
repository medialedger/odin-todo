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
		document.querySelector('#dialog-add-todo .list-name').innerText = (0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentList)(Number(todoContainer.dataset.listId)).name;
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
			renderTodos(Number(e.target.dataset.id));
		});
	})
}

// render active list
const renderActiveList = (listId = 1) => {
	const listHeader = document.querySelector('.todos h2');
	listHeader.innerText = (0,_lists_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentList)(listId).name;
}

// render todos
const renderTodos = (listId = 1) => {
	document.querySelector('.todos').dataset.listId = listId;
	const todoContainer = document.querySelector('.todos ul');
	let todoHtml = '';
	const todoData = (0,_todos__WEBPACK_IMPORTED_MODULE_1__.getTodos)(listId);
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







/***/ }),

/***/ "./src/lists.js":
/*!**********************!*\
  !*** ./src/lists.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addList": () => (/* binding */ addList),
/* harmony export */   "getCurrentList": () => (/* binding */ getCurrentList),
/* harmony export */   "getLists": () => (/* binding */ getLists)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


// get lists from local storage
const getLists = () => {
	const theLists = JSON.parse(localStorage.getItem('lists'));
	if (theLists) {
		return theLists;
	} else {
		const _firstList = [{
			id: 1,
			name: 'My List',
			color: '#f00'
		}];
		localStorage.setItem('lists', JSON.stringify(_firstList));
		return _firstList;
	}
}

// get current list
const getCurrentList = (listId = 1) => {
	const allLists = getLists();
	if (allLists) {
		return allLists.find(list => list.id === listId);
	}
}

// save lists to local storage
const saveLists = (listData) => {
	localStorage.setItem('lists', JSON.stringify(listData));
}

// list factory
const List = (name, color) => {
	const saveList = () => {
		let savedLists = getLists();
		const maxListID = Math.max(...savedLists.map(list => list.id));
		const newListId = maxListID + 1;
		const newList = {id: newListId, name, color};
		savedLists.push(newList);
		saveLists(savedLists);
		(0,_app__WEBPACK_IMPORTED_MODULE_0__.renderLists)();
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
/* harmony export */   "getTodos": () => (/* binding */ getTodos)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0Q7QUFDbkI7OztBQUc1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UseURBQWM7QUFDbEYsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxrREFBTztBQUNULEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSwrQ0FBTztBQUNULEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbURBQVE7QUFDMUI7QUFDQTtBQUNBLHNDQUFzQyxRQUFRLGdCQUFnQixXQUFXLElBQUksVUFBVTtBQUN2RixFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlEQUFjO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0RBQVE7QUFDMUI7QUFDQTtBQUNBLCtCQUErQixRQUFRLElBQUksV0FBVztBQUN0RCxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUZvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLEVBQUUsaURBQVc7QUFDYjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsSUFBSTtBQUNKLHVCQUF1QixxRUFBcUU7QUFDNUY7QUFDQTtBQUNBLEVBQUUsaURBQVc7QUFDYjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztVQ3REQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtDOztBQUVsQywrQ0FBUyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLy4vc3JjL2xpc3RzLmpzIiwid2VicGFjazovL29kaW4tdG9kby8uL3NyYy90b2Rvcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0TGlzdHMsIGFkZExpc3QsIGdldEN1cnJlbnRMaXN0IH0gZnJvbSAnLi9saXN0cy5qcyc7XG5pbXBvcnQgeyBnZXRUb2RvcywgYWRkVG9kbyB9IGZyb20gJy4vdG9kb3MnO1xuXG5cbi8vIGxpc3QgZGlhbG9nIGJ1dHRvblxuY29uc3QgYnRuTGlzdERpYWxvZyA9ICgpID0+IHtcblx0Y29uc3QgYnRuTGlzdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tYWRkLWxpc3QnKTtcblx0Y29uc3QgbGlzdERpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2ctYWRkLWxpc3QnKTtcblx0YnRuTGlzdERpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRsaXN0RGlhbG9nLnNob3dNb2RhbCgpO1xuXHR9KTtcbn1cblxuLy8gdG9kbyBkaWFsb2cgYnV0dG9uXG5jb25zdCBidG5Ub2RvRGlhbG9nID0gKCkgPT4ge1xuXHRjb25zdCBidG5Ub2RvRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1hZGQtdG9kbycpO1xuXHRjb25zdCB0b2RvRGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZy1hZGQtdG9kbycpO1xuXHRjb25zdCB0b2RvQ29udGFpbmVyID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MnKTtcblx0YnRuVG9kb0RpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0b2RvRGlhbG9nLnNob3dNb2RhbCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2ctYWRkLXRvZG8gLmxpc3QtbmFtZScpLmlubmVyVGV4dCA9IGdldEN1cnJlbnRMaXN0KE51bWJlcih0b2RvQ29udGFpbmVyLmRhdGFzZXQubGlzdElkKSkubmFtZTtcblx0fSk7XG59XG5cbi8vIGFkZCBsaXN0XG5jb25zdCBidG5BZGRMaXN0ID0gKCkgPT4ge1xuXHRjb25zdCBmb3JtQWRkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWFsb2ctYWRkLWxpc3QgZm9ybScpO1xuXHRmb3JtQWRkTGlzdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdChuZXcgRm9ybURhdGEoZm9ybUFkZExpc3QpKTtcblx0fSlcbn1cblxuLy8gYWRkIHRvZG9cbmNvbnN0IGJ0bkFkZFRvZG8gPSAoKSA9PiB7XG5cdGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MnKTtcblx0Y29uc3QgZm9ybUFkZFRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlhbG9nLWFkZC10b2RvIGZvcm0nKTtcblx0Zm9ybUFkZFRvZG8uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCkgPT4ge1xuXHRcdGFkZFRvZG8obmV3IEZvcm1EYXRhKGZvcm1BZGRUb2RvKSwgTnVtYmVyKHRvZG9Db250YWluZXIuZGF0YXNldC5saXN0SWQpKTtcblx0fSlcbn1cblxuLy8gcmVuZGVyIGxpc3RzXG5jb25zdCByZW5kZXJMaXN0cyA9ICgpID0+IHtcblx0Y29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0cycpO1xuXHRjb25zdCBsaXN0RGF0YSA9IGdldExpc3RzKCk7XG5cdGxldCBsaXN0SHRtbCA9ICcnO1xuXHRsaXN0RGF0YS5mb3JFYWNoKGxpc3QgPT4ge1xuXHRcdGxpc3RIdG1sICs9IGA8bGk+PGJ1dHRvbiBkYXRhLWlkPVwiJHtsaXN0LmlkfVwiIGRhdGEtY29sb3I9XCIke2xpc3QuY29sb3J9XCI+JHtsaXN0Lm5hbWV9PC9idXR0b24+PC9saT5gO1xuXHR9KVxuXHRsaXN0Q29udGFpbmVyLmlubmVySFRNTCA9IGxpc3RIdG1sO1xuXHRjb25zdCBhbGxMaXN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0cyBidXR0b24nKTtcblx0YWxsTGlzdEJ1dHRvbnMuZm9yRWFjaChidG4gPT4ge1xuXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRyZW5kZXJUb2RvcyhOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pZCkpO1xuXHRcdH0pO1xuXHR9KVxufVxuXG4vLyByZW5kZXIgYWN0aXZlIGxpc3RcbmNvbnN0IHJlbmRlckFjdGl2ZUxpc3QgPSAobGlzdElkID0gMSkgPT4ge1xuXHRjb25zdCBsaXN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zIGgyJyk7XG5cdGxpc3RIZWFkZXIuaW5uZXJUZXh0ID0gZ2V0Q3VycmVudExpc3QobGlzdElkKS5uYW1lO1xufVxuXG4vLyByZW5kZXIgdG9kb3NcbmNvbnN0IHJlbmRlclRvZG9zID0gKGxpc3RJZCA9IDEpID0+IHtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zJykuZGF0YXNldC5saXN0SWQgPSBsaXN0SWQ7XG5cdGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MgdWwnKTtcblx0bGV0IHRvZG9IdG1sID0gJyc7XG5cdGNvbnN0IHRvZG9EYXRhID0gZ2V0VG9kb3MobGlzdElkKTtcblx0aWYgKHRvZG9EYXRhLmxlbmd0aCA+IDApIHtcblx0XHR0b2RvRGF0YS5mb3JFYWNoKHRvZG8gPT4ge1xuXHRcdFx0dG9kb0h0bWwgKz0gYDxsaSBkYXRhLWlkPVwiJHt0b2RvLmlkfVwiPiR7dG9kby50aXRsZX08L2xpPmA7XG5cdFx0fSlcblx0XHR0b2RvQ29udGFpbmVyLmlubmVySFRNTCA9IHRvZG9IdG1sO1xuXHR9IGVsc2Uge1xuXHRcdHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gJzxsaT5ObyBUb0RvcyB5ZXQhPC9saT4nO1xuXHR9XG5cdHJlbmRlckFjdGl2ZUxpc3QobGlzdElkKTtcbn1cblxuLy8gcmVuZGVyIGFsbFxuY29uc3QgcmVuZGVyQWxsID0gKCkgPT4ge1xuXHRyZW5kZXJMaXN0cygpO1xuXHRyZW5kZXJUb2RvcygpO1xuXHRyZW5kZXJBY3RpdmVMaXN0KCk7XG5cdGJ0bkxpc3REaWFsb2coKTtcblx0YnRuQWRkTGlzdCgpO1xuXHRidG5Ub2RvRGlhbG9nKCk7XG5cdGJ0bkFkZFRvZG8oKTtcbn1cblxuXG5cblxuXG5leHBvcnQgeyByZW5kZXJMaXN0cywgcmVuZGVyVG9kb3MsIHJlbmRlckFsbCB9OyIsImltcG9ydCB7IHJlbmRlckxpc3RzIH0gZnJvbSBcIi4vYXBwXCI7XG5cbi8vIGdldCBsaXN0cyBmcm9tIGxvY2FsIHN0b3JhZ2VcbmNvbnN0IGdldExpc3RzID0gKCkgPT4ge1xuXHRjb25zdCB0aGVMaXN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpc3RzJykpO1xuXHRpZiAodGhlTGlzdHMpIHtcblx0XHRyZXR1cm4gdGhlTGlzdHM7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgX2ZpcnN0TGlzdCA9IFt7XG5cdFx0XHRpZDogMSxcblx0XHRcdG5hbWU6ICdNeSBMaXN0Jyxcblx0XHRcdGNvbG9yOiAnI2YwMCdcblx0XHR9XTtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdHMnLCBKU09OLnN0cmluZ2lmeShfZmlyc3RMaXN0KSk7XG5cdFx0cmV0dXJuIF9maXJzdExpc3Q7XG5cdH1cbn1cblxuLy8gZ2V0IGN1cnJlbnQgbGlzdFxuY29uc3QgZ2V0Q3VycmVudExpc3QgPSAobGlzdElkID0gMSkgPT4ge1xuXHRjb25zdCBhbGxMaXN0cyA9IGdldExpc3RzKCk7XG5cdGlmIChhbGxMaXN0cykge1xuXHRcdHJldHVybiBhbGxMaXN0cy5maW5kKGxpc3QgPT4gbGlzdC5pZCA9PT0gbGlzdElkKTtcblx0fVxufVxuXG4vLyBzYXZlIGxpc3RzIHRvIGxvY2FsIHN0b3JhZ2VcbmNvbnN0IHNhdmVMaXN0cyA9IChsaXN0RGF0YSkgPT4ge1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdHMnLCBKU09OLnN0cmluZ2lmeShsaXN0RGF0YSkpO1xufVxuXG4vLyBsaXN0IGZhY3RvcnlcbmNvbnN0IExpc3QgPSAobmFtZSwgY29sb3IpID0+IHtcblx0Y29uc3Qgc2F2ZUxpc3QgPSAoKSA9PiB7XG5cdFx0bGV0IHNhdmVkTGlzdHMgPSBnZXRMaXN0cygpO1xuXHRcdGNvbnN0IG1heExpc3RJRCA9IE1hdGgubWF4KC4uLnNhdmVkTGlzdHMubWFwKGxpc3QgPT4gbGlzdC5pZCkpO1xuXHRcdGNvbnN0IG5ld0xpc3RJZCA9IG1heExpc3RJRCArIDE7XG5cdFx0Y29uc3QgbmV3TGlzdCA9IHtpZDogbmV3TGlzdElkLCBuYW1lLCBjb2xvcn07XG5cdFx0c2F2ZWRMaXN0cy5wdXNoKG5ld0xpc3QpO1xuXHRcdHNhdmVMaXN0cyhzYXZlZExpc3RzKTtcblx0XHRyZW5kZXJMaXN0cygpO1xuXHR9XG5cdHJldHVybiB7c2F2ZUxpc3R9O1xufVxuXG4vLyBhZGQgbGlzdFxuY29uc3QgYWRkTGlzdCA9IChmb3JtRGF0YU9iamVjdCkgPT4ge1xuXHRjb25zdCBuZXdMaXN0ID0gTGlzdChmb3JtRGF0YU9iamVjdC5nZXQoJ25hbWUnKSwgZm9ybURhdGFPYmplY3QuZ2V0KCdjb2xvcicpKTtcblx0bmV3TGlzdC5zYXZlTGlzdCgpO1xufVxuXG5cbmV4cG9ydCB7IGdldExpc3RzLCBhZGRMaXN0LCBnZXRDdXJyZW50TGlzdCB9OyIsImltcG9ydCB7IHJlbmRlclRvZG9zIH0gZnJvbSBcIi4vYXBwXCI7XG5cbi8vIGdldCB0b2RvcyBmcm9tIGxvY2FsXG5jb25zdCBnZXRUb2RvcyA9IChsaXN0SWQgPSAxKSA9PiB7XG5cdGNvbnN0IGFsbFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSk7XG5cdGlmIChhbGxUb2Rvcykge1xuXHRcdGlmIChsaXN0SWQgPT09ICdhbGwnKSB7XG5cdFx0XHRyZXR1cm4gYWxsVG9kb3M7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBhbGxUb2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmxpc3RJZCA9PT0gbGlzdElkKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgX2ZpcnN0VG9kbyA9IFtdO1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KF9maXJzdFRvZG8pKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG4vLyBzYXZlIHRvZG9zIHRvIGxvY2FsXG5jb25zdCBzYXZlVG9kb3MgPSAodG9kb0RhdGEpID0+IHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb0RhdGEpKTtcbn1cblxuLy8gdG9kbyBmYWN0b3J5XG5jb25zdCBUb2RvID0gKGxpc3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBkdWVUaW1lLCBwcmlvcml0eSwgbm90ZXMpID0+IHtcblx0Y29uc3Qgc2F2ZVRvZG8gPSAoKSA9PiB7XG5cdFx0bGV0IHNhdmVkVG9kb3MgPSBnZXRUb2RvcygnYWxsJyk7XG5cdFx0aWYgKHNhdmVkVG9kb3MubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgbWF4VG9kb0lEID0gTWF0aC5tYXgoLi4uc2F2ZWRUb2Rvcy5tYXAodG9kbyA9PiB0b2RvLmlkKSk7XG5cdFx0XHRjb25zdCBuZXdUb2RvSWQgPSBtYXhUb2RvSUQgKyAxO1xuXHRcdFx0Y29uc3QgbmV3VG9kbyA9IHtpZDogbmV3VG9kb0lkLCBsaXN0SWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgZHVlVGltZSwgcHJpb3JpdHksIG5vdGVzfTtcblx0XHRcdHNhdmVkVG9kb3MucHVzaChuZXdUb2RvKTtcblx0XHRcdHNhdmVUb2RvcyhzYXZlZFRvZG9zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgZmlyc3RUb2RvID0gW3tpZDogMSwgbGlzdElkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGR1ZVRpbWUsIHByaW9yaXR5LCBub3Rlc31dO1xuXHRcdFx0c2F2ZVRvZG9zKGZpcnN0VG9kbyk7XG5cdFx0fVxuXHRcdHJlbmRlclRvZG9zKGxpc3RJZCk7XG5cdH1cblx0cmV0dXJuIHtzYXZlVG9kb307XG59XG5cbi8vIGFkZCB0b2RvXG5jb25zdCBhZGRUb2RvID0gKGZvcm1EYXRhT2JqZWN0LCBsaXN0SWQpID0+IHtcblx0Y29uc3QgbmV3VG9kbyA9IFRvZG8oXG5cdFx0bGlzdElkLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgndGl0bGUnKSxcblx0XHRmb3JtRGF0YU9iamVjdC5nZXQoJ2Rlc2NyaXB0aW9uJyksXG5cdFx0Zm9ybURhdGFPYmplY3QuZ2V0KCdkdWVEYXRlJyksXG5cdFx0Zm9ybURhdGFPYmplY3QuZ2V0KCdkdWVUaW1lJyksXG5cdFx0Zm9ybURhdGFPYmplY3QuZ2V0KCdwcmlvcml0eScpLFxuXHRcdGZvcm1EYXRhT2JqZWN0LmdldCgnbm90ZXMnKVxuXHQpO1xuXHRuZXdUb2RvLnNhdmVUb2RvKCk7XG59XG5cblxuXG5leHBvcnQgeyBnZXRUb2RvcywgYWRkVG9kbyB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyQWxsIH0gZnJvbSAnLi9hcHAnO1xuXG5yZW5kZXJBbGwoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==