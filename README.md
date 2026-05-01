# Studio Iyan VPM Repository

This repository publishes the VPM listings for Studio Iyan Unity and VRChat editor tools.

Users can choose one of these options:

- Add the full Studio Iyan listing and see every Studio Iyan package in VCC.
- Add a single-tool listing and only see the specific tool they want.

The full listing only exposes packages. It does not automatically install every package. If a future "install all tools" option is needed, it should be implemented as a separate meta package, not by forcing dependencies into every tool package.

## VPM Listing URLs

| Listing | VCC Add URL | Manual URL |
| --- | --- | --- |
| Full Studio Iyan VPM | [Add Studio Iyan VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/vpm.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/vpm.json` |
| Full Studio Iyan VPM alias | [Add Studio Iyan VPM Alias](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/index.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/index.json` |
| Plane Fit To Camera only | [Add Plane Fit To Camera VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/plane-fit-to-camera.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/plane-fit-to-camera.json` |
| MA Blendshape Sync Auto Setup only | [Add MA Blendshape Sync Auto Setup VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/ma-blendshape-sync-auto-setup.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/ma-blendshape-sync-auto-setup.json` |
| Hierarchy Plus Rebone only | [Add Hierarchy Plus Rebone VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/hierarchy-plus-rebone.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/hierarchy-plus-rebone.json` |
| Prefab Material Remapper only | [Add Prefab Material Remapper VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/prefab-material-remapper.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/prefab-material-remapper.json` |
| UV Mask Tool only | [Add UV Mask Tool VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/uv-mask-tool.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/uv-mask-tool.json` |

## Available Packages

| Package | Package ID | Listings |
| --- | --- | --- |
| Plane Fit To Camera Tool | `com.iyankim.planefittocamera` | Full, single-tool |
| MA Blendshape Sync Auto Setup | `com.iyankim.mablendshapesyncautosetup` | Full, single-tool |
| Hierarchy Plus Rebone | `com.iyankim.hierarchyplusrebone` | Full, single-tool |
| Prefab Material Remapper | `com.iyankim.prefabmaterialremapper` | Full, single-tool |
| Studio Iyan UV Mask Tool | `com.iyankim.uvmasktool` | Full, single-tool |

## Tool Summaries

### Plane Fit To Camera Tool

Repository: <https://github.com/Yunhyuk-Jeong/vpm-plane-fit-to-camera>

A Unity Editor tool that fits Unity Plane or plane-like meshes to the current Camera view. It supports Perspective and Orthographic cameras, multiple Plane objects, manual distance control, square mode, view-space rotation, KR/EN/JP UI, and Undo.

### MA Blendshape Sync Auto Setup

Repository: <https://github.com/Yunhyuk-Jeong/vpm-ma-blendshape-sync-auto-setup>

A Unity Editor tool that automatically configures Modular Avatar Blendshape Sync components across target objects. It detects common blendshapes between source and target meshes and supports multiple targets, drag and drop, recursive child processing, preview, KR/EN/JP UI, and Undo.

### Hierarchy Plus Rebone

Repository: <https://github.com/Yunhyuk-Jeong/vpm-hierarchy-plus-rebone>

An editor-only rebuild of the discontinued HierarchyPlus tool for Unity 2022.3+ and VPM/VCC distribution. It adds hierarchy depth colors, guide lines, component icons, tag/layer labels, regex filtering, saved settings, and namespace-safe code.

### Prefab Material Remapper

Repository: <https://github.com/Yunhyuk-Jeong/vpm-prefab-material-remapper>

An editor-only prefab material remapping tool that brings an FBX-style material remapping workflow to Prefab assets. It remaps materials by material slot name across `MeshRenderer` and `SkinnedMeshRenderer`, edits Prefab Assets safely, and supports KR/EN/JP UI.

### Studio Iyan UV Mask Tool

Repository: <https://github.com/Yunhyuk-Jeong/vpm-uv-mask-tool>

An editor-only UV mask generation tool that selects UV islands from a renderer material slot and exports PNG mask textures. It supports `MeshRenderer`, `SkinnedMeshRenderer`, automatic UV channel detection, island selection tools, Scene View highlighting, padding, anti-aliasing, custom resolutions up to 8192, and KR/EN/JP UI.

## Meta Package Policy

Do not make normal tool packages depend on unrelated Studio Iyan tools just to install everything at once.

If an all-tools install option is needed later, use a separate meta package:

```text
com.studioiyan.avatar-vault
```

Purpose: install all Studio Iyan tools through explicit `vpmDependencies`.

## Repository Structure

The repository root is the public VPM output location.

```text
iyan-vpm/
  vpm.json
  index.json
  plane-fit-to-camera.json
  ma-blendshape-sync-auto-setup.json
  hierarchy-plus-rebone.json
  prefab-material-remapper.json
  uv-mask-tool.json
  sources/
    source-all.json
    source-plane-fit-to-camera.json
    source-ma-blendshape-sync-auto-setup.json
    source-hierarchy-plus-rebone.json
    source-prefab-material-remapper.json
    source-uv-mask-tool.json
  scripts/
    generate-listings.mjs
    validate-listings.mjs
```

`vpm.json` preserves the existing full listing URL. `index.json` is an alias for the same full listing. Files in `sources/` define which package IDs are exposed by each generated output.

## Listing Generation

Generate all listings:

```bash
node scripts/generate-listings.mjs
```

Validate all listings:

```bash
node scripts/validate-listings.mjs
```

To add another single-tool listing, add one `sources/source-new-tool.json` file, register the package in `sources/source-all.json`, then run generation and validation.

## Automation

`.github/workflows/build-listings.yml` regenerates and validates all listings for:

- `repository_dispatch`
- `workflow_dispatch`
- pushes that change `vpm.json`, `sources/*.json`, `scripts/*.mjs`, or the workflow file

## Author

Studio Iyan  
GitHub: <https://github.com/Yunhyuk-Jeong>
