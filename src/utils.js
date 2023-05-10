const ignored = Symbol('ignored');

export function toJSON(arg, options = {}, internal) {
	if (arg === null) { return arg; }
	if (arg.toJSON) { return arg.toJSON(); }

	const { ignoreUndefined } = options;
	if ((arg === undefined && ignoreUndefined) || typeof value === 'function') {
		return internal ? ignored : undefined;
	}

	if (Array.isArray(arg)) {
		return arrayToJSON(arg, options);
	}
	return valueToJSON(arg, options);
}

function valueToJSON(arg, options) {

	if (typeof arg !== 'object' || typeof arg.valueOf() !== 'object') {
		return arg;
	}

	const json = {};

	for (let key in arg) {
		const value = toJSON(arg[key], options, true);
		if (value === ignored) { continue; }
		json[key] = value;
	}

	return json;
}

function arrayToJSON(arg, options) {
	return arg.map(element => toJSON(element, options, false));
}

export function isEqual(a,b) {
	if (a === b) return a !== 0 || 1 / a === 1 / b;
	if (a == null || b == null) return false;
	if (a !== a) return b !== b;
	return a === b;
}

export function isEmpty(arg) {
	if (arg == null) { return true; }
	if (Array.isArray(arg)) { return arg.length === 0; }
	if (typeof arg === 'object') { return Object.keys(arg).length === 0; }
	return false;
}
