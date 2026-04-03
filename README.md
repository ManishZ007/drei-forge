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
│   │   ├── Scene.tsx                    # Main scene entry point
│   │   ├── EnvironmentAndStaging.tsx    # Study 01 — Environment & Staging
│   │   └── Camera.tsx                   # Study 02 — Camera
│   ├── App.tsx                          # Canvas setup
│   └── main.tsx
├── public/
│   └── 1.hdr                           # HDR image for Environment
└── README.md
```

---

## 📚 Studies Index

| # | Concept | What I explored | Status |
|---|---|---|---|
| 01 | Environment & Staging | Lights, shadows, Sparkles, Stars, Cloud, Sky, Environment, Lightformer, ground | ✅ Done |
| 02 | Camera | PerspectiveCamera, CubeCamera, reflective materials, orbit animation | ✅ Done |
| 03 | `Text` / `Text3D` | Rendering 2D and 3D text inside a scene | 📋 Planned |
| 04 | `useGLTF` | Loading external 3D models (.glb / .gltf files) | 📋 Planned |
| 05 | `useTexture` | Applying image textures to meshes | 📋 Planned |
| 06 | `Html` | Overlaying HTML elements inside a 3D scene | 📋 Planned |
| 07 | `OrbitControls` | Camera rotation, zoom, and pan | 📋 Planned |

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

You can place a mesh or a `<Lightformer />` inside the `<Environment>` tag to create custom light sources that reflect onto objects in the scene.
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

Adding the `ground` attribute to `<Environment>` wraps the scene in a projected circle that looks like a real ground surface.
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

- Use **Leva controls** to tweak `height`, `radius`, and `scale` in real time to find the right values for your scene.
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

`CubeCamera` renders the surroundings into a texture and passes it to its children via a render prop pattern. That texture is applied as `envMap` on the material to create a real-time mirror effect.
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

The cube orbits around the sphere using `useFrame` and basic circle math:
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
