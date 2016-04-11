import { spriteRandom } from './gameserver/spriteRandom'
import { LittleSprite } from './wiget/LittleSprite'
import { banana } from './banana';

const start = ()=>{

	var sprite = new LittleSprite();

	var comeIn = obj => {
		var posX = obj.position.x;
		var posY = obj.position.y;
		var posZ = obj.position.z;
		var ani = banana.makeAnimate({
			from:{x:posX,y:posY,z:posZ},
			to:{x:0,y:0,z:0},
			duration:10000,
			complete:()=>{console.log('掉血')}
		},function(){
			if(obj.visible == false){
				ani.stop();
			}
			obj.position.x = this.x;
			obj.position.y = this.y;
			obj.position.z = this.z;
		}).start();
	};

	const edgeMin = 200;
	const edgeMax = 500;
	setInterval( function () {


		let x = 200 + 300 * Math.random();
		let y = 200 + 300 * Math.random();
		let z = + 30 * Math.random();

		let mesh = sprite.createLittleSprite(x,y,z);

		comeIn(mesh);
	},5000)



};


var chapter1 = {
	enter:()=>{
		start();
	}
};


export {chapter1};