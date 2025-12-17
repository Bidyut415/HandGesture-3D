/* ===========================================
   MAIN - Application entry point
   Starts everything up
   =========================================== */

import { setShape } from './shapeGenerator.js';
import { animate } from './animation.js';
import { initCamera } from './handTracking.js';
import { renderer } from './sceneSetup.js';

console.log('🚀 Hand Gesture 3D - Initializing...');

// Clear the renderer once at start (needed since autoClear is false)
renderer.setClearColor(0x000000, 1);
renderer.clear();

// 1. Set initial shape (sphere)
console.log('📐 Setting initial shape: sphere');
setShape('sphere');

// 2. Start render loop (runs every frame)
console.log('🎬 Starting animation loop');
animate();

// 3. Start camera and hand tracking
console.log('📷 Initializing camera and hand tracking');
initCamera();

console.log('✅ Initialization complete!');
