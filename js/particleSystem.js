/* ===========================================
   PARTICLE SYSTEM - 15,000 glowing dots
   Creates the main visual effect
   =========================================== */

import * as THREE from 'three';
import { scene } from './sceneSetup.js';
import {
    PARTICLE_COUNT, PARTICLE_SIZE, PARTICLE_OPACITY, INITIAL_SPREAD,
    INITIAL_HUE_MIN, INITIAL_HUE_MAX, INITIAL_SATURATION, INITIAL_LIGHTNESS
} from './config.js';

console.log('🔵 Creating particle system with', PARTICLE_COUNT, 'particles');

// GEOMETRY - Holds position/color data for all particles
const geometry = new THREE.BufferGeometry();

// POSITION ARRAYS
// positions: Current location of each particle (animated)
// targetPositions: Where particles want to go (for morphing)
const positions = new Float32Array(PARTICLE_COUNT * 3);      // x,y,z for each
const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
const colors = new Float32Array(PARTICLE_COUNT * 3);          // r,g,b for each

// INITIALIZE - Give each particle random starting position and color
const colorObj = new THREE.Color();
for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3; // Index in flat array (particle 0=0, particle 1=3, etc.)

    // Random position in a cube (spread around center)
    positions[i3] = (Math.random() - 0.5) * INITIAL_SPREAD;     // X
    positions[i3 + 1] = (Math.random() - 0.5) * INITIAL_SPREAD; // Y
    positions[i3 + 2] = (Math.random() - 0.5) * INITIAL_SPREAD; // Z

    // Copy to target (no initial animation)
    targetPositions[i3] = positions[i3];
    targetPositions[i3 + 1] = positions[i3 + 1];
    targetPositions[i3 + 2] = positions[i3 + 2];

    // Random cyan-to-blue color
    const hue = INITIAL_HUE_MIN + Math.random() * (INITIAL_HUE_MAX - INITIAL_HUE_MIN);
    colorObj.setHSL(hue, INITIAL_SATURATION, INITIAL_LIGHTNESS);
    colors[i3] = colorObj.r;     // Red
    colors[i3 + 1] = colorObj.g; // Green
    colors[i3 + 2] = colorObj.b; // Blue
}

// ATTACH DATA - Connect arrays to geometry
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// MATERIAL - How particles look (glowing dots)
// Using larger size and simpler settings for visibility
const material = new THREE.PointsMaterial({
    size: 0.4,  // Increased size for visibility
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.7,  // Reduced opacity for softer look
    sizeAttenuation: true
});

// CREATE PARTICLE SYSTEM - Combine geometry + material
const particles = new THREE.Points(geometry, material);
scene.add(particles);

console.log('✅ Particles added to scene');
console.log('🔵 Scene children count:', scene.children.length);
console.log('🔵 Sample position:', positions[0], positions[1], positions[2]);

export { particles, positions, targetPositions, colors, geometry };
