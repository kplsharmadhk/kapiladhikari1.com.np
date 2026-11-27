# Human Anatomy — Interactive 3D Learning Atlas

Public route: https://kapiladhikari1.com.np/human/

## Current implementation
- Real 3D adult male and female reference models loaded as compressed GLB files.
- 147 catalogued anatomical structures across 7 model layers (skin, skeleton, joints, muscles, organs, vessels and nerves). The sex-specific catalog contains 140 male and 145 female structures.
- 12 learning categories: cardiovascular, respiratory, digestive, neurological, renal/urinary, musculoskeletal, endocrine, eye/sensory, reproductive, oral/ENT, immune/lymphatic and skin.
- Selectable structures, search, layer visibility, front/side/back views, orbit, zoom and auto-rotation.
- A simple illustrative heart/lung scale animation. This is not a physiological simulation.
- A 12-question knowledge check with randomized answer order, score, best score and attempt count saved in the current browser.

## Important anatomical scope limits
This is a visual learning reference, not a clinical or diagnostic tool. The current source model groups the skeleton into 28 named skeletal structures; it does **not** provide 206 separately selectable bone meshes. Likewise, its 41 muscle groups are grouped regions, not every individual muscle. Do not advertise it as a complete bone-by-bone or muscle-by-muscle atlas. A separate detailed anatomical dataset and expert validation are required to meet that specification.

The male model is adapted from BodyParts3D. The female model uses a MakeHuman base body with fitted BodyParts3D anatomy and selected Human Reference Atlas female organs. The two bodies are not equivalent scans and do not represent every human variation. The female model is a reference/teaching model, not an individually validated clinical model.

## Model delivery and cost
The two GLB models (about 7.6 MB and 8.1 MB) and catalog are served by jsDelivr from the versioned `open-anatomy-3d@0.1.0` package. This avoids Firebase Storage/Firestore for model delivery; users need an internet connection. CDN availability and bandwidth are outside this website's control.

## Licensing and attribution
See [ATTRIBUTION.md](./ATTRIBUTION.md) and [models/README.md](./models/README.md). Model assets are CC BY 4.0 and require visible attribution, a licence link and disclosure of modifications. The application code in this folder is original project code. Third-party libraries retain their own licences.

## Local testing
Serve this directory over HTTP (not `file://`). Three.js modules, the model catalog and GLB assets are loaded from jsDelivr. Check both male and female model loading on mobile and desktop before public promotion.
