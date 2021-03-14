const {wrap, ensure} = require('../pico-type.js');

const wait = async (n,val)=>new Promise((r)=>setTimeout(()=>r(val), n));

module.exports = {
	basic : (t)=>{


		let doot = wrap([null,Number], (foo, bar)=>{
			return 6;
		}, Number)

		doot(true, 7)


	},

	async : async (t)=>{
		let doot = wrap(
			null,
			(val)=>wait(10, val),
			Number
		);

		let res = await doot(10);

		t.arm('Should error');
		res = await doot('foo').catch((err)=>{
			t.disarm()
		})

		return true;
	}
}