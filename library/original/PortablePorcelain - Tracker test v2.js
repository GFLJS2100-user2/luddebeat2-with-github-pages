/*
	PortablePorcelain's Tracker v2
	Cover: Lady Gaga - Bad Romance
*/

f = (t, e, s) => t[(t2 / e * 16 + s) % t.length | 0].split(":")
	.map((t => t.split(" ")
		.filter((t => "" != t)))), parseTracks = (e, D, C, E = 1, p = (t => 1 & t)) => {
		for (iter = 0, s = (t = 0) => f(e, D, t), u = 16 * t2 / E, r = 0 | u, k = (r - u) ** 2, o = (t, e = 0) => notes[s(e)[t][0]], iter += 1 & 400 * (8 * s()[0] - 15) / (2048 * t2 * s()[0] % 1024) / 16, i = 1; i < s()
			.length; i++)
			for (j = 0; j < (b = s()[i][2].split("|"))
				.length; j++) c = (t, e) => (o(t, e) - 2 + parseInt(C) + parseInt(b[j])) / 12 + parseInt(s()[i][1]) + 1, d = (1 - k) * c(i) + k * c(i, E), "0" == s()[i][3] ? iter += "_" != s()[i][1] && "_" != b[j] ? p(t * 2 ** c(i) / 64) / i / b.length : 0 : iter += "_" != s()[i][1] && "_" != b[j] ? p((t * 2 ** c(i) + 2 ** (d + 9)) / 64) / i / b.length : 0;
		return iter / 4
	}, (g = (t, e = 0, s = speed, D = 1, i = (t => t % 1)) => t.map((t => parseTracks(t, s, e, D, i)))[t2 % t.length | 0]) && t || (notes = {
		A: 0,
		A$: 1,
		B: 2,
		C: 3,
		C$: 4,
		D: 5,
		D$: 6,
		E: 7,
		F: 8,
		F$: 9,
		G: 10,
		G$: 11
	}, mel = [
	'2 : C  0 0|12 0',
	'0 : C  0 0|12 0',
	'0 : D  0 0|12 0',
	'0 : D  0 0|12 0',
	'0 : E  0 0|12 0',
	'2 : E  0 0|12 0',
	'2 : C  0 0|12 0',
	'2 : C  0 0|12 0',
	'4 : F  0 0|12 1',
	'0 : F  0 0|12 1',
	'0 : F  0 0|12 1',
	'0 : F  0 0|12 1',
	'0 : F  0 0|12 1',
	'0 : F  0 0|12 1',
	'0 : E  0 0|12 1',
	'0 : E  0 0|12 0',
	'0 : F  0 0|12 0',
	'0 : F  0 0|12 0',
	'2 : E  0 0|12 1',
	'2 : E  0 0|12 0',
	'4 : D  0 0|12 0',
	'0 : D  0 0|12 1',
	'0 : D  0 0|12 1',
	'0 : D  0 0|12 1',
	'2 : D  0 0|12 1',
	'2 : D  0 0|12 1',
	'0 : D  0 0|12 1',
	'0 : D  0 0|12 1',
	'0 : D  0 0|12 1',
	'0 : D  0 0|12 0',
	'2 : B  0 0|12 0',
	'2 : B  0 0|12 0',
	'4 : C  0 0|12 1',
	'0 : C  0 0|12 1',
	'0 : C  0 0|12 1',
	'2 : C  0 0|12 1',
	'2 : D  0 0|12 1',
	'0 : D  0 0|12 1',
	'0 : D  0 0|12 1',
	'0 : D  0 0|12 0',
	'2 : E  0 0|12 0',
	'0 : E  0 0|12 1',
	'0 : E  0 0|12 1',
	'0 : E  0 0|12 1',
	'0 : E  0 0|12 1',
	'0 : E  0 0|12 1',
	'2 : D  0 0|12 1',
	'2 : D  0 0|12 0',
	'2 : E  0 0|12 0',
	'2 : E  0 0|12 0',
	'0 : D  0 0|12 0',
	'0 : D  0 0|12 0',
	'0 : D  0 0|12 0',
	'0 : D  0 0|12 0',
	'4 : C  0 0|12 0',
	'0 : C  0 0|12 1',
	'0 : C  0 0|12 1',
	'0 : C  0 0|12 1',
	'0 : C  0 0|12 1',
	'0 : C  0 0|12 1',
	'2 : C  0 0|12 1',
	'2 : C  0 0|12 1',
	'0 : C  0 0|12 1',
	'0 : C  0 0|12 1',
], chd = [
	'0 : C  1 0|4|7|12 0',
	'0 : F  1 0|4|7|12 0',
	'0 : F  1 0|4|7|12 0',
	'0 : G  1 0|4|7|12 0',
	'0 : G  1 0|4|7|12 0',
	'0 : G$ 1 0|3|6|12 0',
	'0 : G$ 1 0|3|6|12 0',
	'0 : A  2 0|3|7|12 0',
]),
speed = .25,
t2 = t / speed / 65536,
pitch = 0,
g([chd], pitch, 8, 1, k => k & 1) + g([mel], pitch, 1, 1, k => k % 2)