"use client";

import * as React from "react";

import * as faceapi from "face-api.js";
import {
  BloomEffect,
  ChromaticAberrationEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import * as THREE from "three";

import "./GridScan.css";

const vert = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uLineStyle;
uniform float uLineJitter;
uniform float uScanOpacity;
uniform float uNoise;
uniform float uBloomOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uPhaseTaper;
uniform float uScanDuration;
uniform float uScanDelay;
uniform float uScanDirection;
uniform float uScanStarts[8];
uniform float uScanCount;
uniform float uNoiseIntensity;

varying vec2 vUv;

// NOTE: This is a direct embed of the fragment shader you provided.
// For maintainability, we keep it here as-is.

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

  vec3 ro = vec3(0.0);
  vec3 rd = normalize(vec3(p, 2.0));

  float cR = cos(uTilt), sR = sin(uTilt);
  rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

  float cY = cos(uYaw), sY = sin(uYaw);
  rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

  vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
  rd.xy += skew * rd.z;

  vec3 color = vec3(0.0);

  float minT = 1e20;
  float gridScale = max(1e-5, uGridScale);
  float fadeStrength = 2.0;
  vec2 gridUV = vec2(0.0);

  float hitIsY = 1.0;
  for (int i = 0; i < 4; i++){
    float isY = float(i < 2);
    float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
    float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
    float den = isY * rd.y + (1.0 - isY) * rd.x;
    float t = num / den;
    vec3 h = ro + rd * t;

    float depthBoost = smoothstep(0.0, 3.0, h.z);
    h.xy += skew * 0.15 * depthBoost;

    bool use = t > 0.0 && t < minT;
    gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
    minT = use ? t : minT;
    hitIsY = use ? isY : hitIsY;
  }

  vec3 hit = ro + rd * minT;
  float dist = length(hit - ro);

  float jitterAmt = clamp(uLineJitter, 0.0, 1.0);
  if (jitterAmt > 0.0) {
    vec2 j = vec2(
      sin(gridUV.y * 2.7 + iTime * 1.8),
      cos(gridUV.x * 2.3 - iTime * 1.6)
    ) * (0.15 * jitterAmt);
    gridUV += j;
  }

  float fx = fract(gridUV.x);
  float fy = fract(gridUV.y);
  float ax = min(fx, 1.0 - fx);
  float ay = min(fy, 1.0 - fy);
  float wx = fwidth(gridUV.x);
  float wy = fwidth(gridUV.y);
  float halfPx = max(0.0, uLineThickness) * 0.5;
  float tx = halfPx * wx;
  float ty = halfPx * wy;

  float lineX = 1.0 - smoothstep(tx, tx + wx, ax);
  float lineY = 1.0 - smoothstep(ty, ty + wy, ay);
  float primaryMask = max(lineX, lineY);

  vec2 gridUV2 = (hitIsY > 0.5 ? hit.xz : hit.zy) / gridScale;
  if (jitterAmt > 0.0) {
    vec2 j2 = vec2(
      cos(gridUV2.y * 2.1 - iTime * 1.4),
      sin(gridUV2.x * 2.5 + iTime * 1.7)
    ) * (0.15 * jitterAmt);
    gridUV2 += j2;
  }

  float fx2 = fract(gridUV2.x);
  float fy2 = fract(gridUV2.y);
  float ax2 = min(fx2, 1.0 - fx2);
  float ay2 = min(fy2, 1.0 - fy2);
  float wx2 = fwidth(gridUV2.x);
  float wy2 = fwidth(gridUV2.y);
  float tx2 = halfPx * wx2;
  float ty2 = halfPx * wy2;

  float lineX2 = 1.0 - smoothstep(tx2, tx2 + wx2, ax2);
  float lineY2 = 1.0 - smoothstep(ty2, ty2 + wy2, ay2);
  float altMask = max(lineX2, lineY2);

  float lineVis = max(primaryMask, altMask);

  float fade = exp(-dist * fadeStrength);

  // Scan pulse
  float dur = max(0.05, uScanDuration);
  float del = max(0.0, uScanDelay);
  float scanZMax = 2.0;

  float widthScale = max(0.1, uScanGlow);
  float sigma = max(0.001, 0.18 * widthScale * uScanSoftness);
  float sigmaA = sigma * 2.0;

  float cycle = dur + del;
  float tCycle = mod(iTime, cycle);
  float scanPhase = clamp((tCycle - del) / dur, 0.0, 1.0);

  float phase = scanPhase;
  if (uScanDirection > 0.5 && uScanDirection < 1.5) {
    phase = 1.0 - phase;
  } else if (uScanDirection > 1.5) {
    float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
    phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
  }

  float scanZ = phase * scanZMax;
  float dz = abs(hit.z - scanZ);
  float lineBand = exp(-0.5 * (dz * dz) / (sigma * sigma));

  float phaseWindow = 1.0;
  float combinedPulse = lineBand * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);
  float combinedAura = lineBand * phaseWindow * 0.25 * clamp(uScanOpacity, 0.0, 1.0);

  vec3 gridCol = uLinesColor * lineVis * fade;
  vec3 scanCol = uScanColor * combinedPulse;
  vec3 scanAura = uScanColor * combinedAura;

  color = gridCol + scanCol + scanAura;

  float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898,78.233))) * 43758.5453123);
  color += (n - 0.5) * uNoise;
  color = clamp(color, 0.0, 1.0);

  float alpha = clamp(max(lineVis, combinedPulse), 0.0, 1.0);
  fragColor = vec4(color, alpha);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

