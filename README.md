# pico-type
A tiny custom schema checker for js


`type(value)` - same as `.validate()`
`type.is(value)` - returns a boolean if matches schema
`type.ensure(value)` - throws if not match, returns obj if match
`type.validate(value)` - returns nested error messages if not match
`type.schema()` - returns the type's schema



---




Picotype.type.number.is() <- should be a valid function
each core type should be an instance of the libraries capabilities.



also support regex
```js
const Type = require('pico-type');

const AgeType = Type((age)=>{
	if(age < 0 || age > 150) return 'Outside of age range';
});

const UserType = Type({
	name        : 'string',
	isAdmin     : 'bool',
	age         : AgeType,
	tags        : ['str'],
	posts : {
		total : (postCount)=>{
			if(postCount < 0) return 'Must be positive';
		},
		link : 'url'
	}
	'checkins' : [{
		time     : Type.types.epoch,
		location : Type.types.geo
	}]
	'notes' : 'str',
});

//Validate the incoming parameters
const updateAge = (user, newAge)=>{
	UserType(user); AgeType(newAge);
	// Set the user age....
};

//Validates that the return value always matches the User Type
const getUser = UserType.returns((userId)=>{
	// Fetch and return user...
});
```


## Built-in Types

- Any, '*'
- Date
- String
- Number
- Boolean
- Array
- Object

- Email
- Geo
- Url
- uuid
- epoch


## Type Methods

- `is`, returns a boolean
- `validte`, returns an object where the values are string errors
- `schema`, returns a detailed object of what the type looks like
- `ensure`, throws an error if not matched, otherwise returns object



## Base Types
- Also use the raw native types