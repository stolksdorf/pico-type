const populateTypes = require('./types.js');

const check = (schema, value, isOptional=false)=>{
	//console.log('SCHEMA', schema);
	if(isOptional && typeof value == 'undefined') return undefined;

	if(Picotype[schema]) return check(Picotype[schema], value);
	if(typeof schema == 'function') return schema(value);

	if(Array.isArray(schema)){
		if(!Array.isArray(value)) return `value is not a array`;
		return value.reduce((acc, val, idx)=>{
			const res = check(schema[0], val);
			if(res){
				acc = acc || [];
				acc[idx] = res;
			}
			return acc;
		}, undefined);
	}
	if(typeof schema === 'object'){
		if(typeof value !== 'object') return `value is not an object`;
		for(const key in value){
			if(!schema[key]) return `${key} does not exist in schema`;
		}
		return Object.keys(schema).reduce((acc, key)=>{
			//TODO: check here for question mark in key, if so, add in optional flag
			//TODO: Add in Wildcard checks
			const res = check(schema[key], value[key]);
			if(res){
				acc = acc || {};
				acc[key] = res;
			}
			return acc;
		}, undefined);
	}
	return `invalid schema type`;
};

const Picotype = (schema)=>{
	const newType = (val)=>newType.validate(val);
	newType.is       = (obj)=>!check(schema, obj);
	newType.validate = (obj)=>check(schema, obj);
	newType.ensure   = (obj, force=false)=>{
		if(Picotype.shouldThrow || force){
			const result = check(schema, obj);
			if(result) throw new Error(JSON.stringify(result, null, '  '));
		}
		return obj;
	};
	newType.schema=()=>schema;
	Object.defineProperty(newType, 'isGeneratedType', {value : true});
	return newType;
};

Picotype.shouldThrow = true;


module.exports = populateTypes(Picotype);