/* ===========================================
   SHAPE GENERATOR - Math formulas for shapes
   10 shapes including 2025 and Fireworks!
   =========================================== */

import { PARTICLE_COUNT } from './config.js';
import { targetPositions } from './particleSystem.js';

// All available shapes
export const SHAPES = ['sphere', 'heart', 'saturn', 'cube', 'spiral', 'dna', 'star', 'wave', 'text2025', 'fireworks'];
let currentShape = 'sphere';
let shapeIndex = 0;

// Helper: Sample points from text using canvas
function getTextPoints(text, count) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 200, 50);

    const imageData = ctx.getImageData(0, 0, 400, 100);
    const points = [];

    // Sample white pixels
    for (let y = 0; y < 100; y += 2) {
        for (let x = 0; x < 400; x += 2) {
            const i = (y * 400 + x) * 4;
            if (imageData.data[i] > 128) {
                points.push({ x: (x - 200) / 10, y: (50 - y) / 10 });
            }
        }
    }
    return points;
}

// Cache text points
let textPoints2025 = null;

// SET SHAPE - Calculate target positions
function setShape(type) {
    currentShape = type;
    shapeIndex = SHAPES.indexOf(type);

    // Generate text points if needed
    if (type === 'text2025' && !textPoints2025) {
        textPoints2025 = getTextPoints('2025', PARTICLE_COUNT);
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        let x, y, z;

        // SPHERE
        if (type === 'sphere') {
            const r = 12;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.sin(phi) * Math.sin(theta);
            z = r * Math.cos(phi);
        }

        // HEART
        else if (type === 'heart') {
            const t = Math.random() * Math.PI * 2;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            z = (Math.random() - 0.5) * 10;
            x *= 0.8; y *= 0.8;
        }

        // SATURN
        else if (type === 'saturn') {
            if (Math.random() > 0.3) {
                const angle = Math.random() * Math.PI * 2;
                const rad = 14 + Math.random() * 6;
                x = Math.cos(angle) * rad;
                z = Math.sin(angle) * rad;
                y = (Math.random() - 0.5) * 1;
            } else {
                const r = 8;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                x = r * Math.sin(phi) * Math.cos(theta);
                y = r * Math.sin(phi) * Math.sin(theta);
                z = r * Math.cos(phi);
            }
        }

        // CUBE
        else if (type === 'cube') {
            const size = 10;
            const face = Math.floor(Math.random() * 6);
            const u = (Math.random() - 0.5) * 2 * size;
            const v = (Math.random() - 0.5) * 2 * size;
            if (face === 0) { x = size; y = u; z = v; }
            else if (face === 1) { x = -size; y = u; z = v; }
            else if (face === 2) { x = u; y = size; z = v; }
            else if (face === 3) { x = u; y = -size; z = v; }
            else if (face === 4) { x = u; y = v; z = size; }
            else { x = u; y = v; z = -size; }
        }

        // SPIRAL
        else if (type === 'spiral') {
            const t = Math.random() * 8 * Math.PI;
            const r = 8;
            x = r * Math.cos(t);
            z = r * Math.sin(t);
            y = (t - 4 * Math.PI) * 2;
            x += (Math.random() - 0.5) * 3;
            z += (Math.random() - 0.5) * 3;
        }

        // DNA
        else if (type === 'dna') {
            const t = Math.random() * 6 * Math.PI;
            const r = 8;
            const strand = Math.random() > 0.5 ? 0 : Math.PI;
            x = r * Math.cos(t + strand);
            z = r * Math.sin(t + strand);
            y = (t - 3 * Math.PI) * 2.5;
            if (Math.random() < 0.1) {
                const barT = Math.floor(t / 0.5) * 0.5;
                const barPos = Math.random();
                x = r * Math.cos(barT) * (1 - barPos) + r * Math.cos(barT + Math.PI) * barPos;
                z = r * Math.sin(barT) * (1 - barPos) + r * Math.sin(barT + Math.PI) * barPos;
                y = (barT - 3 * Math.PI) * 2.5;
            }
        }

        // STAR
        else if (type === 'star') {
            const points = 5;
            const outerR = 15;
            const innerR = 6;
            const angle = Math.random() * Math.PI * 2;
            const pointAngle = (Math.PI * 2) / points;
            const segment = Math.floor(angle / (pointAngle / 2));
            const isOuter = segment % 2 === 0;
            const r = isOuter ? outerR : innerR;
            const rVaried = r * (0.8 + Math.random() * 0.4);
            x = rVaried * Math.cos(angle);
            y = rVaried * Math.sin(angle);
            z = (Math.random() - 0.5) * 8;
        }

        // WAVE
        else if (type === 'wave') {
            x = (Math.random() - 0.5) * 30;
            z = (Math.random() - 0.5) * 30;
            y = Math.sin(x * 0.3) * 5 + Math.sin(z * 0.3) * 5;
        }

        // 2025 TEXT - Happy New Year!
        else if (type === 'text2025') {
            if (textPoints2025 && textPoints2025.length > 0) {
                const point = textPoints2025[i % textPoints2025.length];
                x = point.x * 1.5 + (Math.random() - 0.5) * 0.5;
                y = point.y * 1.5 + (Math.random() - 0.5) * 0.5;
                z = (Math.random() - 0.5) * 3;
            } else {
                x = (Math.random() - 0.5) * 20;
                y = (Math.random() - 0.5) * 10;
                z = (Math.random() - 0.5) * 3;
            }
        }

        // FIREWORKS - Explosion bursts!
        else if (type === 'fireworks') {
            // Create 5 explosion centers
            const numBursts = 5;
            const burst = Math.floor(Math.random() * numBursts);

            // Burst centers spread across screen
            const centers = [
                { cx: -12, cy: 8, cz: 0 },
                { cx: 12, cy: 10, cz: -5 },
                { cx: 0, cy: 5, cz: 5 },
                { cx: -8, cy: 12, cz: 3 },
                { cx: 8, cy: 6, cz: -3 }
            ];

            const center = centers[burst];
            const r = 5 + Math.random() * 8; // Explosion radius
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            // Spherical explosion from center
            x = center.cx + r * Math.sin(phi) * Math.cos(theta);
            y = center.cy + r * Math.sin(phi) * Math.sin(theta);
            z = center.cz + r * Math.cos(phi);
        }

        targetPositions[i3] = x;
        targetPositions[i3 + 1] = y;
        targetPositions[i3 + 2] = z;
    }
}

// NEXT/PREV SHAPE
function nextShape() {
    shapeIndex = (shapeIndex + 1) % SHAPES.length;
    setShape(SHAPES[shapeIndex]);
    return SHAPES[shapeIndex];
}

function prevShape() {
    shapeIndex = (shapeIndex - 1 + SHAPES.length) % SHAPES.length;
    setShape(SHAPES[shapeIndex]);
    return SHAPES[shapeIndex];
}

function getCurrentShape() { return currentShape; }
function setCurrentShape(shape) { currentShape = shape; shapeIndex = SHAPES.indexOf(shape); }

export { setShape, getCurrentShape, setCurrentShape, nextShape, prevShape };
