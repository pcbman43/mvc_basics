class Model {
	constructor() {
		// data
		this.tasks = [
			{id:1, text: 'Be good', complete: false},
			{id:2, text: 'Be nice', complete: false}
		]
	}

	addTask(taskText){
		// create id
		let id
		if(this.tasks.length > 0){
			id = this.tasks[this.tasks.length - 1].id + 1
		} else {
			id = 1
		}

		// create task object
		const task = {
			id: id,
			text: taskText,
			complete: false
		}

		// add task to tasks data structure
		this.tasks.push(task)

		// init view if datastructure is changed
		this.ifTaskListChanged(this.tasks)
	}

	taskListChanged(callback){
		this.ifTaskListChanged = callback
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
		// form with text input and submit button
		this.form = this.setElement('form')
		this.input = this.setElement('input')
		this.input.type = 'text'
		this.input.placeholder = 'Add task'
		this.submitButton = this.setElement('button')
		this.submitButton.textContent = 'Add'
		this.form.append(this.input, this.submitButton)
		// task list
		this.taskList = this.setElement('ul')
		// append title and task list to app
		this.app.append(this.title, this.form, this.taskList)
	}

	displayTasks(tasks){
		// delete old displayed tasks
		while(this.taskList.firstChild){
			this.taskList.removeChild(this.taskList.firstChild)
		}

		tasks.forEach(task => {
			// create li
			const li = this.setElement('li')
			// set li id ccording to model data id
			li.id = task.id
			// text span
			const span = this.setElement('span')
			span.textContent = task.text
			// append span to li
			li.append(span)
			// append created li to tsak list
			this.taskList.append(li)
		})
	}

	addTask(handler){
		this.form.addEventListener('submit', event => {
			event.preventDefault()
			if(this.input.value !== ''){
				handler(this.input.value)
				this.input.value = ''
			}
		})
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

		// update view
		this.model.taskListChanged(this.displayTasks)

		// submit event on view
		this.view.addTask(this.handleAddTask)

		this.displayTasks(this.model.tasks)
	}

	displayTasks = tasks => {
		this.view.displayTasks(tasks)
	}

	handleAddTask = taskText => {
		this.model.addTask(taskText)
	}
}

const app = new Controller(new Model(), new View())