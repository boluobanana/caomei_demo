
var spriteRandom = {

};

spriteRandom.randomPosition = ()=>{


	var t = Math.random();

	var pos = new THREE.Vector3();

	pos.set(t*10,t*10,t*200);

	return pos;
};



export {spriteRandom} ;