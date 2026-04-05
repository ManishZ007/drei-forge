# 🔨 drei-forge

> Forging my 3D skills one drei helper at a time — a beginner's hands-on study of [`@react-three/drei`](https://github.com/pmndrs/drei).

---

## 📖 About

**drei-forge** is where I document my journey into 3D web development using **React Three Fiber** and its powerful companion library, **Drei**.

If you've ever opened the Drei docs and felt overwhelmed by the sheer number of helpers — you're not alone. This repo is my way of breaking it all down: each study is a small, focused experiment where I pick one concept, understand it from scratch, and build something with it.

No big projects here yet — just clean, isolated examples with detailed notes as I figure things out. Think of it as a personal reference book that grows as I learn.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React](https://react.dev/) | UI framework |
| [Three.js](https://threejs.org/) | 3D engine under the hood |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://drei.pmnd.rs/) | Ready-made helpers that make R3F easier |
| [Vite](https://vitejs.dev/) | Fast dev server & bundler |
| [Leva](https://github.com/pmndrs/leva) | GUI controls for tweaking values in real time |

---

## 🚀 Getting Started

Want to run these locally? Here's all you need:
```bash
# Clone the repo
git clone https://github.com/ManishZ007/drei-forge.git
cd drei-forge

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173` and explore each study from there.

---

## 📁 Project Structure
```
drei-forge/
├── src/
│   ├── components/
│   │   ├── Scene.tsx                          # Main scene entry point
│   │   ├── EnvironmentAndStaging.tsx          # Study 01 — Environment & Staging
│   │   ├── Camera.tsx                         # Study 02 — Camera
│   │   └── Controllers/
│   │       ├── GridController.tsx             # Study 03 — Grid
│   │       ├── CameraController.tsx           # Study 03 — CameraControls
│   │       ├── PresentationController.tsx     # Study 03 — PresentationControls
│   │       └── ScrollControllers.tsx          # Study 03 — ScrollControls
│   ├── App.tsx                                # Canvas setup
│   └── main.tsx
├── public/
│   ├── 1.hdr                                  # HDR image for Environment
│   └── model.gltf                             # 3D model for ScrollControls
└── README.md
```

---

## 📚 Studies Index

| # | Concept | What I explored | Status |
|---|---|---|---|
| 01 | Environment & Staging | Lights, shadows, Sparkles, Stars, Cloud, Sky, Environment, Lightformer, ground | ✅ Done |
| 02 | Camera | PerspectiveCamera, CubeCamera, reflective materials, orbit animation | ✅ Done |
| 03 | Controls | Grid, CameraControls, OrbitControls, PresentationControls, ScrollControls | ✅ Done |
| 04 | `Text` / `Text3D` | Rendering 2D and 3D text inside a scene | 📋 Planned |
| 05 | `useGLTF` | Loading external 3D models (.glb / .gltf files) | 📋 Planned |
| 06 | `useTexture` | Applying image textures to meshes | 📋 Planned |
| 07 | `Html` | Overlaying HTML elements inside a 3D scene | 📋 Planned |

> This list grows as I explore more. Suggestions welcome!

---

## 🔍 Study 01 — Environment & Staging

The first study covers everything related to **lighting, atmosphere, and environment** in a Three.js scene using Drei helpers.

### 💡 Lights

| Type | What it does |
|---|---|
| `ambientLight` | Adds soft light from all directions evenly |
| `directionalLight` | Mimics sunlight — has position, color, and intensity |

- Used `useHelper` from Drei + `THREE.DirectionalLightHelper` to **visualize where the light is** in the scene.
- Enabled **shadows** by adding the `shadows` attribute to the `<Canvas>` tag in `App.tsx`.
- Used `castShadow` on the `directionalLight` and the box mesh, and `receiveShadow` on the plane mesh.

### ✨ Atmosphere Helpers

| Helper | What it does |
|---|---|
| `Sparkles` | Fills the scene with animated glowing particles. Key props: `count`, `color`, `opacity`, `scale`, `size` |
| `Stars` | Wraps the outside of the scene with star-like dots. Key props: `radius`, `depth`, `count`, `fade`, `speed` |
| `Cloud` | Renders volumetric-looking clouds. Needs light in the scene. Key props: `opacity`, `speed`, `segments` |
| `Sky` | Wraps the whole scene in a sky shader with a movable sun using `sunPosition` |
| `Environment` | The most powerful one — wraps the scene in an HDRI image for realistic reflections and lighting |

### 🎨 Custom Lighting Inside Environment
```tsx
// Simple way — use a colored plane
<Environment background files={["./1.hdr"]}>
  <mesh position-z={-1}>
    <planeGeometry />
    <meshBasicMaterial color={"orange"} />
  </mesh>
</Environment>

// Drei way — use Lightformer for more control
<Environment background files={["./1.hdr"]}>
  <Lightformer position-z={-1} scale={2} color={"orange"} intensity={5} />
</Environment>
```

> Tip: Comment out the `files` attribute to see the reflection more clearly.

### 🌐 Ground Attribute
```tsx
<Environment
  background
  files={["./1.hdr"]}
  ground={{
    height: 6,
    radius: 60,
    scale: 70,
  }}
/>
```

- Use **Leva controls** to tweak `height`, `radius`, and `scale` in real time.
- When using `ground`, adjust the mesh `position-y` to `0` so the plane and ground align on the same axis.

### 🗂️ Key Files

- **`App.tsx`** — Sets up the `<Canvas>` and renders the `<Scene />` component.
- **`EnvironmentAndStaging.tsx`** — All lighting and environment experiments with detailed inline comments.

---

## 🔍 Study 02 — Camera

This study covers **camera types** and **real-time reflection** using Drei helpers, plus orbit animation using `useFrame`.

### 📷 Camera Helpers

| Helper | What it does |
|---|---|
| `PerspectiveCamera` | A human-eye-like camera — far things look smaller. `makeDefault` makes it the main scene camera |
| `CubeCamera` | Captures the scene from all 6 directions and returns a texture used for real-time reflections |

### 🔮 Reflective Sphere with CubeCamera
```tsx
<CubeCamera>
  {(texture) => (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        envMap={texture}
        roughness={0}
        metalness={0.9}
      />
    </mesh>
  )}
</CubeCamera>
```

- `roughness={0}` → perfectly smooth, mirror-like surface
- `metalness={0.9}` → highly metallic look

### 🌀 Orbit Animation with useFrame
```tsx
useFrame((state, delta) => {
  angle.current += delta * 0.5; // 0.5 controls orbit speed

  cubeRef.current.position.x = Math.cos(angle.current) * 3; // 3 is orbit radius
  cubeRef.current.position.z = Math.sin(angle.current) * 3;
});
```

`cos()` and `sin()` together trace a perfect circle over time — exactly like the Moon orbiting the Earth.

### 🗂️ Key Files

- **`App.tsx`** — Canvas set up with `antialias` and `alpha` enabled via the `gl` prop.
- **`Camera.tsx`** — Reflective sphere at the center with an orbiting purple cube animated each frame.

---

## 🔍 Study 03 — Controls

This study covers all the **control helpers** drei provides for interacting with and navigating a 3D scene.

### 🔲 Grid

`Grid` renders a reference grid in the scene — useful for visualizing scale and positioning objects.
```tsx
<Grid
  args={[30, 30]}
  cellSize={0.25}
  cellColor={"red"}
  sectionThickness={1.2}
  fadeDistance={20}
  fadeStrength={0.75}
/>
```

- `args` → `[frontLines, sideLines]` — controls how many lines appear in each direction
- `cellSize` / `cellColor` → size and color of individual cells
- `sectionSize` / `sectionColor` / `sectionThickness` → styling for the larger section dividers
- `fadeDistance` → distance at which the grid starts to fade out (default is 100)
- `fadeStrength` → how strong the fade effect is (1 = full fade, 0 = no fade)

### 🎥 CameraControls

`CameraControls` is a powerful programmatic camera controller. Unlike `OrbitControls`, you can drive it directly with code using a ref — rotate, truck, zoom, and set look-at positions on demand.
```tsx
const cameraControlRef = useRef<CameraControlsType>(null);

// Rotate horizontally by 45 degrees
cameraControlRef.current?.rotate(45 * DEG2RAD, 0, true);

// Truck (pan) the camera
cameraControlRef.current?.truck(1, 0, true);

// Zoom in
cameraControlRef.current?.zoom(0.25, true);

// Set exact position and look-at point
cameraControlRef.current?.setLookAt(0, 1, 3, 0, 0, 0, true);
```

- `smoothTime={0.25}` → controls how smoothly the camera transitions between positions
- Used **Leva `buttonGroup`** to wire up buttons for each camera action in the GUI
- `DEG2RAD` from `THREE.MathUtils` converts human-readable degrees into radians

### 🖱️ OrbitControls

`OrbitControls` lets the user freely rotate, zoom, and pan the scene using mouse or touch. It supports smooth damping and rotation limits.

| Prop | What it does |
|---|---|
| `enableDamping` | Adds smooth inertia to camera movement |
| `dampingFactor` | Controls smoothness — lower = smoother |
| `autoRotate` | Camera automatically rotates around the target |
| `autoRotateSpeed` | Controls speed of auto rotation |
| `maxAzimuthAngle` / `minAzimuthAngle` | Horizontal rotation limits (left/right) |
| `maxPolarAngle` / `minPolarAngle` | Vertical rotation limits (up/down) |

> Best for: product viewers, 3D showcases, or anywhere you want controlled camera angles.

### 🎪 PresentationControls

`PresentationControls` wraps a 3D object and lets the user drag to rotate it. When released, the object snaps back to its original position automatically — like inspecting a product.
```tsx
<PresentationControls
  global
  polar={[-Math.PI / 3, Math.PI / 3]}
  azimuth={[-Math.PI / 1.4, Math.PI / 2]}
  config={{ mass: 2, tension: 500 }}
  snap={{ mass: 4, tension: 1500 }}
>
  <mesh>
    <boxGeometry />
    <meshBasicMaterial color={"red"} />
  </mesh>
</PresentationControls>
```

- `global` → makes it work across the whole canvas like OrbitControls, not just on the mesh
- `polar` / `azimuth` → `[min, max]` rotation limits for vertical and horizontal axes
- `config` → controls drag behavior: `mass` = how heavy it feels, `tension` = how fast it reacts
- `snap` → controls the return-to-origin behavior after releasing: higher `tension` = snaps back faster

### 📜 ScrollControls

`ScrollControls` turns the scene into a scroll-driven experience. You can sync 3D objects and HTML content to the scroll position.
```tsx
<ScrollControls pages={3} damping={0.4} infinite horizontal>
  <Scroll>
    {/* 3D objects that move with scroll */}
    <primitive object={model.scene} position={[1.5, -1, 0]} scale={0.5} />
  </Scroll>
  <Scroll html>
    {/* HTML content that overlays the 3D scene */}
    <h1 style={{ position: "absolute", top: "60vh" }}>To</h1>
  </Scroll>
</ScrollControls>
```

- `pages` → how many scroll pages the scene spans
- `damping` → scroll delay — higher value = slower, more delayed scroll feel
- `infinite` → enables infinite looping scroll (make sure start and end designs match)
- `horizontal` → switches scroll direction to horizontal
- Use two separate `<Scroll>` tags — one for 3D objects, one with `html` for HTML overlays
- Objects placed inside `<ScrollControls>` but outside `<Scroll>` stay fixed and don't scroll
- Used `useGLTF` to load a `.gltf` model and placed it inside the scroll scene

### 🗂️ Key Files

- **`App.tsx`** — Canvas with `camera` position and `fov` set directly via the `camera` prop.
- **`Controllers/GridController.tsx`** — Grid helper study.
- **`Controllers/CameraController.tsx`** — CameraControls with Leva button groups.
- **`Scene.tsx`** — OrbitControls study with all configuration options explained in comments.
- **`Controllers/PresentationController.tsx`** — PresentationControls with snap and config.
- **`Controllers/ScrollControllers.tsx`** — ScrollControls with 3D model, images, and HTML overlay.

---

## 🧠 Why Drei?

When you start with React Three Fiber, a lot of common tasks — like adding camera controls, loading fonts, or setting up lighting — require quite a bit of boilerplate. **Drei** solves this by providing pre-built, well-tested helpers so you can focus on *what* you're building rather than *how* to wire it up.

For beginners especially, Drei is a huge quality-of-life upgrade.

---

## 🔗 Resources I'm Using

- [Drei Docs](https://drei.pmnd.rs/) — official helper reference
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber) — the R3F core
- [Three.js Docs](https://threejs.org/docs/) — what's under the hood
- [Three.js Journey](https://threejs-journey.com/) — highly recommended course for beginners
- [PolyHaven](https://polyhaven.com/) — free HDR images for Environment
- [Poimandres GitHub](https://github.com/pmndrs) — the team behind R3F & Drei

---

## 📄 License

MIT — feel free to use any of this for your own learning.
