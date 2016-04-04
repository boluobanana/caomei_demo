import { banana } from '../banana';
import { THREE } from 'three';

class Sprite{

	constructor() {
		this.canvas = banana.canvas;


	}

	createSprite (size, transparent, opacity, color, spriteNumber, x, y, z){

		var scope = this;
		var spriteMaterial = new THREE.SpriteMaterial({
				opacity: opacity,
				color: color,
				//transparent: transparent,
				map: scope.getTexture()
			}
		);

		// we have 1 row, with five sprites
		spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
		spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
		spriteMaterial.depthTest = false;

		spriteMaterial.blending = THREE.AdditiveBlending;

		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(size, size, size);
		sprite.position.set(x, y, z);
		sprite.velocityX = 5;

		this.canvas.scene.add(sprite);
		return sprite;
	}

	getTexture () {

		var loader = new THREE.TextureLoader();
		loader.crossOrigin = 'anonymous';

		return loader.load('src/assets/imgs/sprite-sheet.png');
	}
}

export { Sprite };