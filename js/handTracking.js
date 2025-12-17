/* ===========================================
   HAND TRACKING - MediaPipe AI integration
   + Sidebar shape selection
   =========================================== */

import { particles } from './particleSystem.js';
import { setShape, getCurrentShape, setCurrentShape, nextShape, SHAPES } from './shapeGenerator.js';
import {
    VIDEO_WIDTH, VIDEO_HEIGHT, MAX_NUM_HANDS, MODEL_COMPLEXITY,
    MIN_DETECTION_CONFIDENCE, MIN_TRACKING_CONFIDENCE
} from './config.js';

const videoElement = document.getElementById('input_video');

let wasPinching = false;
let lastShapeChange = 0;

// Update sidebar active state
function updateSidebarActive(shapeName) {
    document.querySelectorAll('.shape-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.shape === shapeName) {
            item.classList.add('active');
        }
    });
}

// Show shape indicator
function showShapeIndicator(shapeName) {
    let indicator = document.getElementById('shape-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'shape-indicator';
        indicator.style.cssText = `
            position: absolute; top: 20px; right: 20px;
            color: #00ffcc; font-size: 24px; font-weight: bold;
            text-transform: uppercase; pointer-events: none;
            text-shadow: 0 0 10px #00ffcc;
        `;
        document.body.appendChild(indicator);
    }
    indicator.textContent = shapeName;
    updateSidebarActive(shapeName);
}

// Setup sidebar click handlers
function setupSidebarClicks() {
    document.querySelectorAll('.shape-item').forEach(item => {
        item.addEventListener('click', () => {
            const shapeName = item.dataset.shape;
            setShape(shapeName);
            setCurrentShape(shapeName);
            showShapeIndicator(shapeName);
        });
    });
}

// ON RESULTS - Hand detection callback
function onResults(results) {
    document.getElementById('loading').style.display = 'none';

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];

        // PINCH → CYCLE SHAPES
        const thumb = landmarks[4];
        const index = landmarks[8];
        const pinchDist = Math.sqrt(
            Math.pow(thumb.x - index.x, 2) + Math.pow(thumb.y - index.y, 2)
        );

        const isPinching = pinchDist < 0.08;
        const now = Date.now();

        if (isPinching && !wasPinching && (now - lastShapeChange > 500)) {
            const newShape = nextShape();
            showShapeIndicator(newShape);
            lastShapeChange = now;
        }
        wasPinching = isPinching;

        // SPREAD → SCALE
        const pinky = landmarks[20];
        const spreadDist = Math.sqrt(
            Math.pow(thumb.x - pinky.x, 2) + Math.pow(thumb.y - pinky.y, 2)
        );
        particles.scale.setScalar(0.3 + spreadDist * 3);

        // HAND POSITION → ROTATION + COLOR
        const handX = landmarks[9].x;
        const handY = landmarks[9].y;
        particles.rotation.y = (handX - 0.5) * 4;
        particles.rotation.x = (handY - 0.5) * 2;
        particles.material.color.setHSL(handX, 0.8, 0.6);
    }
}

// SETUP MEDIAPIPE
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: MAX_NUM_HANDS,
    modelComplexity: MODEL_COMPLEXITY,
    minDetectionConfidence: MIN_DETECTION_CONFIDENCE,
    minTrackingConfidence: MIN_TRACKING_CONFIDENCE
});

hands.onResults(onResults);

// INIT CAMERA
async function initCamera() {
    const loadingEl = document.getElementById('loading');

    // Setup sidebar clicks
    setupSidebarClicks();

    try {
        loadingEl.textContent = 'Requesting camera access...';
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: VIDEO_WIDTH, height: VIDEO_HEIGHT }
        });
        stream.getTracks().forEach(track => track.stop());

        loadingEl.textContent = 'Starting hand tracking...';
        const cameraFeed = new Camera(videoElement, {
            onFrame: async () => await hands.send({ image: videoElement }),
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT
        });
        await cameraFeed.start();

        showShapeIndicator('sphere');

    } catch (error) {
        loadingEl.style.color = '#ff4444';
        if (error.name === 'NotAllowedError') {
            loadingEl.innerHTML = '❌ Camera access denied!<br>Allow camera and refresh.';
        } else if (error.name === 'NotFoundError') {
            loadingEl.innerHTML = '❌ No camera found!';
        } else if (error.name === 'NotReadableError') {
            loadingEl.innerHTML = '❌ Camera in use by another app!';
        } else {
            loadingEl.innerHTML = `❌ Error: ${error.message}`;
        }
    }
}

export { initCamera };
