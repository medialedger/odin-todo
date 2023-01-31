import { renderLists, renderTodos } from "./app";
import { getTodoCount } from "./todos";

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
		renderLists();
		renderTodos();
		
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
	if (getTodoCount(thisId) > 0) {
		console.log('list not empty');
	} else {
		let savedLists = getLists();
		const thisIndex = savedLists.findIndex(list => list.id === thisId);
		savedLists.splice(thisIndex, 1);
		saveLists(savedLists);
		renderLists();
		setActiveListId();
		renderTodos();
	}
}


export { initListData, getLists, addList, getActiveList, getActiveListId, setActiveListId, deleteList };