export function GridScanImpl({
  sensitivity = 0.55,
  lineThickness = 1,
  linesColor = "#2F293A",
  gridScale = 0.1,
  scanColor = "#FF9FFC",
  scanOpacity = 0.4,
  enablePost = true,
  bloomIntensity = 0.6,
  chromaticAberration = 0.002,
  noiseIntensity = 0.01,
  lineJitter = 0.1,
  scanGlow = 0.5,
  scanSoftness = 2,
  enableWebcam = false,
  showPreview = false,
  modelsPath = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights",
  className,
  style,
}: {
  sensitivity?: number;
  lineThickness?: number;
  linesColor?: string;
  gridScale?: number;
  scanColor?: string;
  scanOpacity?: number;
  enablePost?: boolean;
  bloomIntensity?: number;
  chromaticAberration?: number;
  noiseIntensity?: number;
  lineJitter?: number;
  scanGlow?: number;
  scanSoftness?: number;
  enableWebcam?: boolean;
  showPreview?: boolean;
  modelsPath?: string;
  className?: string;
  style?: React.CSSProperties;
  props?: unknown;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const rendererRef = React.useRef<any>(null);
  const materialRef = React.useRef<any>(null);

  const composerRef = React.useRef<EffectComposer | null>(null);

  const rafRef = React.useRef<number | null>(null);
  const modelsLoadedRef = React.useRef(false);

  const lookTarget = React.useRef(new THREE.Vector2(0, 0));
  const tiltTarget = React.useRef(0);
  const yawTarget = React.useRef(0);
  const lookCurrent = React.useRef(new THREE.Vector2(0, 0));
  const lookVel = React.useRef(new THREE.Vector2(0, 0));
  const tiltCurrent = React.useRef(0);
  const tiltVel = React.useRef(0);
  const yawCurrent = React.useRef(0);
  const yawVel = React.useRef(0);

  const smoothTime = THREE.MathUtils.lerp(
    0.45,
    0.12,
    THREE.MathUtils.clamp(sensitivity, 0, 1),
  );
  const maxSpeed = Infinity;

  React.useEffect(() => {
    let canceled = false;
    if (!enableWebcam) {
      modelsLoadedRef.current = true;
      return;
    }

    const load = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(modelsPath),
        ]);
        if (!canceled) modelsLoadedRef.current = true;
      } catch {
        if (!canceled) modelsLoadedRef.current = false;
      }
    };

    void load();
    return () => {
      canceled = true;
    };
  }, [enableWebcam, modelsPath]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    const uniforms = {
      iResolution: {
        value: new THREE.Vector3(
          container.clientWidth,
          container.clientHeight,
          renderer.getPixelRatio(),
        ),
      },
      iTime: { value: 0 },
      uSkew: { value: new THREE.Vector2(0, 0) },
      uTilt: { value: 0 },
      uYaw: { value: 0 },
      uLineThickness: { value: lineThickness },
      uLinesColor: { value: srgbColor(linesColor) },
      uScanColor: { value: srgbColor(scanColor) },
      uGridScale: { value: gridScale },
      uLineStyle: { value: 0.0 },
      uLineJitter: { value: Math.max(0, Math.min(1, lineJitter || 0)) },
      uScanOpacity: { value: scanOpacity },
      uNoise: { value: noiseIntensity },
      uBloomOpacity: { value: bloomIntensity },
      uScanGlow: { value: scanGlow },
      uScanSoftness: { value: scanSoftness },
      uPhaseTaper: { value: 0.9 },
      uScanDuration: { value: 2.0 },
      uScanDelay: { value: 0.2 },
      uScanDirection: { value: 2.0 },
      uScanStarts: { value: new Array(8).fill(0) },
      uScanCount: { value: 0 },
      uNoiseIntensity: { value: noiseIntensity },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    materialRef.current = material;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    if (enablePost) {
      const composer = new EffectComposer(renderer);
      composerRef.current = composer;
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloom = new BloomEffect({
        intensity: Math.max(0, bloomIntensity),
        luminanceThreshold: 0,
        luminanceSmoothing: 0,
      });
      const chroma = new ChromaticAberrationEffect({
        offset: new THREE.Vector2(chromaticAberration, chromaticAberration),
        radialModulation: true,
        modulationOffset: 0.0,
      });

      const pass = new EffectPass(camera, bloom, chroma);
      pass.renderToScreen = true;
      composer.addPass(pass);
    }

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.iResolution.value.set(
        container.clientWidth,
        container.clientHeight,
        renderer.getPixelRatio(),
      );
      composerRef.current?.setSize(
        container.clientWidth,
        container.clientHeight,
      );
    };

    window.addEventListener("resize", onResize);

    const tick = () => {
      const now = performance.now();
      const dt = 0.016;

      lookCurrent.current.copy(
        smoothDampVec2(
          lookCurrent.current,
          lookTarget.current,
          lookVel.current,
          smoothTime,
          maxSpeed,
          dt,
        ),
      );

      const skewScale = THREE.MathUtils.lerp(
        0.06,
        0.2,
        THREE.MathUtils.clamp(sensitivity, 0, 1),
      );
      const yBoost = THREE.MathUtils.lerp(
        1.2,
        1.6,
        THREE.MathUtils.clamp(sensitivity, 0, 1),
      );
      const tiltScale = THREE.MathUtils.lerp(
        0.12,
        0.3,
        THREE.MathUtils.clamp(sensitivity, 0, 1),
      );
      const yawScale = THREE.MathUtils.lerp(
        0.1,
        0.28,
        THREE.MathUtils.clamp(sensitivity, 0, 1),
      );

      const skew = new THREE.Vector2(
        lookCurrent.current.x * skewScale,
        -lookCurrent.current.y * yBoost * skewScale,
      );
      uniforms.uSkew.value.set(skew.x, skew.y);
      uniforms.uTilt.value = tiltCurrent.current * tiltScale;
      uniforms.uYaw.value = THREE.MathUtils.clamp(
        yawCurrent.current * yawScale,
        -0.6,
        0.6,
      );

      uniforms.iTime.value = now / 1000;

      renderer.clear(true, true, true);
      if (composerRef.current) {
        composerRef.current.render(dt);
      } else {
        renderer.render(scene, camera);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    // Mouse move to skew the scan.
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      lookTarget.current.set(nx, ny);
    };

    container.addEventListener("mousemove", onMove);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      composerRef.current?.dispose();
      composerRef.current = null;
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement)
        renderer.domElement.parentElement.removeChild(renderer.domElement);
    };
  }, [
    enablePost,
    bloomIntensity,
    chromaticAberration,
    linesColor,
    scanColor,
    gridScale,
    scanOpacity,
    noiseIntensity,
    lineThickness,
    lineJitter,
    scanGlow,
    scanSoftness,
    sensitivity,
  ]);

  return (
    <div
      ref={containerRef}
      className={"gridscan" + (className ? ` ${className}` : "")}
      style={style}
    >
      {showPreview && (
        <div className="gridscan__preview">
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            className="gridscan__video"
          />
          <div className="gridscan__badge">
            {enableWebcam ? "Face: scanning" : "Webcam disabled"}
          </div>
        </div>
      )}
    </div>
  );
}

function srgbColor(hex: string) {
  const c = new THREE.Color(hex);
  return c.convertSRGBToLinear();
}

function smoothDampVec2(
  current: any,
  target: any,
  currentVelocity: any,

  smoothTime: number,
  maxSpeed: number,
  deltaTime: number,
) {
  const out = current.clone();
  smoothTime = Math.max(0.0001, smoothTime);
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

  const change = current.clone().sub(target);
  const originalTo = target.clone();

  const maxChange = maxSpeed * smoothTime;
  if (change.length() > maxChange) change.setLength(maxChange);

  target = current.clone().sub(change);

  const temp = currentVelocity
    .clone()
    .addScaledVector(change, omega)
    .multiplyScalar(deltaTime);
  currentVelocity.sub(temp.clone().multiplyScalar(omega));
  currentVelocity.multiplyScalar(exp);

  out.copy(target.clone().add(change.add(temp).multiplyScalar(exp)));

  const origMinusCurrent = originalTo.clone().sub(current);
  const outMinusOrig = out.clone().sub(originalTo);
  if (origMinusCurrent.dot(outMinusOrig) > 0) {
    out.copy(originalTo);
    currentVelocity.set(0, 0);
  }
  return out;
}
