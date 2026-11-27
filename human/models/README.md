# Anatomy model assets

The real male and female GLB files are currently delivered from the version-pinned jsDelivr package:

- Male: `https://cdn.jsdelivr.net/npm/open-anatomy-3d@0.1.0/models/anatomy-male.glb` (~7.6 MB)
- Female: `https://cdn.jsdelivr.net/npm/open-anatomy-3d@0.1.0/models/anatomy-female.glb` (~8.1 MB)
- Catalog: `https://cdn.jsdelivr.net/npm/open-anatomy-3d@0.1.0/catalog.json`

The GLB models use `EXT_meshopt_compression`; the viewer loads them with Three.js `MeshoptDecoder`.

## Licence and credit

The models and catalog are licensed CC BY 4.0. They are adapted from BodyParts3D (DBCLS), Human Reference Atlas 3D Reference Organs (HuBMAP) and MakeHuman (CC0). The exact credit line and source details are in [../ATTRIBUTION.md](../ATTRIBUTION.md). Keep attribution visible whenever these models are shown or redistributed.

## Coverage limitations

The source catalog contains 147 structures across seven model layers. It groups the skeleton into 28 named structures and muscles into 41 named regions. These are not 206 individually selectable bones or every individual muscle. The female model is a composite reference with different source coverage from the male model. Both are for educational visualization only.

The website currently uses the external versioned CDN URLs rather than storing binary model files in this repository. This avoids adding roughly 16 MB of binary assets to the website repository, but requires an internet connection and depends on the CDN.
