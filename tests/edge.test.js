const test = require('pico-check');
const {or, opt, is, ensure, types} = require('../pico-type.js');



test('Complex test', (t)=>{

	const UserType = {
		id         : types.uuid,
		email      : /^.+@.+\..+$/,
		post_count : Number,
		tags       : [String],
		posts : [{
			title : String,
			read : Function
		}],
		age      : (val)=>0 < val && val < 150,
		flagged  : opt(Boolean),
		created  : or(Number, Date),
		location : types.geo,
		meta     : '*'
	};


	ensure(UserType, {
		id : '12b73e12-3b06-4a6b-9849-e0b071b64882',
		email : 'foo@test.com',
		post_count : 56,
		tags : ['these', 'are', 'tags'],
		posts : [
			{
				title : 'My greatest post',
				read : ()=>{}
			}
		],
		age : 49,
		flagged : false,
		created : new Date(),
		location : { lat : -8.48761007, lng : 21.0879393 },
		meta : { foo : 'some random data'}
	})

});



test('Wild card schemas', (t)=>{
	t.ok(is('*', 'oh hello'), 'String works');
	t.ok(is('*', 2345), 'Number works');
	t.ok(is('*', ()=>{}), 'Function works');
	t.ok(is('*', new Date()), 'Date works');
	t.ok(is('*', {}), 'Object works');
	t.ok(is('*', []), 'Array works');
});

test.group('or', (test)=>{})

test.group('opt', (test)=>{})




module.exports = test;