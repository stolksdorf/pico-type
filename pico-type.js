const isPlainObject = (obj)=>typeof obj == 'object' && obj.constructor == Object;
const isNativeType  = (func)=>/\[native code\]/.test(func+'');
const getNativeName = (func)=>/function (\w+)\(\)/.exec(func+'')[1];
const isEmpty       = (val)=>val==='' || val===null || typeof val === 'undefined';

const ensure = (schema, arg, name='')=>{
	if(schema === '*') return true;
	if(Array.isArray(schema)){
		if(!Array.isArray(arg)) throw `${name}: not an array.`;
		return arg.every((val, idx)=>ensure(schema[0], val, `${name}[${idx}]`));
	}
	else if(isPlainObject(schema)){
		if(!isPlainObject(arg)) throw `${name}: not an object.`;
		return Object.entries(schema).every(([key,val])=>ensure(val, arg[key], `${name}.${key}`));
	}
	else if(schema instanceof RegExp){
		if(!schema.test(arg)) throw `${name}: did not pass regex; ${RegExp}.`;
	}
	else if(isNativeType(schema)){
		if(arg instanceof schema) return true;
		if(typeof arg == typeof schema()) return true;
		throw `${name}: not ${getNativeName(schema)}.`
	}
	else if(typeof schema === 'function'){
		const res = schema(arg, name);
		if(res === true || typeof res == 'undefined') return true;
		throw `${name}: ${res || `did not pass validation.`}`;
	}
	return true;
};

const is = (type, val, name)=>{ try{ ensure(type, val, name); }catch(err){ return false; } return true;};

const opt = (type)=>(val, name)=>isEmpty(val) || ensure(type, val, name);
const or = (...types)=>(val, name)=>types.some((type)=>is(type, val, name));


module.exports = {
	ensure,
	is,
	opt,
	or,
	types : require('./types.js')
};