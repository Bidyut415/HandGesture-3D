/* ===========================================
   CONFIG - All customizable settings
   Modify these values to change app behavior
   =========================================== */

// PARTICLES - Number and appearance of dots
export const PARTICLE_COUNT = 15000;     // Total particles (more = denser shapes)
export const PARTICLE_SIZE = 0.2;        // Size of each dot
export const PARTICLE_OPACITY = 0.8;     // Transparency (0=invisible, 1=solid)
export const INITIAL_SPREAD = 50;        // Starting spread area

// COLORS - Initial color theme (HSL: 0-1 range)
export const INITIAL_HUE_MIN = 0.5;      // Start hue (0.5 = cyan)
export const INITIAL_HUE_MAX = 0.6;      // End hue (0.6 = blue)
export const INITIAL_SATURATION = 0.8;   // Color intensity
export const INITIAL_LIGHTNESS = 0.5;    // Brightness level

// CAMERA - 3D view settings
export const CAMERA_POSITION_Z = 30;     // Distance from particles
export const CAMERA_FOV = 75;            // Field of view (degrees)
export const CAMERA_NEAR = 0.1;          // Near clipping plane
export const CAMERA_FAR = 1000;          // Far clipping plane
export const FOG_DENSITY = 0.02;         // Fog for depth effect
export const FOG_COLOR = 0x000000;       // Fog color (black)

// VIDEO - Webcam capture resolution
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;

// HAND TRACKING - MediaPipe AI settings
export const MAX_NUM_HANDS = 1;          // Hands to track (1 or 2)
export const MODEL_COMPLEXITY = 1;       // 0=fast, 1=accurate
export const MIN_DETECTION_CONFIDENCE = 0.5;  // Detection threshold
export const MIN_TRACKING_CONFIDENCE = 0.5;   // Tracking threshold

// ANIMATION - Movement speeds
export const MORPH_SPEED = 0.08;         // Shape transition speed (0.01-0.2)
export const IDLE_ROTATION_SPEED = 0.002; // Auto-spin speed

// SHAPE THRESHOLDS - Hand Y position triggers (0=top, 1=bottom)
export const HEART_THRESHOLD = 0.2;      // Hand above this → heart
export const SATURN_THRESHOLD = 0.7;     // Hand below this → saturn
export const SPHERE_MIN = 0.3;           // Sphere zone start
export const SPHERE_MAX = 0.6;           // Sphere zone end
