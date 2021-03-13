const {cast, INTERFACE, ensure} = require('../pico-type.js');


module.exports = {

	basic: (t)=>{
		const PlayerType = {
			name  : String,
			score : Number
		}

		const user = cast(PlayerType, {
			name : 'Scoot',
			score : 6
		});

		user.name = 'Scott1';
		user.score = 7;
		user.foo = true;

		t.throws(()=>{
			user.name = 7;
		});
	},
	no_initval : (t)=>{
		const PlayerType = {
			name  : String,
			score : Number
		}

		const user = cast(PlayerType);
		user.name = 'Scott1';
		user.score = 7;
		user.foo = true;

		t.throws(()=>{
			user.name = 7;
		});
	},

	_basic_val : (t)=>{
		let foo = cast(Number);

		foo = 6;
		t.throws(()=>{
			foo = "yo"
		})
	},
	cast_skip : (t)=>{
		let counter = 0;
		const UserType = {
			name : String,
			age : (val)=>{
				counter+=1
				return val>0&&val<120
			}
		};
		const LogType = {
			user : UserType,
			ts : Date
		}


		const log = {
			user : cast(UserType, {
				name : 'Scott', age: 30
			}),
			ts : new Date()
		};

		ensure(LogType, log)
		t.is(counter, 1);
	}

}


