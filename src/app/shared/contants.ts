export const APP_CONST = {
	'ACCESS_TOKEN': 'x-auth-token'
}

export const ColorLuminance = (hex: string | any[], lum: number) => {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00" + c).substr(c.length);
	}

	return rgb;
}

export const getLightColorFromBg = (hex: any): string => {
	if (hex == '#fff' || hex == '#ffffff') {
		return getColor(null);
	}
	let c = null;
	const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m: any, r: string, g: string, b: string) => '#' + r + r + g + g + b + b)
		.substring(1).match(/.{2}/g)
		.map((x: string) => parseInt(x, 16))
	if (rgb[0] >= rgb[1]) {
		if (rgb[0] >= rgb[2]) {
			c = 0;
		}
		else {
			c = 2;
		}
	}
	else {
		if (rgb[1] >= rgb[2]) {
			c = 1;
		}
		else {
			c = 2;
		}
	}
	return getColor(c);
}

export const DEFAULT_RESPONSEVALIDATION = 'text';

function getColor(c: number | null) {
	if (!c) {
		return '#f5f5f5';
	}
	switch (c) {
		case 0: return '#ffe6e6';
		case 1: return '#e6ffe6';
		case 2: return '#e6e6ff';
		default: return '#e6e6ff';
	}
}