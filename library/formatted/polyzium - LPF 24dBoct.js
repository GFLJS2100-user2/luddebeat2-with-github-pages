bt = 12,
SAMP_RATE = 44100,
BPM = 140,
ts = t / SAMP_RATE,
beat = BPM * ts / 60,
tick = floor(beat * 48) % 192 + 1,

C = 261.63,
Cs = 277.18,
D = 293.66,
Ds = 311.13,
E = 329.63,
F = 349.23,
Fs = 369.99,
G = 392.00,
Gs = 415.30,
A = 440.00,
As = 466.16,
B = 493.88,

window.channels = t > 0 ? window.channels : [{
	ndx: 0,
	freq: 0,
	porta: 0,
	vibrato: 0,
	held: false,
	notes: [
		{ start: 0, end: bt, note: B / 8 },
		{ start: bt, end: bt * 3, note: B / 8 },
		{ start: bt * 3, end: bt * 4, note: B / 8 },
		{ start: bt * 4, end: bt * 6, note: B / 8, target: B / 2 },
		{ start: bt * 6, end: bt * 7, note: B / 4 },
		{ start: bt * 7, end: bt * 8, note: B / 4 },
		{ start: bt * 8, end: bt * 9, note: B / 4 },
		{ start: bt * 9, end: bt * 10, note: B / 4 },
		{ start: bt * 10, end: bt * 12, note: E, target: As },
		{ start: bt * 12, end: bt * 13, note: G },
		{ start: bt * 14, end: bt * 15, note: Fs }
	]
}],

lerp = (v0, v1, tq) => (1 - tq) * v0 + tq * v1,
clamp = (num, min, max) => num <= min ? min : num >= max ? max : num,

window.channels.forEach(chan => {
	let { ndx } = chan;
	let note = chan.notes[ndx];
	const localTick = tick - (chan.delay || 0);
	while(localTick >= note.end) {
		++ndx;
		if(ndx >= chan.notes.length) {
			ndx = 0;
			break;
		}
		note = chan.notes[ndx];
	}
	chan.ndx = ndx;
	note = chan.notes[ndx];
	const inc = 1 / (note.end - note.start) / (SAMP_RATE / (BPM * 1.5));
	chan.held = localTick >= note.start && localTick < note.end - 1;
	if(note.target) {
		if(chan.porta < 1) {
			chan.porta += inc;
		}
		chan.freq = localTick >= note.start && localTick < note.end ?
			lerp(note.note, note.target, chan.porta) : chan.freq;
	} else {
		chan.porta = 0;
		chan.freq = localTick >= note.start && localTick < note.end ? note.note : chan.freq;
	}
	if(note.vibrato) {
		chan.vibrato = sin(ts * 32) * 8;
		chan.freq += chan.vibrato;
	}
}),

LPF = function() {
	this.cut = 0.5,
	this.res = 0.95,
	this.fb = fb = this.res + this.res / (1 - this.cut),
	this.lp6 = 0,
	this.lp12 = 0,
	this.lp18 = 0,
	this.lp24 = 0,
	this.bp24 = 0,
	this.hp24 = 0,
	this.process = function(i) {
		this.fb = fb = this.res + this.res / (1 - this.cut);
		this.lp6 += this.cut * (i - this.lp6 + this.fb * (this.lp6 - this.lp12)); // 1 pole
		this.lp12 += this.cut * (this.lp6 - this.lp12); // 2 poles
		this.lp18 += this.cut * (this.lp12 - this.lp18); // 3 poles
		this.lp24 += this.cut * (this.lp18 - this.lp24); // 4 poles

		// Let's turn a lowpass filter into a SVF I guess?
		this.bp24 = this.lp18 - this.lp24;
		this.hp24 = this.lp24 - i;
	};
	return this;
},

ADSR = function() {
	this.a = 0;
	this.d = 0.5;
	this.s = 0.5;
	this.r = 0.1;
	this.state = 0;
	this.value = 0;
	this.held = false;
	this.process = function() {
		if(this.state == 4 && this.held) {
			this.state = 0;
		}
		const inc = 1 / SAMP_RATE * 4;
		switch(this.state) {
		case 0: // Attack
			if(this.value >= 1 || this.a == 0) {
				this.value = 1;
				this.state = 1;
			} else {
				if(!this.held) {
					this.state = 3;
				}
				this.value += inc / this.a;
			}
			break;
		case 1: // Decay
			if(this.value <= this.s || this.d == 0) {
				this.value = this.s;
				this.state = 2;
			} else {
				if(!this.held) {
					this.state = 3;
				}
				this.value -= inc / this.d;
			}
			break;
		case 2: // Sustain
			if(this.value <= this.s) {
				this.value = this.s;
				if(!this.held) {
					this.state = 3;
				}
			} else if(this.s == 0) {
				this.state = 3;
			} else {
				this.value -= inc;
			}
			break;
		case 3: // Release
			if(this.value <= 0 || this.r == 0) {
				this.value = 0;
				this.state = 4;
			} else {
				if(this.held) {
					this.state = 0;
				}
				this.value -= inc / this.r;
			}
		}
		return this.value;
	};
	return this;
},

SawVoice = function() {
	this.freq = C;
	this.phase = 0;
	this.process = () => {
		if(this.freq == 0) {
			this.phase = 0;
			this.amp = 0;
		} else {
			this.amp = 1;
		}
		this.phase += this.freq / SAMP_RATE;
		return ((this.phase - Math.floor(this.phase)) - 0.5) * 2 * this.amp;
	};
	return this;
},

'undefined' != typeof s1 && null != s1 || (s1 = new SawVoice),
s1.freq = window.channels[0].freq,

'undefined' != typeof s2 && null != s2 || (s2 = new SawVoice),
s2.freq = window.channels[0].freq * 2.03, // 2-voice unison

'undefined' != typeof tone && null != tone || (tone = new LPF),
tone.cut = 0.05,
tone.res = 0,

'undefined' != typeof filterenv && null != filterenv || (filterenv = new ADSR),
filterenv.held = window.channels[0].held,
filterenv.a = 0,
filterenv.d = 2,
filterenv.s = 0.5,
filterenv.r = 0.3,

'undefined' != typeof acid && null != acid || (acid = new LPF),
a = .01,
acid.cut = clamp(filterenv.process(), 0, 0.99) / 2 + 0.3,
acid.cut = ((1 - a) * acid.cut ** 2) + a,
acid.res = 0.9,

'undefined' != typeof ampenv && null != ampenv || (ampenv = new ADSR),
ampenv.held = window.channels[0].held,
ampenv.a = 0,
ampenv.d = 2,
ampenv.s = 0.5,
ampenv.r = 0.1,

tone.process(s1.process() + s2.process()),
acid.process(tone.hp24),
acid.lp24 * ampenv.process() / 2;
