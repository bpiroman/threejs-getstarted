import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const geometryPlane = new THREE.PlaneGeometry(100, 100, 10, 10);
const materialPlane = new THREE.MeshBasicMaterial( {color: 0xBF9000, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometryPlane, materialPlane );
plane.rotation.x = -Math.PI / 2;
scene.add( plane );
plane.position.set(0, -10, 0);

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
	'./resources/posx.jpg',
	'./resources/negx.jpg',
	'./resources/posy.jpg',
	'./resources/negy.jpg',
	'./resources/posz.jpg',
	'./resources/negz.jpg',
]);
scene.background = texture;

camera.position.z = 100;
camera.position.y = 100;
controls.update();

function animate() {
	requestAnimationFrame( animate );

	// controls.update();

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}