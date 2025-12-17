/* ===========================================
   SCENE SETUP - Three.js 3D environment
   Creates: Scene, Camera, Renderer, Trail Effect
   =========================================== */

import * as THREE from 'three';
import {
    CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR, CAMERA_POSITION_Z,
    FOG_DENSITY, FOG_COLOR
} from './config.js';

// SCENE - Container for all 3D objects
const scene = new THREE.Scene();
// Remove fog temporarily for debugging
// scene.fog = new THREE.FogExp2(FOG_COLOR, FOG_DENSITY);

// CAMERA - Viewpoint looking at particles
const camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    window.innerWidth / window.innerHeight,
    CAMERA_NEAR,
    CAMERA_FAR
);
camera.position.z = CAMERA_POSITION_Z;

// RENDERER - Draws 3D graphics to canvas
const canvas = document.getElementById('output_canvas');

// Check if canvas exists
if (!canvas) {
    console.error('❌ Canvas element not found!');
}

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: false,  // Changed to false for solid background
    antialias: true
});

// Set size based on window dimensions
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 1);  // Solid black background

console.log('🖥️ Renderer created:', renderer.domElement.width, 'x', renderer.domElement.height);

// TRAIL OVERLAY - Semi-transparent plane to create fade/trail effect
const trailScene = new THREE.Scene();
const trailCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const trailMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.05 // Lower = longer trails
});
const trailQuad = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    trailMaterial
);
trailScene.add(trailQuad);

// RESIZE HANDLER
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log('📐 Resized to:', window.innerWidth, 'x', window.innerHeight);
});

export { scene, camera, renderer, trailScene, trailCamera };
