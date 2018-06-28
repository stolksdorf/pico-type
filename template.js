
//TODO: Create a separate template function, possibly using faker.js?
// Should take in the schema/generated types for generation

// const template = (schema, value)=>{
// 	if(Array.isArray(schema)){
// 		if(!Array.isArry(value)) return [];
// 		return value.map((val)=>template(schema[0], val));
// 	}
// 	if(typeof schema == 'object'){
// 		value = value || {};
// 		return Object.keys(schema).reduce((acc, key)=>{
// 			acc[key] = template(schema[key], value[key]);
// 			return acc;
// 		}, {});
// 	}
// 	if(typeof value !== 'undefined') return value;

// 	if(typeof schema == 'function' && typeof schema.template == 'function') return schema.template(value);
// 	if(typeof schema == 'string' && Picotype.types[schema].template == 'function') return Picotype.types[schema].template();
// };
