import { THREE } from 'three';
import { banana } from './banana';
import '../libs/StereoCamera'

banana.canvas = {};

class vrserver {

	constructor() {
		this.scene = new THREE.Scene();
		this.scene.name = 'mainScene';
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.renderer = new THREE.WebGLRenderer();

		this.vrEnable = false;


		this.renderer.setClearColor( 0x000000 );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		var light = new THREE.AmbientLight( 0xcccccc );
		var axes = new THREE.AxisHelper( 20 );
		this.scene.add( light );
		this.scene.add( axes );

		var plane = new THREE.Mesh( new THREE.PlaneGeometry( 60, 60 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
		plane.rotation.x = -0.5 * Math.PI;
		plane.position.x = 0;
		plane.position.y = 0;
		plane.position.z = 0;

		plane.name = 'plane';

		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 90;


		//this.camera.lookAt(this.scene.position);

		//this.scene.add(plane);
		this.Stereo(this.renderer);

		document.querySelector( '#containe' ).appendChild( this.renderer.domElement );

		window.addEventListener( 'resize', ()=>this.resize() );

		this.init();
	}

	render() {

		if (!this.vrEnable){
			this.renderer.render( this.scene, this.camera );
		} else {
			this.stereo.render(this.scene, this.camera);
		}
	}

	resize() {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	Stereo(renderer){

		let stereo = this.stereo = {};
		var _stereo = new THREE.StereoCamera();
		_stereo.aspect = 0.5;

		stereo.setSize = function ( width, height ) {

			renderer.setSize( width, height );

		};

		stereo.render = function ( scene, camera ) {

			scene.updateMatrixWorld();

			if ( camera.parent === null ) camera.updateMatrixWorld();

			_stereo.update( camera );

			var size = renderer.getSize();

			renderer.setScissorTest( true );
			renderer.clear();

			renderer.setScissor( 0, 0, size.width / 2, size.height );
			renderer.setViewport( 0, 0, size.width / 2, size.height );
			renderer.render( scene, _stereo.cameraL );

			renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
			renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
			renderer.render( scene, _stereo.cameraR );

			renderer.setScissorTest( false );

		};

	}


	init(){

	}
}


export { vrserver };



