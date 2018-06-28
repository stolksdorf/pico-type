const test = require('pico-check');
const Type = require('../pico-type.js');



test.group('boolean', (test)=>{
	test('basic', (t)=>{
		t.ok(Type.boolean.is(true));
		t.ok(Type.boolean.is(false));

		t.no(Type.boolean.is([]));
		t.no(Type.boolean.is('true'));
		t.no(Type.boolean.is(8));
	});
	test('alias', (t)=>{
		t.ok(Type.bool.is(true));
		t.ok(Type.bool.is(false));

		t.no(Type.bool.is([]));
		t.no(Type.bool.is('true'));
		t.no(Type.bool.is(8));
	});
});

test.group('string', (test)=>{
	test('basic', (t)=>{
		t.ok(Type.string.is(''));
		t.ok(Type.string.is('helllo'));

		t.no(Type.string.is([]));
		t.no(Type.string.is(true));
		t.no(Type.string.is(8));
	});
	test('alias', (t)=>{
		t.ok(Type.str.is(''));
		t.ok(Type.str.is('helllo'));

		t.no(Type.str.is([]));
		t.no(Type.str.is(true));
		t.no(Type.str.is(8));
	});
});



module.exports = test;