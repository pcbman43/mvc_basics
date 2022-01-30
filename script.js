class Model {
	constructor() {}
}

class View {
	constructor() {}
}

class COntroller {
	constructor(model, view) {
		this.model = model
		this.view = view
	}
}

const app = new Controller(new Model(), new View())