import { THREE } from 'three';
import { Sprite } from './Sprite';

class LittleSprite extends Sprite{

	constructor() {

		super();
		this.size = 5;
		this.transparent = true;
		this.opacity = 1;
		this.color = 0xffffff;
		this.spriteNumber = 4;
	}
	createLittleSprite( x, y, z){

		var t = super.createSprite(this.size, this.transparent, this.opacity, this.color, this.spriteNumber, x, y, z);

	}
}
export { LittleSprite };