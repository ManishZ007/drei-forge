# 🔬 drei-lab

> Learning 3D on the web, one helper at a time — a beginner's hands-on study of [`@react-three/drei`](https://github.com/pmndrs/drei).

---

## 📖 About

**drei-lab** is where I document my journey into 3D web development using **React Three Fiber** and its powerful companion library, **Drei**.

If you've ever opened the Drei docs and felt overwhelmed by the sheer number of helpers — you're not alone. This repo is my way of breaking it all down: each study is a small, focused experiment where I pick one concept, understand it from scratch, and build something with it.

No big projects here yet — just clean, isolated examples with notes as I figure things out. Think of it as a personal reference book that grows as I learn.

---

## 🛠️ Tech Stack

| Tool                                                         | Purpose                                 |
| ------------------------------------------------------------ | --------------------------------------- |
| [React](https://react.dev/)                                  | UI framework                            |
| [Three.js](https://threejs.org/)                             | 3D engine under the hood                |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js             |
| [@react-three/drei](https://drei.pmnd.rs/)                   | Ready-made helpers that make R3F easier |
| [Vite](https://vitejs.dev/)                                  | Fast dev server & bundler               |

---

## 🚀 Getting Started

Want to run these locally? Here's all you need:

```bash
# Clone the repo
git clone https://github.com/your-username/drei-lab.git
cd drei-lab

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173` and explore each study from there.

---

## 📁 Project Structure

```
drei-lab/
├── src/
│   ├── studies/
│   │   ├── 01-orbit-controls/     # First step — moving the camera around
│   │   ├── 02-environment/        # Adding lighting and backgrounds easily
│   │   ├── 03-text/               # Rendering 3D text in a scene
│   │   ├── 04-loaders/            # Loading 3D models and textures
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
├── public/
└── README.md
```

Each study folder has its own self-contained scene so nothing bleeds into another.

---

## 📚 Studies Index

| #   | Concept              | What I learned                                     | Status         |
| --- | -------------------- | -------------------------------------------------- | -------------- |
| 01  | `OrbitControls`      | How to let users rotate, zoom, and pan the camera  | ✅ Done        |
| 02  | `Environment`        | Adding HDRI lighting to make scenes look realistic | 🚧 In Progress |
| 03  | `Text` / `Text3D`    | Rendering 2D and 3D text inside a Three.js scene   | 📋 Planned     |
| 04  | `useGLTF`            | Loading external 3D models (.glb / .gltf files)    | 📋 Planned     |
| 05  | `useTexture`         | Applying image textures to meshes                  | 📋 Planned     |
| 06  | `Html`               | Overlaying regular HTML elements inside a 3D scene | 📋 Planned     |
| 07  | `Stars` / `Sparkles` | Adding particle effects with zero setup            | 📋 Planned     |
| 08  | `MeshWobbleMaterial` | Fun material that makes meshes wobble and animate  | 📋 Planned     |

> This list grows as I explore more. Suggestions welcome!

---

## 🧠 Why Drei?

When you start with React Three Fiber, a lot of common tasks — like adding camera controls, loading fonts, or setting up lighting — require quite a bit of boilerplate. **Drei** solves this by providing pre-built, well-tested helpers so you can focus on _what_ you're building rather than _how_ to wire it up.

For beginners especially, Drei is a huge quality-of-life upgrade.

---

## 🔗 Resources I'm Using

- [Drei Docs](https://drei.pmnd.rs/) — official helper reference
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber) — the R3F core
- [Three.js Docs](https://threejs.org/docs/) — what's under the hood
- [Three.js Journey](https://threejs-journey.com/) — highly recommended course for beginners
- [Poimandres GitHub](https://github.com/pmndrs) — the team behind R3F & Drei

---

## 📄 License

MIT — feel free to use any of this for your own learning.
