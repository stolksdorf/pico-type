const Type = require('../pico-type.js');


module.exports = {

	funcs_are_skipped : (t)=>{
		let counter = 0;

		const AgeType = (val)=>{
			counter +=1
			return 0<val && val<150;
		};

		Type.disable();
		Type.ensure(AgeType, 56);
		Type.enable();
		t.is(counter, 0)
	},

	no_errs_thrown : t=>{
		Type.disable();

		Type.ensure(String, 56);
		Type.ensure({
			name : String,
			isUSer : Boolean
		}, {
			name : 'Scoot',
			isUser : 'false'
		});

		Type.enable();
	},


}