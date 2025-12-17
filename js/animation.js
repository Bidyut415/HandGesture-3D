/* ===========================================
   ANIMATION LOOP - Runs every frame (~60fps)
   Handles morphing animation, trails, and rendering
   =========================================== */

import * as THREE from 'three';
import { scene, camera, renderer, trailScene, trailCamera } from './sceneSetup.js';
import { particles, targetPositions, geometry } from './particleSystem.js';
import { PARTICLE_COUNT, MORPH_SPEED, IDLE_ROTATION_SPEED } from './config.js';

const clock = new THREE.Clock();
let isFirstFrame = true;
let frameCount = 0;

// ANIMATE - Main loop
function animate() {
    requestAnimationFrame(animate);
    frameCount++;

    // Debug on first frame
    if (isFirstFrame) {
        console.log('🎨 Animation started');
        console.log('📐 Renderer size:', renderer.domElement.width, 'x', renderer.domElement.height);
        console.log('📷 Camera Z:', camera.position.z);
        console.log('🔵 Particles visible:', particles.visible);
        console.log('🔵 Particles in scene:', particles.parent === scene);
        isFirstFrame = false;
    }

    // MORPHING - Move particles toward targets
    const posAttr = particles.geometry.attributes.position;
    const posArr = posAttr.array;

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        posArr[i] += (targetPositions[i] - posArr[i]) * MORPH_SPEED;
    }
    posAttr.needsUpdate = true;

    // IDLE SPIN
    particles.rotation.z += IDLE_ROTATION_SPEED;

    // SIMPLE RENDER - Just clear and render (no trail for now)
    renderer.clear();
    renderer.render(scene, camera);
}

export { animate };
