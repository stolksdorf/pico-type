const {cast, INTERFACE, ensure} = require('../pico-type.js');


module.exports = {

	basic: (t)=>{
		const PlayerType = {
			name : String,
			score : Number
		}

		const user = cast(PlayerType, {
			name : 'Scoot',
			score : 6
		})

		//user.name = 7; //Throws!
	}

}


