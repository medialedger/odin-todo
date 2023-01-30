import { renderLists } from "./app";

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
		renderLists();
	}
	return {saveList};
}

// add list
const addList = (formDataObject) => {
	const newList = List(formDataObject.get('name'), formDataObject.get('color'));
	newList.saveList();
}


export { getLists, addList, getCurrentList };