import { spriteRandom } from './gameserver/spriteRandom'
import { LittleSprite } from './wiget/LittleSprite'

const start = ()=>{

	var sprite = new LittleSprite();


	for(let j = -5;j<5;j++){

		for (let i =-5; i<5;i++){
			var r = spriteRandom.randomPosition();
			sprite.createLittleSprite(i*5,j*5,-40);
			sprite.createLittleSprite(i*5,j*5,40);
		}
	}

	for(let j = -5;j<5;j++){

		for (let i =-5; i<5;i++){
			var r = spriteRandom.randomPosition();
			sprite.createLittleSprite(-40,j*5,i*5);
			sprite.createLittleSprite(40,j*5,i*5);
		}
	}


};


var chapter1 = {
	enter:()=>{
		start();
	}
};


export {chapter1};