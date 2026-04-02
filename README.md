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
git clone https://github.com/your-username/drei-forge.git
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
│   │   └── EnvironmentAndStaging.tsx    # Study 01 — Environment & Staging
│   ├── App.tsx                          # Canvas setup with shadows enabled
│   └── main.tsx
├── public/
│   └── 1.hdr                           # HDR image for Environment
└── README.md
```

---

## 📚 Studies Index

| # | Concept | What I explored | Status |
|---|---|---|---|
| 01 | Environment & Staging | Lights, shadows, Sparkles, Stars, Cloud, Sky, Environment | ✅ Done |
| 02 | `Text` / `Text3D` | Rendering 2D and 3D text inside a scene | 📋 Planned |
| 03 | `useGLTF` | Loading external 3D models (.glb / .gltf files) | 📋 Planned |
| 04 | `useTexture` | Applying image textures to meshes | 📋 Planned |
| 05 | `Html` | Overlaying HTML elements inside a 3D scene | 📋 Planned |
| 06 | `OrbitControls` | Camera rotation, zoom, and pan | 📋 Planned |

> This list grows as I explore more. Suggestions welcome!

---

## 🔍 Study 01 — Environment & Staging

The first study covers everything related to **lighting, atmosphere, and environment** in a Three.js scene using Drei helpers.

### 💡 Lights

| Type | What it does |
|---|---|
| `ambientLight` | Adds soft light from all directions evenly |
| `directionalLight` | Mimics sunlight — has position, color, and intensity |

- Used `useHelper` from Drei + `THREE.DirectionalLightHelper` to **visualize where the light is** in the scene — super helpful when you can't see the light source.
- Enabled **shadows** by adding the `shadows` attribute to the `<Canvas>` tag in `App.tsx`.
- Used `castShadow` on the `directionalLight` and the box mesh, and `receiveShadow` on the plane mesh to get proper shadow rendering.

### ✨ Atmosphere Helpers

| Helper | What it does |
|---|---|
| `Sparkles` | Fills the scene with animated glowing particles. Key props: `count`, `color`, `opacity`, `scale`, `size` |
| `Stars` | Wraps the outside of the scene with star-like dots. Key props: `radius`, `depth`, `count`, `fade`, `speed` |
| `Cloud` | Renders volumetric-looking clouds. Needs light in the scene. Key props: `opacity`, `speed`, `segments` |
| `Sky` | Wraps the whole scene in a sky shader with a movable sun using `sunPosition` |
| `Environment` | The most powerful one — wraps the scene in an HDRI image for realistic reflections and lighting |

### 🌍 Environment — Two Ways to Use It

**With 6 cube map images:**
```tsx
<Environment
  background
  files={["./px.png", "./nx.png", "./py.png", "./ny.png", "./pz.png", "./nz.png"]}
/>
```

**With a single HDR image** (downloaded from [PolyHaven](https://polyhaven.com/)):
```tsx
<Environment background files={["./1.hdr"]} />
```

### 🗂️ Key Files

- **`App.tsx`** — Sets up the `<Canvas>` with `shadows` enabled and renders the `<Scene />` component.
- **`EnvironmentAndStaging.tsx`** — Contains all the lighting and environment experiments with detailed inline comments explaining each concept.

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
