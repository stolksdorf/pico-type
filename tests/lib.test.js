const test = require('pico-check');
const Type = require('../pico-type.js');



test.group('basic', (test)=>{
	test('bool check', (t)=>{
		const schema = { a : 'number', b : 'boolean'}
		const type = Type(schema);
	})

})



test.group('library signature', (test)=>{
	const schema = { a : 'number', b : 'bool'}
	const type = Type(schema);

	test('bool check', (t)=>{
		t.ok(type.is({a : 5, b : true}));
		t.ok(type.is({a : 5, b : false}));
		t.no(type.is({a : 'yo', b : false}));
		t.no(type.is({a : 5}));
		t.no(type.is({b : { b : true}}));
	});

	test('schema', (t)=>{
		t.is(type.schema(), schema);
	});

	test('ensure', (t)=>{
		t.throws(()=>type.ensure({a : 'yo', b : false}));
	});

	test('validate', (t)=>{
		t.is(type.validate({a : 5, b : true}), undefined);
		t.is(type.validate({a : 'yo', b : false}), {
			a : 'value is not a number'
		});
		t.is(type.validate({a : 7}), {
			b : 'value is not a boolean'
		});
	});
});


test.group('type functions', (test)=>{

});

test.group('objects and arrays', (test)=>{

});



test.skip().group('misc', (test)=>{
	test.group('wildcard values', (test)=>{
		test('should work', (t)=>{
			const temp = Type({
				yo : '*'
			});
			t.fail();
		})
	});

	test.group('wildcard keys', (test)=>{
		test('should work', (t)=>{
			const temp = Type({
				'*' : 'num',
				yo : 'bool'
			});
			console.log(temp.validate({ yo : true}));
			t.ok(temp.is({ yo : true}), 'Missing wild keys is okay');
			t.ok(temp.is({ yo : true, yessss : 4}));
			t.no(temp.is({ yo : true, yessss : false}));
			t.no(temp.is({ yessss : 76}), 'Missing defined keys is not okay');
		})
	});

	test.group('optional keys', (test)=>{
		test('should work', (t)=>{
			const temp = Type({
				'sup?' : 'num',
				yo : 'bool'
			});
			t.ok(temp.is({ yo : true}), 'Missing optional is okay');
			t.ok(temp.is({ yo : true, sup : 4}));
			t.no(temp.is({ yo : true, sup : false}));
		});

		test('Validate report does not have question mark in key', (t)=>{

			t.fail();
		});
	})
});


module.exports = test;