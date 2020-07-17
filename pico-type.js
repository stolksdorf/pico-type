

//BUMP: into a tuils file
const isPlainObject = (obj)=>obj && typeof obj == 'object' && obj.constructor == Object;
const isNativeType  = (func)=>/\[native code\]/.test(func+'');
const getNativeName = (func)=>/function (\w+)\(\)/.exec(func+'')[1];
const isEmpty       = (val)=>val==='' || val===null || typeof val === 'undefined';


//FIXME: Breaks with default params with commas in them
const getParamNames = (func)=>{
	const fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
	const result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
	return (result || []).map(x=>x.split('=')[0]);
}


const INTERFACE = Symbol('interface');


const ensure = (interface, val, name='')=>{
	if(val && val[INTERFACE] === interface) return true; //Shortcut for cast'd values
	if(interface === '*' || !interface) return true;
	if(Array.isArray(interface)){
		if(!Array.isArray(val)) throw new Error(`${name} is not an array. Given: ${val}`);
		return val.every((val, idx)=>ensure(interface[0], val, `${name}[${idx}]`));
	}
	else if(isPlainObject(interface)){
		if(!isPlainObject(val)) throw new Error(`${name} is not an object. Given: ${val}`);
		return Object.entries(interface).every(([key,val])=>ensure(val, val[key], `${name}.${key}`));
	}
	else if(interface instanceof RegExp){
		if(!interface.test(val)) throw new Error(`${name} did not pass regex; ${RegExp}.`);
	}
	else if(isNativeType(interface)){
		if(val instanceof interface) return true;
		if(typeof val == typeof interface()) return true;
		throw new Error(`${name} is not ${getNativeName(interface)}. Given: ${val}`);
	}
	else if(typeof interface === 'function'){
		const res = interface(val, name);
		if(res === true || typeof res == 'undefined') return true;
		throw new Error(`${name} ${res || `did not pass validation.`}`);
	}
	return true;
};

const is = (type, val, name)=>{ try{ ensure(type, val, name); }catch(err){ return false; } return true;};

const opt = (type)=>(val, name)=>isEmpty(val) || ensure(type, val, name);
const or = (...types)=>(val, name)=>types.some((type)=>is(type, val, name));







const wrap = (paramInterfaces, func, returnInterface)=>{
	//if(!disabled) return func;
	let pi;
	if(isPlainObject(paramInterfaces)){
		pi = getParamNames(func).map((p)=>[paramInterfaces[p], `arg '${p}'`]);
	}else if(Array.isArray(pi)){
		pi = paramInterfaces.map((int, idx)=>[int, `arg ${idx}`]);
	}

	return (...args)=>{
		if(pi) pi.map(([int, name], idx)=>ensure(int, args[idx], name));
		const result = func(...args);
		if(returnInterface){
			if(result instanceof Promise) return result.then((x)=>{
				ensure(returnInterface, x, 'Return Value');
				return x;
			});
			ensure(returnInterface, result, 'Return Value');
		}
		return result;
	}
}

const cast = (interface, initVal)=>{
	if(initVal) ensure(interface, initVal);
	const proxy = new Proxy(initVal||{}, {
		set: (obj, propName, value)=>{
			ensure(interface[propName], value, propName);
			obj[propName] = value;
			return true;
		}
	});
	proxy[INTERFACE] = interface;
	return proxy;
}


module.exports = {
	INTERFACE,

	ensure, is,
	opt, or,

	wrap,
	cast,
	types : require('./types.js')
};