module.exports = {
	email : (val)=>!/^.+@.+\..+$/.test(val) && 'not an email.',
	uuid  : (val)=>!/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/.test(val) && 'not uuid.',
	url   : (val)=>!/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(val) && 'not url.',
	geo   : (val)=>{
		if(typeof val.lat !== 'number') return `.lat is not a number`;
		if(typeof val.lng !== 'number') return `.lng is not a number`;
		if(val.lat < -90 || val.lat > 90) return `.lat has an invalid range`;
		if(val.lng < -180 || val.lng > 180) return `.lng has an invalid range`;
	}
}