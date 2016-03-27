import { THREE } from 'three';
import { banana } from './../banana';
import '../../libs/StereoCamera'
import '../../libs/DeviceOrientationControls'

banana.canvas = {};

class vrserver {

	constructor() {
		this.scene = new THREE.Scene();
		this.scene.name = 'mainScene';
		this.sceneOrtho = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.cameraOrtho = new THREE.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -100, 10);

		this.renderer = new THREE.WebGLRenderer();
		this.output = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

		this.vrEnable = false;

		this.renderer.setClearColor( 0x000000 );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setPixelRatio( window.devicePixelRatio );


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

		//this.camera.lookAt(this.scene.position);

		//this.scene.add(plane);
		//插件位置
		this.Stereo(this.renderer);
		this.Orientation();
		this.cursorGroup = this.cursor();

		document.querySelector( '#containe' ).appendChild( this.renderer.domElement );

		window.addEventListener( 'resize', ()=>this.resize(window.innerWidth, window.innerHeight) );
		this.init();



		banana.subscribe('resize',()=> {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		});

		this.resize(window.innerWidth, window.innerHeight);
	}

	render() {
//needsUpdate
		if (!this.vrEnable){
			this.renderer.render( this.scene, this.camera, this.output);
			this.renderer.render( this.sceneOrtho, this.cameraOrtho);
		} else {
			this.renderer.render( this.scene, this.camera, this.output);
			this.renderer.render( this.sceneOrtho, this.cameraOrtho);

			this.stereo.render(this.sceneOrtho, this.cameraOrtho );
		}

		if (banana.device.isMobile && window.DeviceMotionEvent) {
			this.orientation.update();
		}
	}

	resize(width, height) {

		banana.publish('resize');

		this.renderer.setSize( width, height );

		if (this.vrEnable){
			this.cursorGroup.position.set( width /4 , height/2, -1);
		}else{
			this.cursorGroup.position.set(width /2 , height/2, -1);
		}
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

			renderer.setScissor( size.width / 2, 0, size.width / 2, size.height  );
			renderer.setViewport( size.width / 2, 0, size.width / 2, size.height   );
			renderer.render( scene, _stereo.cameraR );

			renderer.setScissorTest( false );

		};

	}

	Orientation(){
		let ori = this.orientation = new THREE.DeviceOrientationControls(this.camera);
	}

	cursor(){

		let ring = new THREE.Mesh(new THREE.RingGeometry(10,20,20,20,0,6.3),new  THREE.MeshBasicMaterial({color:0xff0000}));
		let point = new THREE.Mesh(new THREE.CircleGeometry(6,20,0,6.3),new THREE.MeshBasicMaterial({color:0xff0000}));

		let texture = this.output.texture;
		var  plane = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight),new THREE.MeshBasicMaterial({
			map: texture
		}));
		plane.position.set(window.innerWidth/2,window.innerHeight/2,-2);


		let cursorGroup = new THREE.Group();
		cursorGroup.add(ring);
		cursorGroup.add(point);
		cursorGroup.position.set(window.innerWidth /2 , window.innerHeight /2,-1);

		this.sceneOrtho.add(cursorGroup);
		this.sceneOrtho.add(plane);


		banana.subscribe('resize', ()=> {
			this.cameraOrtho.right = window.innerWidth;
			this.cameraOrtho.top = window.innerHeight;
			this.cameraOrtho.updateProjectionMatrix();

			resizePlane(this);
		},9);

		function resizePlane (scope){
			plane.geometry.dispose();
			plane.material.dispose();
			scope.sceneOrtho.remove(plane);
			plane = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight),new THREE.MeshBasicMaterial({
				map: texture
			}));
			if (scope.vrEnable){

				plane.position.set(window.innerWidth/4, window.innerHeight/2,-2);
			}else {
				plane.position.set(window.innerWidth/2, window.innerHeight/2,-2);
			}
			scope.sceneOrtho.add(plane);

		}
		return cursorGroup;


	};
	init(){

	}
}

export { vrserver };


