
const normalize = require('./src/normalize');
const BaseUpper = require('./src/BaseUpper');
const Sample = require('./src/sample');

function UpperModel(options) {
	const finalOptions = normalize(options);

	const Meta = {
		productName: finalOptions.productName,
		providerName: finalOptions.providerName,
		channelNumber: finalOptions.channelNumber
	};

	const Supported = {
		SamplingRates: finalOptions.supportedSamplingRates.slice(0),
		Gains: finalOptions.supportedGains.slice(0)
	};

	function getSupportedSamplingRates() {
		return Supported.samplingRates.slice(0);
	}

	function getSupportedGains() {
		return Supported.Gains.slice(0);
	}

	class ConfiguredUpper extends BaseUpper {
		async setGlobalGain() {

		}

		async getGlobalGain() {

		}

		async setGlobalSamplingRate() {

		}

		async getGlobalSamplingRate() {

		}

		async setEvent(value) {

		}

		async start(sampleHandler = () => {}, strict = false) {
			const write = strict ? sample => sampleHandler(Sample.validate(sample)) : sampleHandler;
			const abort = () => this.stop();

			try {
				await finalOptions.device.start(this.state, write, abort);
			} catch (err) {
				// 没启动成功
			}
		}

		async stop() {
			this.resetSampling();

			try {
				await finalOptions.device.stop(this.state);
			} catch(err) {
				// 可以不成功但本层必须清除
			}
		}

		async close() {
			await this.stop();
			await finalOptions.device.close(this.state);
		}

		get productName() {
			return Meta.productName;
		}

		get providerName() {
			return Meta.providerName;
		}

		get supportedSPSs() {
			return getSupportedSamplingRates();
		}

		get supportedGains() {
			return getSupportedGains();
		}

		static get productName() {
			return Meta.productName;
		}

		static get providerName() {
			return Meta.providerName;
		}

		static get supportedSPSs() {
			return getSupportedSamplingRates();
		}

		static get supportedGains() {
			return getSupportedGains();
		}

		static async open(options) {
			const upper = new this();

			await finalOptions.device.open(upper.state, options);
			this.context.id = await finalOptions.device.getId(this.state);

			//TODO heart beat

			return upper;
		}

		static async detect() {
			await finalOptions.device.detect();
		}
	}

	return ConfiguredUpper;
}
