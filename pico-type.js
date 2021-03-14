const isNativeType  = (func)=>/\[native code\]/.test(func+'');
const getNativeName = (func)=>/function (\w+)\(\)/.exec(func+'')[1];

const isObj = (obj)=>obj && typeof obj == 'object' && obj.constructor == Object;
const undef = (val)=>val==='' || val===null || typeof val === 'undefined';

const INTERFACE = Symbol('interface');
let DISABLED = false;

const ensure = (interface, val, name='')=>{
	if(DISABLED || interface === '*' || !interface) return true;
	if(val && val[INTERFACE] === interface) return true; //Shortcut for cast'd values

	if(Array.isArray(interface)){
		if(!Array.isArray(val)) throw new Error(`${name} is not an array. Given: ${val}`);
		val.every((val, idx)=>ensure(interface[0], val, `${name}[${idx}]`));
	}
	else if(isObj(interface)){
		if(!isObj(val)) throw new Error(`${name} is not an object. Given: ${val}`);
		Object.entries(interface).every(([key,int])=>ensure(int, val[key], `${name}.${key}`));
	}
	else if(interface instanceof RegExp){
		if(!interface.test(val)) throw new Error(`${name} did not pass regex; ${interface}.`);
	}
	else if(isNativeType(interface)){
		if(val instanceof interface) return true;
		if(typeof val == typeof interface()) return true;
		throw new Error(`${name} is not ${getNativeName(interface)}. Given: ${val}`);
	}
	else if(typeof interface === 'function'){
		const res = interface(val, name);
		if(res === true || undef(res)) return true;
		throw new Error(`${name} ${res || `did not pass validation.`}`);
	}
	return true;
};

const is = (type, val, name)=>{ try{ ensure(type, val, name); }catch(err){ return false; } return true;};

const opt = (type)=>(val, name)=>undef(val) || ensure(type, val, name);
const or = (...types)=>(val, name)=>types.some((type)=>is(type, val, name));

const wrap = (argTypes, func, returnType)=>{
	if(DISABLED) return func;
	return (...args)=>{
		if(argTypes) argTypes.map((int, idx)=>ensure(int, args[idx], `arg${idx}`));
		const result = func(...args);
		if(returnType){
			if(result instanceof Promise) return result.then((x)=>{
				ensure(returnType, x, 'Return Value');
				return x;
			});
			ensure(returnType, result, 'Return Value');
		}
		return result;
	}
};

const cast = (interface, initVal)=>{
	if(DISABLED) return initVal;
	if(!undef(initVal)) ensure(interface, initVal);
	const proxy = new Proxy(initVal ?? {}, {
		set: (obj, propName, value)=>{
			ensure(interface[propName], value, propName);
			obj[propName] = value;
			return true;
		}
	});
	proxy[INTERFACE] = interface;
	return proxy;
};

module.exports = {
	INTERFACE, DISABLED,

	ensure, is,
	opt, or,

	wrap, cast,

	disable : ()=>DISABLED=true,
	enable  : ()=>DISABLED=false,
};