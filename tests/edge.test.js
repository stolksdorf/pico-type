
const {or, opt, is, ensure} = require('../pico-type.js');


module.exports = {


	'complex test': (t)=>{

		const UserType = {
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
			meta     : '*'
		};


		ensure(UserType, {
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
			meta : { foo : 'some random data'}
		})


	},




	'Wild card schemas': (t)=>{
		t.ok(is('*', 'oh hello'), 'String works');
		t.ok(is('*', 2345), 'Number works');
		t.ok(is('*', ()=>{}), 'Function works');
		t.ok(is('*', new Date()), 'Date works');
		t.ok(is('*', {}), 'Object works');
		t.ok(is('*', []), 'Array works');
	}
};

