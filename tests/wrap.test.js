const {wrap, ensure} = require('../pico-type.js');

const wait = async (n,val)=>new Promise((r)=>setTimeout(()=>r(val), n));

module.exports = {
	basic : (t)=>{


		let doot = wrap({bar: Number}, (foo, bar)=>{
			return 6;
		}, Number)

		doot(true, 'yo')


	},

	$async : (t)=>{


		let doot = wrap(
			null,
			()=>wait(200, 5),
			//String
			Number
		);


		return doot().then(x=>console.log(x))





	}
}