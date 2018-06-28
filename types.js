module.exports = (Lib)=>{
	/** Native Types **/

	Lib.boolean = Lib((val)=>{ if(typeof val != 'boolean') return `value is not a boolean`; });
	Lib.number  = Lib((val)=>{ if(typeof val != 'number')  return `value is not a number`; });
	Lib.string  = Lib((val)=>{ if(typeof val != 'string')  return `value is not a string`; });

	Lib.object  = Lib((val)=>{ if(Object.prototype.toString.call(val) != '[object Object]')  return `value is not an object`; });
	Lib.array   = Lib((val)=>{ if(!Array.isArray(val))  return `value is not an array`; });
	Lib.date    = Lib((val)=>{ return `date is not configured out yet`; });


	/** Custom Types **/
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

	/** Aliases **/
	const aliases = {
		bool : 'boolean',
		num  : 'number',
		str  : 'string',
		obj  : 'object',
		arr  : 'array',
	};
	Object.keys(aliases).map((key)=>Lib[key] = Lib[aliases[key]]);

	return Lib;
}