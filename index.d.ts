import { EventEmitter } from 'events';

declare namespace Options {
	interface SampleRateObject {
		min: number;
		max: number
	}

	type SampleRate = SampleRateObject | number;

	interface ModelDevice {
		detect?(): Promise<DetectionReport[]>;
		open(state): Promise<void>;
		close(state): Promise<void>;

		start(state, write, abort): Promise<void>;
		stop(state): Promise<void>;

		getSampleRate(state): Promise<number>;
		setSampleRate(state, value: number): Promise<number>;

		getGain(state, value: number): Promise<number>;
		setGain(state, value: number): Promise<number>;

		getEvent(state): Promise<number>;
		setEvent(state, value: number): Promise<number>;

		Channel?: Channel;
	}

	namespace Channel {
		interface LeadFallOff {
			getEnabled(): Promise<boolean>;
			setEnabled(): Promise<boolean>;

			getThreshold(): Promise<number>;
			setThreshold(): Promise<number>;

			getFalledOff(): Promise<boolean>;
		}
	}

	interface Channel {
		getEnabled(): Promise<void>;
		setEnabled(): Promise<void>;

		getGain(): Promise<void>;
		setGain(): Promise<void>;

		getGround(): Promise<void>;
		setGround(): Promise<void>;

		getBiasout(): Promise<void>;
		setBiasout(): Promise<void>;

		getImpedance?(): Promise<number>;
		LeadFallOff?: Channel.LeadFallOff;
	}

	interface ChannelMeta {
		type: number;
		componentType: number;
	}

	interface Model {
		productName: string;
		providerName: string;
		channelList: ChannelMeta[];
		supportedSampleRate: SampleRate[];
		supportedGains: number[];
		device: ModelDevice;
	}
}

interface Sample {
	at: number;
	microsecond: number;
	event: number;
	dataList: number[];
}

interface DetectionReport {
	id: string;
	options?: any;
}

type SampleHandler = (sample: Sample) => void;

declare class ConfiguredUpper extends EventEmitter {
	constructor(options: any);

	readonly productName: string;
	readonly providerName: string;
	readonly channelLength: number;
	readonly supportedSampleRateList: number[];
	readonly supportedGainList: number[];
	readonly supportedIM: boolean;

	setGlobalGain(): Promise<number>;
	getGlobalGain(): Promise<number>;
	setGlobalSampleRate(): Promise<number>;
	getGlobalSampleRate(): Promise<number>;
	setEvent(value: number): Promise<number>;

	start(sampleHandler?: SampleHandler, strict?: boolean): Promise<void>;
	stop(): Promise<void>;
	close(): Promise<void>;

	static readonly productName: string;
	static readonly providerName: string;
	static readonly channelLength: number;
	static readonly supportedSampleRateList: number[];
	static readonly supportedGainList: number[];
	static readonly supportedIM: boolean;

	static open(): ConfiguredUpper;
	static detect(): DetectionReport;
}

declare function UpperModel(options: Options.Model): typeof ConfiguredUpper;

export = UpperModel;
