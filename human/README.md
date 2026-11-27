# Human Anatomy — Interactive 3D Learning Atlas

An isolated static module for https://kapiladhikari1.com.np/human/. Existing homepage, news, LokSewaX and other sections are not changed.

## Implemented in this first pass
- Responsive desktop/mobile interface.
- Three.js 3D viewport with orbit, zoom, front/side/back views and auto-rotation.
- Layer controls for skin, simplified muscle groups, skeleton overview and organ overview.
- Clickable preview structures with Nepali anatomy notes.
- Body-system navigation and search.
- Optional GLB loading from models/full-body.glb.

## Scientific and asset limitation
The included procedural 3D body is a **simplified teaching preview**, not a clinically accurate or photorealistic anatomical model. The muscle, bone and organ meshes are placeholders. Do not use it as a medical reference.

To reach the requested realistic/scientific quality, add a licensed, reviewed GLB/GLTF model with separately named meshes for skin, muscles, bones and organs. The current loader only provides a full-body GLB entry point; mesh visibility, organ picking, labels and animation tracks must be mapped to the selected asset.

Before publishing any model:
1. Verify the exact redistribution and web-hosting license.
2. Include required attribution and license notices.
3. Optimize geometry and textures for mobile devices.
4. Have anatomy naming and educational content reviewed by a qualified subject expert.
5. Never assume visual realism proves scientific accuracy.

## Local preview
Serve this folder using a static HTTP server. JavaScript ES modules should not be opened directly from file://. Three.js is loaded from jsDelivr CDN and requires internet access on first load.

## Files
- index.html — app shell
- styles.css — responsive design
- app.js — Three.js viewer and interactions
- models/ — reserved for licensed GLB/GLTF assets
