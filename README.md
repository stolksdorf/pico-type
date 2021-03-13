# 🛂 pico-type
A tiny custom interface checker for js


It's incredibly useful to know and validate the shape of your data. `pico-type` provides a very simple and agnostic way to describe and validate your data objects in your project.

### Example
```js
const {or, opt, is, ensure, types} = require('pico-type');

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
}

const user = {...};

if(is(UserType, user)) console.log('is a user!');

ensure(UserType, user); //Throws if not a user

const isUserType = is.bind(null, UserType);

isUserType(user);  // true/false checker for UserTypes now!
```

`pico-type` gives you tools for checking data strucutres against interfaces to see if they pass.

Define the shape of your data using Native types, functions, arrays, objects, or regex.


## How To Use
You define interfaces using a combination of the below types:

#### Wildcard
If your interface is exactly `'*'`, `picotype` will pass regardless of value.

#### Natives
Any Native Type in js can be used: `String`, `Number`, `Function`, `Date`, `Object`, `Array`, etc.


```js
const { ensure } = require('pico-type');

ensure(String, "Oh hello");
ensure(Object, {a : true});
ensure(Number, 500);
```

#### Regex
You can use a Regular Expression as a type, and `pico-type` will use it to test against the value.

```js
const { ensure } = require('pico-type');

ensure(/^.+@.+\..+$/, 'john.smith@test.com');
ensure(/^\+?(\d.*){3,}$/, '613-555-0106');
```

#### Array
If you provide an array as a type, `pico-type` will check that the value is an array, and use the first element of the interface array as the interface for every element that is in the value's corresponding array

```js
const { ensure } = require('pico-type');

ensure([String], ['these', 'are', 'tags']);
ensure([{ ok : Boolean }], [{ ok : true}, { ok : false}]);
```

#### Objects
Providing an object as a type will iterate over each key, and uses it's value as a interface for the value's corresponding key.

```js
const { ensure } = require('pico-type');

ensure({ ok : Boolean, foo : Number}, {ok : true, foo : 6});

//These can be nested
ensure({
	nested : {
		obj : String
	}
}, { nested : { obj : 'doot'}});
```


#### Function
Any function can be used as a type. `pico-type` will call the function while validating. If the function returns exactly `true` or `undefined` it's considered a pass. If it returns anything else, it's considered a fail and `pico-type` will use the returned value as the error message.

```js
const { ensure } = require('pico-type');

const ageType = (val)=>0 < val && val < 150
ensure(ageType, 36);

//Picotype passes the arg name as the second paremter, which you can use in your error messages.
const geoType = (val, name)=>{
	if(typeof val.lat !== 'number') return `${name}.lat is not a number`;
	if(typeof val.lng !== 'number') return `${name}.lng is not a number`;
	if(val.lat < -90 || val.lat > 90) return `${name}.lat has an invalid range`;
	if(val.lng < -180 || val.lng > 180) return `${name}.lng has an invalid range`;
}
ensure(geoType, {lat: -29.83249, lng: -50.66126});
```



## API

### `.ensure(interface, value)` -> `true` / `Error`
Returns `true` if the `value` passes the `interface`, otherwise throws with an error explaining which field invalidates the interface and why.


### `.is(interface, value)` -> `true` / `false`
Returns `true` if the `value` matches the `interface`, `false` if it doesn't


### `.wrap(parameterInterfaces, func, returnInterface)` -> `function`
Wraps a given function in both parameter and return checks, returns a new veried function.

`parameterInterfaces` is either
a) an array of interfaces applied to each argument
b) a keyed object of interfaces which will be matched to the argument names

```js
const {opt, wrap, types} = require('pico-type');

const geoDistance = wrap(
	[types.geo, types.geo],
	(point1,    point2)=>{/*...*/},
	Number
);

//ParameterIterface can be a named object
const setAge = wrap(
	{eventFlag: opt(Boolean), user: UserType},
	(user, age, eventFlag)=>{
		/* ... */
	}
	//No return checks
);

//can leave either parameter or return interface blank as well
const noChecks = wrap(null, (a,b,c)=>{});
```


## Utils

### `.or(...types)` -> `function(value)`
Returns a validation function that passes if the `value` passes any one of the provided types.

```js
const {or, ensure} = require('pico-type');

const DateType = or(Number, Date);
ensure(DateType, new Date());
```

### `.opt(type)` -> `function(value)`
Returns a validation function that passes if the `value` passes the `type` or is `undefined`

```js
const {opt, ensure} = require('pico-type');

const BoolOrNothing = opt(Boolean);

```


## Builtin Types

pico-type comes with some built-in types for you to use.

- `.email(val)`
- `.uuid(val)`
- `.url(val)`
- `.geo(val)`



