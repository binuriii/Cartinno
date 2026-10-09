```vue
<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  color: {
    type: String,
    default: '#D7454E'
  },
  speed: {
    type: Number,
    default: 1.2
  },
  scale: {
    type: Number,
    default: 1.2
  },
  noiseIntensity: {
    type: Number,
    default: 1.2
  },
  rotation: {
    type: Number,
    default: 0
  },
  lightMode: {
    type: Boolean,
    default: true
  }
})

const container = ref(null)

let renderer
let scene
let camera
let material
let mesh
let animationId
let resizeObserver
let clock

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix *
      modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uColor;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uRotation;
  uniform float uNoiseIntensity;
  uniform float uLightMode;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(
      sin(dot(p, vec2(127.1, 311.7))) *
      43758.5453123
    );
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(
      mix(a, b, f.x),
      mix(c, d, f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uResolution.x / max(uResolution.y, 1.0);

    float c = cos(uRotation);
    float s = sin(uRotation);

    uv = mat2(c, -s, s, c) * uv;

    vec2 p = uv * uScale;
    float t = uTime * uSpeed;

    float wave1 = sin(
      p.x * 3.2 + sin(p.y * 2.4 - t * 0.6) + t
    );

    float wave2 = cos(
      p.y * 4.0 - p.x * 1.7 + t * 0.65
    );

    float wave3 = sin(
      (p.x + p.y) * 2.0 +
      cos(p.x * 2.0 - t * 0.4)
    );

    float pattern = (
      wave1 * 0.42 +
      wave2 * 0.32 +
      wave3 * 0.26
    );

    pattern = smoothstep(-1.0, 1.0, pattern);

    float fineNoise = noise(uv * 170.0) - 0.5;

    vec3 darkRed = uColor * 0.52;
    vec3 baseRed = uColor;
    vec3 lightRed = min(uColor * 1.32, vec3(1.0));

    float folds = smoothstep(0.12, 0.88, pattern);

    vec3 silk = mix(darkRed, lightRed, folds);

    float highlight = pow(
      max(0.0, sin(pattern * 3.14159)),
      8.0
    );

    silk = mix(silk, vec3(1.0, 0.76, 0.77),
      highlight * 0.15 * uLightMode);

    silk = mix(silk, baseRed, 0.2);

    silk += fineNoise * uNoiseIntensity * 0.035;

    float edgeShade = smoothstep(
      0.0, 0.8, uv.y + 0.3
    );

    silk *= 0.86 + edgeShade * 0.14;

    gl_FragColor = vec4(
      clamp(silk, 0.0, 1.0),
      1.0
    );
  }
`

function updateColor() {
  if (material) {
    material.uniforms.uColor.value.set(props.color)
  }
}

function resize() {
  if (!container.value || !renderer) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  if (!width || !height) return

  renderer.setSize(width, height, false)

  if (material) {
    material.uniforms.uResolution.value.set(width, height)
  }
}

function animate() {
  if (!renderer || !scene || !camera || !material) return

  animationId = requestAnimationFrame(animate)

  material.uniforms.uTime.value = clock.getElapsedTime()
  material.uniforms.uSpeed.value = props.speed
  material.uniforms.uScale.value = props.scale
  material.uniforms.uRotation.value = props.rotation
  material.uniforms.uNoiseIntensity.value = props.noiseIntensity
  material.uniforms.uLightMode.value = props.lightMode ? 1 : 0

  renderer.render(scene, camera)
}

onMounted(() => {
  if (!container.value) return

  try {
    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    clock = new THREE.Clock()

    renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: 'low-power'
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(props.color, 1)

    container.value.appendChild(renderer.domElement)

    material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(props.color) },
        uSpeed: { value: props.speed },
        uScale: { value: props.scale },
        uRotation: { value: props.rotation },
        uNoiseIntensity: { value: props.noiseIntensity },
        uLightMode: { value: props.lightMode ? 1 : 0 },
        uResolution: { value: new THREE.Vector2(1, 1) }
      },
      vertexShader,
      fragmentShader
    })

    mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      material
    )

    scene.add(mesh)

    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container.value)

    resize()
    animate()
  } catch (error) {
    console.error('Unable to initialize silk background:', error)
    container.value.style.background = props.color
  }
})

watch(
  () => props.color,
  (value) => {
    updateColor()

    if (renderer) {
      renderer.setClearColor(value, 1)
    }
  }
)

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  resizeObserver?.disconnect()

  if (mesh) {
    mesh.geometry.dispose()
  }

  material?.dispose()
  renderer?.dispose()

  if (renderer?.domElement?.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement)
  }
})
</script>

<template>
  <div
    ref="container"
    class="silk-background"
    aria-hidden="true"
  />
</template>

<style scoped>
.silk-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: #d7454e;
}

.silk-background :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
```
