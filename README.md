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
| [maath](https://github.com/pmndrs/maath) | Math utilities by pmndrs — used for `easing.damp` |

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
│   │   ├── Scene.tsx                                    # Main scene entry point
│   │   ├── EnvironmentAndStaging.tsx                    # Study 01 — Environment & Staging
│   │   ├── Camera.tsx                                   # Study 02 — Camera
│   │   ├── Controllers/
│   │   │   ├── GridController.tsx                       # Study 03 — Grid
│   │   │   ├── CameraController.tsx                     # Study 03 — CameraControls
│   │   │   ├── PresentationController.tsx               # Study 03 — PresentationControls
│   │   │   ├── ScrollControllers.tsx                    # Study 03 — ScrollControls
│   │   │   ├── TransformController.tsx                  # Study 03 — TransformControls
│   │   │   ├── PivotController.tsx                      # Study 03 — PivotControls
│   │   │   ├── Text3D.tsx                               # Study 04 — Text3D
│   │   │   └── PositionAudioController.tsx              # Study 05 — PositionalAudio
│   │   ├── Shaders/
│   │   │   ├── MeshReflectorMaterialSection.tsx         # Study 06 — MeshReflectorMaterial
│   │   │   ├── MeshWobbleMaterialSection.tsx            # Study 06 — MeshWobbleMaterial
│   │   │   ├── MeshDistortMaterialSection.tsx           # Study 06 — MeshDistortMaterial
│   │   │   └── MeshRefractionMaterialSection.tsx        # Study 06 — MeshRefractionMaterial
│   │   └── MainMaterial/
│   │       └── MeshPortalMaterialSection.tsx            # Study 07 — MeshPortalMaterial
│   ├── App.tsx                                          # Canvas setup
│   └── main.tsx
├── public/
│   ├── 1.hdr                                            # HDR image for Environment
│   ├── 1.glb                                            # 3D model for MeshPortalMaterial
│   ├── 1.png                                            # Texture for MeshPortalMaterial
│   ├── fonts/
│   │   └── bold.ttf                                     # Custom font for Text component
│   └── model.gltf                                       # 3D model for ScrollControls
└── README.md
```

---

## 📚 Studies Index

| # | Concept | What I explored | Status |
|---|---|---|---|
| 01 | Environment & Staging | Lights, shadows, Sparkles, Stars, Cloud, Sky, Environment, Lightformer, ground | ✅ Done |
| 02 | Camera | PerspectiveCamera, CubeCamera, reflective materials, orbit animation | ✅ Done |
| 03 | Controls | Grid, CameraControls, OrbitControls, PresentationControls, ScrollControls, TransformControls, PivotControls | ✅ Done |
| 04 | Text / Text3D | Rendering 2D and 3D text inside a scene | ✅ Done |
| 05 | PositionalAudio | Playing sound at a specific position in 3D space | ✅ Done |
| 06 | Shaders | MeshReflectorMaterial, MeshWobbleMaterial, MeshDistortMaterial, MeshRefractionMaterial | ✅ Done |
| 07 | Materials | MeshPortalMaterial — portals, easing.damp, CameraControls animation | ✅ Done |

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

cameraControlRef.current?.rotate(45 * DEG2RAD, 0, true);   // horizontal rotate
cameraControlRef.current?.truck(1, 0, true);                // pan the camera
cameraControlRef.current?.zoom(0.25, true);                 // zoom in
cameraControlRef.current?.setLookAt(0, 1, 3, 0, 0, 0, true); // set position + look-at
```

- `smoothTime={0.25}` → controls how smoothly the camera transitions between positions
- Used **Leva `buttonGroup`** to wire up buttons for each camera action in the GUI
- `DEG2RAD` from `THREE.MathUtils` converts human-readable degrees into radians

### 🖱️ OrbitControls

`OrbitControls` lets the user freely rotate, zoom, and pan the scene using mouse or touch. Add `makeDefault` when using it alongside `TransformControls` so the camera doesn't move while dragging objects.

| Prop | What it does |
|---|---|
| `makeDefault` | Registers as the default camera controller — required when using TransformControls |
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
- `config` → drag behavior: `mass` = how heavy it feels, `tension` = how fast it reacts
- `snap` → return-to-origin behavior after releasing: higher `tension` = snaps back faster

### 📜 ScrollControls

`ScrollControls` turns the scene into a scroll-driven experience. You can sync 3D objects and HTML content to the scroll position.
```tsx
<ScrollControls pages={3} damping={0.4} infinite horizontal>
  <Scroll>
    <primitive object={model.scene} position={[1.5, -1, 0]} scale={0.5} />
  </Scroll>
  <Scroll html>
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

### 🛠️ TransformControls

`TransformControls` adds a **gizmo** (axis handles) directly onto a mesh so you can move, rotate, or scale it interactively in the scene.
```tsx
<TransformControls position={[2, 0, 0]} mode="scale">
  <mesh>
    <boxGeometry />
    <meshNormalMaterial />
  </mesh>
</TransformControls>
```

- Wrap any mesh inside `<TransformControls>` to attach the gizmo to it
- `mode` controls what the gizmo does — `"translate"` (default), `"rotate"`, or `"scale"`
- The gizmo drives the object — move the gizmo and the mesh follows
- Always add `makeDefault` to `<OrbitControls>` in the parent when using TransformControls, otherwise dragging the gizmo will also move the camera
- `position` on `TransformControls` moves the gizmo itself, not the mesh

### 🔵 PivotControls

`PivotControls` is similar to `TransformControls` but more polished — it lets you move, rotate, and scale all in one without switching modes.
```tsx
<PivotControls
  anchor={[-1, 0, 0]}
  depthTest={false}
  axisColors={["red", "green", "blue"]}
  lineWidth={7}
  scale={2}
>
  <mesh>
    <boxGeometry />
    <meshNormalMaterial />
  </mesh>
</PivotControls>
```

- `anchor` → positions the pivot handle relative to the mesh — values range from `-1` to `1` on each axis
- `depthTest={false}` → prevents the gizmo from being hidden behind the mesh so it's always accessible
- `axisColors` → custom colors for each axis: index `0` = X, `1` = Y, `2` = Z — helps you identify axes at a glance
- `lineWidth` → increases the thickness of the axis lines
- `scale` → upscales the entire gizmo size for easier interaction

### 🗂️ Key Files

- **`App.tsx`** — Canvas with `camera` position and `fov` set via the `camera` prop.
- **`Scene.tsx`** — OrbitControls with `makeDefault` — required for TransformControls and PivotControls to work correctly.
- **`Controllers/GridController.tsx`** — Grid helper study.
- **`Controllers/CameraController.tsx`** — CameraControls with Leva button groups.
- **`Controllers/PresentationController.tsx`** — PresentationControls with snap and config.
- **`Controllers/ScrollControllers.tsx`** — ScrollControls with 3D model, images, and HTML overlay.
- **`Controllers/TransformController.tsx`** — TransformControls with translate, rotate, and scale modes.
- **`Controllers/PivotController.tsx`** — PivotControls with anchor, depthTest, and axis color customization.

---

## 🔍 Study 04 — Text / Text3D

This study covers rendering **2D flat text and extruded 3D text** inside a Three.js scene.

- `Text` from Drei renders flat billboard-style text using a `.ttf` font file.
- `Text3D` renders fully extruded 3D text with depth — great for titles and hero sections.
- `toneMapped={false}` on the material keeps text color pure and unaffected by scene lighting.
- For `Text3D`, use `<Center>` from Drei to automatically center the text geometry around the origin.

### 🗂️ Key Files

- **`Controllers/Text3D.tsx`** — Text and Text3D experiments with font loading and material setup.

---

## 🔍 Study 05 — PositionalAudio

This study covers **playing sound at a specific 3D position** in the scene — volume changes based on how close the camera is to the sound source.

- `PositionalAudio` from Drei attaches a spatial audio source to any mesh.
- The closer the camera gets to the mesh, the louder the sound plays.
- Great for immersive experiences — footsteps, ambient sounds, interactive objects.

### 🗂️ Key Files

- **`Controllers/PositionAudioController.tsx`** — PositionalAudio with a mesh-attached sound source.

---

## 🔍 Study 06 — Shaders (Special Materials)

This study covers Drei's **built-in shader materials** that go beyond basic PBR — they add visual effects like reflections, wobbling, distortion, and refraction directly on mesh surfaces.

> **Important:** All shader materials need enough geometry segments to look good. More segments = more vertices = smoother visual effects. This is why you'll see high segment counts like `32` or `64` throughout this study.

### 🪞 MeshReflectorMaterial

Creates a **mirror-like reflective floor** that reflects the scene above it.

```tsx
<mesh rotation-x={-Math.PI * 0.5} position-y={-0.75}>
  <planeGeometry args={[6, 6]} />
  <MeshReflectorMaterial
    side={THREE.DoubleSide}
    resolution={3995}
    color={"gray"}
    blur={[1000, 1000]}
    mixBlur={1}
    mirror={1}
  />
</mesh>
```

| Prop | What it does |
|---|---|
| `resolution` | Reflection texture quality — higher = sharper but more GPU cost |
| `blur` | `[horizontal, vertical]` — blurs the reflection for a frosted/soft look |
| `mixBlur` | How much the blur mixes in (0 = sharp, 1 = full blur) |
| `mirror` | Reflection strength (0 = no reflection, 1 = full mirror) |
| `side={THREE.DoubleSide}` | Renders both faces of the plane |

- `rotation-x={-Math.PI * 0.5}` rotates the plane flat (horizontal).
- Requires `<ambientLight />` and an `<Environment>` for proper reflections.

### 🌊 MeshWobbleMaterial

Animates a mesh so it **continuously wobbles and waves** like jelly.

```tsx
<mesh>
  <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
  <MeshWobbleMaterial color={"#F26E53"} factor={3} speed={3} />
</mesh>
```

| Prop | What it does |
|---|---|
| `factor` | Wobble strength — how far vertices move from their original position |
| `speed` | How fast the wobble animation plays |

**Why `32` segments in boxGeometry?**
MeshWobbleMaterial works by displacing vertices. A box with only `1` segment per face has just 4 corners to move — the wobble looks blocky. With `32` segments, each face has 1024+ vertices, making the wobble smooth and organic.

### 🌀 MeshDistortMaterial

Distorts a mesh using **Simplex noise** — hover-driven animation with smooth `lerp` transitions.

```tsx
<mesh ref={planeRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
  <planeGeometry args={[2, 3, 64, 64]} />
  <MeshDistortMaterial color={"#F26E53"} speed={2} distort={0}>
    <GradientTexture colors={["aquamarine", "hotpink"]} stops={[0, 1]} />
  </MeshDistortMaterial>
</mesh>
```

| Prop | What it does |
|---|---|
| `distort` | Distortion strength (0 = flat, 1 = heavily distorted) |
| `speed` | How fast the noise pattern moves — does NOT affect distort strength |
| `radius` | Scales the noise field — lower = tighter ripples, higher = broader waves |

**Animation with `THREE.MathUtils.lerp`:**
```tsx
useFrame(() => {
  planeRef.current.material.distort = lerp(
    planeRef.current.material.distort, // current value
    hover ? 0.4 : 0,                   // target value
    hover ? 0.05 : 0.01                // speed (5% in, 1% out per frame)
  );
});
```

`lerp(start, end, t)` = `start + (end - start) * t`

It moves a percentage of the remaining distance every frame — giving a natural ease-out feel. Using different `t` values for hover-in (`0.05`) vs hover-out (`0.01`) makes the exit feel lazy and satisfying.

**`GradientTexture`** creates a gradient directly in JSX — no image file needed. `colors` sets the color stops and `stops` sets their positions from `0` to `1`.

### 🔮 MeshRefractionMaterial

Simulates **light bending through glass** — creates a crystal/diamond-like refraction effect on meshes.

- Uses environment maps to calculate how light bends as it passes through the geometry.
- Works best with `<Environment>` providing the light to refract.
- Combine with complex geometries (like diamonds or gems) for impressive results.

### 🗂️ Key Files

- **`Shaders/MeshReflectorMaterialSection.tsx`** — Reflective floor with HDR environment.
- **`Shaders/MeshWobbleMaterialSection.tsx`** — Wobbling jelly cube with high segment count.
- **`Shaders/MeshDistortMaterialSection.tsx`** — Hover-driven distortion with lerp + GradientTexture.
- **`Shaders/MeshRefractionMaterialSection.tsx`** — Glass-like refraction effect.

---

## 🔍 Study 07 — Materials (MeshPortalMaterial)

This study covers **MeshPortalMaterial** — Drei's most impressive material that renders an entirely separate 3D world inside the surface of a mesh, like a window or portal to another dimension.

### 🌀 How the Portal Works

```tsx
<RoundedBox args={[3, 4, 0.1]} radius={0.1} onDoubleClick={() => setActive(!active)}>
  <MeshPortalMaterial ref={meshPortalMaterialRef}>
    {/* Everything here is rendered INSIDE the portal */}
    <primitive object={model.scene} scale={0.6} position-y={0.6} />
    <mesh>
      <sphereGeometry args={[5, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  </MeshPortalMaterial>
</RoundedBox>
```

The `blend` property controls visibility of the portal world:
- `blend=0` → portal world invisible, mesh shows as normal surface
- `blend=1` → portal world fully visible, you can see inside

**The sky sphere trick:** A large sphere (`radius=5`) with `side={THREE.BackSide}` wraps the entire portal world — it renders the texture on its inside face, acting as the sky/background.

### ⚡ easing.damp — Physics-Based Animation

```tsx
useFrame((_, delta) => {
  easing.damp(
    meshPortalMaterialRef.current,  // target object
    "blend",                         // property to animate
    active ? 1 : 0,                  // goal value
    0.2,                             // damping factor
    delta,                           // frame time (makes it fps-independent)
  );
});
```

`easing.damp` from `maath` is like `lerp` but framerate-independent — it uses `delta` (time since last frame) so the animation always takes the same real-world time regardless of whether you're on a 30fps or 120fps screen.

| | `lerp` | `easing.damp` |
|---|---|---|
| Speed | Fixed % per frame | Time-based (uses delta) |
| Framerate | Depends on FPS | Independent |
| Feel | Mechanical | Organic / springy |

**Critical:** Do NOT set `blend={active ? 1 : 0}` in JSX at the same time as using `easing.damp` — the JSX would override `damp` every render, breaking the smooth animation. Use a `ref` only.

### 📷 Camera Animation with setLookAt

```tsx
useEffect(() => {
  if (active) {
    cameraControlsRef.current.setLookAt(0, 0, 3, 0, 0, 0, true); // zoom in
  } else {
    cameraControlsRef.current.setLookAt(0, 0, 5, 0, 0, 0, true); // pull back
  }
}, [active]);
```

`setLookAt(posX, posY, posZ, targetX, targetY, targetZ, animate)` moves the camera to a position AND points it at a target. The last `true` argument enables smooth animation handled internally by `CameraControls`.

- `useEffect` is used here (not `useFrame`) because the camera only needs to move **once** when `active` changes, not every frame.

### 🗂️ Key Files

- **`MainMaterial/MeshPortalMaterialSection.tsx`** — Full portal scene with double-click interaction, easing.damp blend animation, and CameraControls zoom.

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
- [maath](https://github.com/pmndrs/maath) — math utilities used for easing.damp

---

## 📄 License

MIT — feel free to use any of this for your own learning.

---

> 💡 **Keep going.** Every confusing concept you push through — a weird shader, a lerp that finally clicks, a portal that renders for the first time — that's real progress. The 3D web is one of the most creative spaces in frontend right now, and you're building the foundation to do incredible things in it. One helper at a time. You've got this. 🚀
