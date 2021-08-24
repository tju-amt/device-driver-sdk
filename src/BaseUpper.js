const { EventEmitter } = require('events');

module.exports = class BaseUpper extends EventEmitter {
	constructor() {
		super();

		const context = {
			id: null,
			connected: false,
			event: 0
		};

		this.context = context;

		this.state = {
			set id(value) {
				context.id = value;
			},
			get id() {
				return context.id;
			},
			get connected() {
				return context.connected;
			},
			get event() {
				return context.event;
			}
		};

		this.sampling = {
			startedAt: null
		};

		Object.freeze(this);
	}

	get id() {
		return this.id;
	}

	get event() {
		return this.context.event;
	}

	get busy() {
		return this.sampling.startedAt !== null;
	}

	resetSampling() {
		this.sampling = null;
	}

	startSampling() {
		this.sampling = Date.now();
	}
};
