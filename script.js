class Model {
	constructor() {
		// data
		this.tasks = [
			{id:1, text: 'Be good', complete: false},
			{id:2, text: 'Be nice', complete: false}
		]
	}
}

class View {
	constructor() {
		// basic view
		// root element
		this.app = this.getElement('#root')
		// title
		this.title = this.setElement('h1')
		this.title.textContent = 'Tasks'
		// task list
		this.taskList = this.setElement('ul')
		// append title and task list to app
		this.app.append(this.title, this.taskList)
	}

	getElement(selector){
		const element = document.querySelector(selector)
		return element
	}

	setElement(tag, classname){
		const element = document.createElement(tag)
		if(classname !== undefined){
			element.classList.add(classname)
		}
		return element
	}
}

class Controller {
	constructor(model, view) {
		this.model = model
		this.view = view
	}
}

const app = new Controller(new Model(), new View())