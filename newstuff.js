/*
const UpdateUserName = check([UserType, String], (user, newName)=>{

}, UserType)



const wrap = (preTypes, func, postType)=>{
	//if(disabled) return func;
	return (...args)=>{
		if(preTypes) preTypes.map((type, idx)=>ensure(args[idx], type));
		const result = func(...args);
		if(postType) ensure(result, postType);
		return result;
	}
}

const types = {
	opt : (type)=>{
		return (val)=>{
			if(typeof val === 'undefined') return;
			return ensure(type, val);
		}
	},
	/** Custom Types
	Lib.email = Lib((val)=>{
		if(!/^.+@.+\..+$/.test(val)){
			return `value is not formatted as an email.`;
		}
	});
	Lib.uuid = Lib((val)=>{
		if(!/^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(val)){
			return `value is not formatted as a uuid.`;
		}
	});
	Lib.url = Lib((val)=>{
		if(!/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(val)){
			return `value is not formatted as an url.`;
		}
	});
	Lib.geo = Lib((val)=>{
		if(typeof val.lat !== 'number') return `.lat is not a number`;
		if(typeof val.lng !== 'number') return `.lng is not a number`;
		if(val.lat < -90 || val.lat > 90) return `.lat has an invalid range`;
		if(val.lng < -180 || val.lng > 180) return `.lng has an invalid range`;
	});
	//DateLike?
}


const native = construct({
	'array' : Array,
	'date'  : Date,
	'regex' : RegExp
},
(type, name)=>[type, (val)=>!(val instanceof type) && `Not a ${name}`]);


const primitive = construct({
	'string'   : String,
	'boolean'  : Boolean,
	'object'   : Object,
	'number'   : Number,
	'function' : Function,
	'symbol'   : Symbol,
},
(type, name)=>[type, (val)=>typeof val !== name && `Not a ${name}`]);



//Should also track path through object, for error messages
const run = (schema, value, handle=(x, path)=>x, path='')=>{
	if(Array.isArray(schema)){
		if(!Array.isArray(value)) return handle(`value is not a array`, path);
		return value.flatMap((val, idx)=>run(schema[0], val, handle, `${path}[${idx}]`));
	}
	if(native[schema]) return handle(native[schema](value), path);

	//check if simple object
	if(typeof schema === 'object'){
		if(typeof value !== 'object') return handle(`value is not an object`, path);

		return Object.keys(schema).flatMap((key)=>{
			return run(schema[key], value[key], handle, `${path}.${key}`);
		});
	}
	if(primitive[schema]) return handle(primitive[schema](value), path);

	//check if function
	if(typeof schema === 'function'){
		try{
			return handle(schema(value), path);
		}catch(err){
			return handle(err, path);
		}
	}
}


//For throwing...
const ensure = (schema, value)=>run(schema, value, (x, path)=>{throw x});

// Validate should return an error object;

*/