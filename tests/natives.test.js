const test = require('pico-check');
const {is, ensure} = require('../pico-type.js');

const map = (obj,fn)=>Object.keys(obj).map((key)=>fn(obj[key],key));

//make a bunch of values per type
//make a validator

function dummyFunction(){}

const values = {
	boolean : [true, false, new Boolean()],
	string : ['', `this is a longer string`, new String()],
	number : [0, -1, 2344, Math.PI, Infinity, new Number(), Date.now()],
	func : [dummyFunction, ()=>{}, new Function()],
	date : [new Date(), new Date(2018, 11, 24, 10, 33, 30, 0)],
	object : [{}, {a:true, b :'yo'}, new Object()],
	array : [[], [1,2,3,4,5], new Array()]
};

const types = {
	boolean : Boolean,
	string : String,
	number : Number,
	func : Function,
	date : Date,
	object : Object,
	array : Array,
}

// map(types, (schema, name)=>{
// 	test.group(name, (test)=>{
// 		map(values, (vals, subname)=>{
// 			if(name == subname){
// 				test(`passes ${subname}`, (t)=>{ vals.map((val)=>ensure(schema, val)) });
// 			}else{
// 				test(`fails ${subname}`, (t)=>{  vals.map((val)=>t.throws(()=>ensure(schema, val))) });
// 			}
// 		})
// 	});
// })


test.group('boolean', (test)=>{
	const {boolean, ...rest} = values;

	test(`passes boolean`, (t)=>{ boolean.map((val)=>ensure(Boolean, val)) });

	map(rest, (values, type)=>{
		test(`fails ${type}`, (t)=>{
			values.map((val)=>t.throws(()=>ensure(Boolean, val)))
		});
	});
});


test.group('string', (test)=>{
	const {string, ...rest} = values;

	test(`passes string`, (t)=>{ string.map((val)=>ensure(String, val)) });

	map(rest, (values, type)=>{
		test(`fails ${type}`, (t)=>{
			values.map((val)=>t.throws(()=>ensure(String, val)))
		});
	});
});


test.group('number', (test)=>{
	const {number, ...rest} = values;

	test(`passes number`, (t)=>{ number.map((val)=>ensure(Number, val)) });

	map(rest, (values, type)=>{
		test(`fails ${type}`, (t)=>{

			values.map((val)=>{
				t.throws(()=>ensure(Number, val), `${val} yo`)
			})
		});
	});
});

test.group('func', (test)=>{
	const {func, ...rest} = values;

	test(`passes func`, (t)=>{ func.map((val)=>ensure(Function, val)) });

	map(rest, (values, type)=>{
		test(`fails ${type}`, (t)=>{
			values.map((val)=>t.throws(()=>ensure(Function, val)))
		});
	});
});

test.group('date', (test)=>{
	const {date, ...rest} = values;

	test(`passes date`, (t)=>{ date.map((val)=>ensure(Date, val)) });

	map(rest, (values, type)=>{
		test(`fails ${type}`, (t)=>{
			values.map((val)=>t.throws(()=>ensure(Date, val)))
		});
	});
});

test.skip().group('object', (test)=>{
	const {object, ...rest} = values;

	test(`passes object`, (t)=>{ object.map((val)=>ensure(Object, val)) });

	map(rest, (values, type)=>{
		test(`fails ${type}`, (t)=>{
			values.map((val)=>{
				console.log(val);
				t.throws(()=>ensure(Object, val))
			})
		});
	});
});

test.group('array', (test)=>{
	const {array, ...rest} = values;

	test(`passes array`, (t)=>{ array.map((val)=>ensure(Array, val)) });

	map(rest, (values, type)=>{
		test(`fails ${type}`, (t)=>{
			values.map((val)=>t.throws(()=>ensure(Array, val)))
		});
	});
});


module.exports = test;