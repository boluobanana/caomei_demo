import { THREE } from 'three';
import { banana } from './../banana';
import '../../libs/StereoCamera'
import '../../libs/DeviceOrientationControls'
import cursorEvent from './cursorEvent'
import TWEEN from '../../libs/Tween';
import { BgController } from './BgController'

banana.canvas = {};

class vrserver {

	constructor() {

		this.scene = new THREE.Scene();
		this.scene.name = 'mainScene';
		this.sceneOrtho = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.cameraOrtho = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, -100, 10 );

		this.renderer = new THREE.WebGLRenderer();
		this.output = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );

		this.vrEnable = false;

		this.renderer.setClearColor( 0x000000 );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setPixelRatio( window.devicePixelRatio );


		var light = new THREE.AmbientLight( 0xffffff );
		var axes = new THREE.AxisHelper( 20 );
		this.scene.add( light );
		this.scene.add( axes );

		var plane = new THREE.Mesh( new THREE.PlaneGeometry( 60, 60 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
		plane.rotation.x = -0.5 * Math.PI;
		plane.position.x = 0;
		plane.position.y = 0;
		plane.position.z = 0;

		plane.name = 'plane';

		//this.scene.add(plane);
		//插件位置
		this.Stereo( this.renderer );
		this.Orientation();
		this.cursorGroup = this.cursor();
		this.mouseMove();
		this.cursorEvent();
		this.bgController();
		this.initMap();


		document.querySelector( '#containe' ).appendChild( this.renderer.domElement );

		window.addEventListener( 'resize', ()=>this.resize( window.innerWidth, window.innerHeight ) );

		this.init();


		banana.subscribe( 'resize', ()=> {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		} );

		this.resize( window.innerWidth, window.innerHeight );
	}

	render() {

		TWEEN.update();

		if (!this.vrEnable) {
			this.renderer.render( this.scene, this.camera, this.output );
			this.renderer.render( this.sceneOrtho, this.cameraOrtho );
		} else {
			this.renderer.render( this.scene, this.camera, this.output );
			this.renderer.render( this.sceneOrtho, this.cameraOrtho );

			this.stereo.render( this.sceneOrtho, this.cameraOrtho );
		}

		if (banana.device.isMobile && window.DeviceMotionEvent) {
			this.orientation.update();
		}
		banana.publish('animate');

	}

	resize( width, height ) {

		banana.publish( 'resize' );

		this.renderer.setSize( width, height );

		if (this.vrEnable) {
			this.cursorGroup.position.set( width / 4, height / 2, -1 );
		} else {
			this.cursorGroup.position.set( width / 2, height / 2, -1 );
		}
	}

	Stereo( renderer ) {


		let stereo = this.stereo = {};
		var _stereo = new THREE.StereoCamera();
		_stereo.aspect = 0.5;

		stereo.setSize = function ( width, height ) {

			renderer.setSize( width, height );
		};

		stereo.render = function ( scene, camera ) {

			scene.updateMatrixWorld();

			if (camera.parent === null) camera.updateMatrixWorld();

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

	Orientation() {
		let ori = this.orientation = new THREE.DeviceOrientationControls( this.camera );
	}

	cursor() {

		let ring = new THREE.Mesh( new THREE.RingGeometry( 10, 20, 20, 20, 0, 6.3 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ) );
		let point = new THREE.Mesh( new THREE.CircleGeometry( 6, 20, 0, 6.3 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ) );

		ring.name = 'cursorRing';
		let texture = this.output.texture;
		var plane = new THREE.Mesh( new THREE.PlaneGeometry( window.innerWidth, window.innerHeight ), new THREE.MeshBasicMaterial( {
			map: texture
		} ) );
		plane.position.set( window.innerWidth / 2, window.innerHeight / 2, -100 );


		let cursorGroup = new THREE.Group();
		cursorGroup.add( ring );
		cursorGroup.add( point );
		cursorGroup.position.set( window.innerWidth / 2, window.innerHeight / 2, -1 );

		this.sceneOrtho.add( cursorGroup );
		this.sceneOrtho.add( plane );


		banana.subscribe( 'resize', ()=> {
			this.cameraOrtho.right = window.innerWidth;
			this.cameraOrtho.top = window.innerHeight;
			this.cameraOrtho.updateProjectionMatrix();

			resizePlane( this );
		}, 9 );

		function resizePlane( scope ) {
			plane.geometry.dispose();
			plane.material.dispose();
			scope.sceneOrtho.remove( plane );
			plane = new THREE.Mesh( new THREE.PlaneGeometry( window.innerWidth, window.innerHeight ), new THREE.MeshBasicMaterial( {
				map: texture
			} ) );
			if (scope.vrEnable) {

				plane.position.set( window.innerWidth / 4, window.innerHeight / 2, -2 );
			} else {
				plane.position.set( window.innerWidth / 2, window.innerHeight / 2, -2 );
			}
			scope.sceneOrtho.add( plane );

		}

		return cursorGroup;


	};

	cursorEvent(){

		cursorEvent(this);
	}
	init() {

	}

	mouseMove(){

		var lon = 270,lat = 0;
		var phi = 0,theta = 0;
		var target = new THREE.Vector3();

		document.addEventListener( 'mousedown', onDocumentMouseDown, false );

		banana.subscribe('animate',  ()=> {
			if (!(banana.device.isMobile && window.DeviceMotionEvent)) {

				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.Math.degToRad( 90 - lat );
				theta = THREE.Math.degToRad( lon );

				target.x = Math.sin( phi ) * Math.cos( theta );
				target.y = Math.cos( phi );
				target.z = Math.sin( phi ) * Math.sin( theta );

				this.camera.lookAt( target );
			}
		});

		function onDocumentMouseDown( event ) {
			event.preventDefault();

			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'mouseup', onDocumentMouseUp, false );

		}

		function onDocumentMouseMove( event ) {
			var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
			var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

			lon -= movementX * 0.1;
			lat += movementY * 0.1;

		}

		function onDocumentMouseUp( event ) {
			document.removeEventListener( 'mousemove', onDocumentMouseMove );
			document.removeEventListener( 'mouseup', onDocumentMouseUp );

		}

	}
	bgController() {
		BgController(this.scene);
	}

	initMap(){
		this.map = new THREE.Group();
		var mapGeo = new THREE.PlaneGeometry(200,200);
		var mapMat = new THREE.MeshBasicMaterial({
			color:0x000000,
			transparent:true,
			opacity:0.3
		});
		var mapMesh = new THREE.Mesh(mapGeo,mapMat);

		var geometry = new THREE.Geometry();
		var v1 = new THREE.Vector3(-50,50,0);   // Vector3 used to specify position
		var v2 = new THREE.Vector3(50,50,0);
		var v3 = new THREE.Vector3(0,0,0);   // 2d = all vertices in the same plane.. z = 0

// 把三个点加到 Geometry 里
		geometry.vertices.push(v1);
		geometry.vertices.push(v2);
		geometry.vertices.push(v3);
		geometry.faces.push(new THREE.Face3(0, 2, 1));
		geometry.computeBoundingSphere();

		var redMat = new THREE.MeshBasicMaterial({color: 0xffffff});
		var triangle = new THREE.Mesh(geometry, redMat);
		this.map.position.set(100,100,-1);

		this.map.add(triangle);
		this.map.add(mapMesh);
		this.sceneOrtho.add(this.map);

		banana.subscribe('animate',() => {
			//console.log(this.camera.rotation);
			triangle.rotation.z = this.camera.rotation.y;

		});

		banana.subscribe('resize', function () {
			//mapMesh.position.set( 100, 100, -1 );
		})


	}

}

export { vrserver };



