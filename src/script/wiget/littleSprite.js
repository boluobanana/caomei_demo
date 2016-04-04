import { THREE } from 'three';
import { Sprite } from './Sprite';
import { banana } from '../banana';

class LittleSprite extends Sprite{

	constructor() {

		super();
		var scope = this;
		this.size = 2;
		this.transparent = true;
		this.opacity = 1;
		this.color = 0xffffff;
		this.spriteNumber = 4;


	}
	createLittleSprite( x, y, z){

		var t = super.createSprite(this.size, this.transparent, this.opacity, this.color, this.spriteNumber, x, y, z);
		banana.canBeChoseObjs.push( t );


		t.onclick =  () => {
			banana.makeAnimate({
				from:{x:1},
				to:{x:0},
				duration:500,
				complete:()=>{t.visible = false;banana.canvas.scene.remove(t)}
			}, function () {
				t.material.opacity = this.x;

			}).start();
		}

	}
}
export { LittleSprite };