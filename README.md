# Iyan-Kim VPM Repository

This repository serves as the **central VPM index** for Unity and VRChat tools created by **Iyan-Kim**.  
Add this repository to the **VRChat Creator Companion (VCC)** to easily install and update supported packages.

---

## 🚀 Add to VCC

Click to add this repository directly to VCC:

👉 **[Add Iyan-Kim VPM Repository to VCC](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/vpm.json)**

Or add manually:

```
https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/vpm.json
```

---

## 📦 Available Packages

---

# 1. Plane Fit To Camera Tool

**Package ID:** `com.iyankim.planefittocamera`  
🔗 Repository: **https://github.com/Yunhyuk-Jeong/vpm-plane-fit-to-camera**

A Unity Editor tool that automatically fits one or more **Plane** meshes to the active camera view, supporting both Perspective and Orthographic modes. Ideal for VRChat avatars, world effects, background cards, and camera-aligned shaders.

### ✨ Features

-   Multi-plane support
-   Perspective & Orthographic compatibility
-   Plane-only optimized workflow
-   Square mode
-   View-space rotation
-   Multi-language UI (KR/EN/JP)
-   Undo support

### 🆕 Version History (All Versions, One-line Summary)

#### **1.0.7 – Packaging Fix**

-   Corrected zip root structure for full VPM/VCC compatibility.

#### **1.0.6 – Comment Cleanup**

-   Improved documentation and internal code comments.

#### **1.0.5 – Metadata Fix**

-   Updated package.json author format (VCC compatibility).

#### **1.0.4 – Multi-Plane Update**

-   Added multi-plane support and Plane-only refactoring.

#### **1.0.3 – Parent Scale Fix**

-   Corrected behavior when parent object has small or non-uniform scale.

#### **1.0.2 – Orthographic Support**

-   Added proper scaling for orthographic cameras.

#### **1.0.1 – Localization Update**

-   Improved multilingual UI (KR/EN/JP).

#### **1.0.0 – Initial Release**

-   Basic plane-fit-to-camera functionality with rotation options.

---

# 2. MA Blendshape Sync Auto Setup

**Package ID:** `com.iyankim.mablendshapesyncautosetup`  
🔗 Repository: **https://github.com/Yunhyuk-Jeong/vpm-ma-blendshape-sync-auto-setup**

An automated setup tool for **Modular Avatar's Blendshape Sync** system. Scans source and target meshes, detects matching blendshapes, and configures Modular Avatar Blendshape Sync components automatically.

### ✨ Features

-   Auto-detect matching blendshapes
-   Multi-target support
-   Drag & drop workflow
-   Recursive child scanning
-   Multi-language support
-   Undo support

### 🆕 Version History (All Versions, One-line Summary)

#### **1.0.7 – Packaging Fix**

-   Corrected zip root structure for VPM/VCC installation.

#### **1.0.6 – Packaging Fix**

-   Addressed archive structure inconsistencies in automation.

#### **1.0.5 – Editor Assembly Added**

-   Added asmdef + improved internal comments.

#### **1.0.4 – Metadata Fix**

-   Updated package.json author field for VCC.

#### **1.0.3 – UI & Logic Improvements**

-   Enhanced drag & drop flow and preview formatting.

#### **1.0.2 – Language Update**

-   Updated default language to KR; improved UI layout.

#### **1.0.1 – Language System Update**

-   Added multilingual UI support.

#### **1.0.0 – Initial Release**

-   Automatic blendshape sync setup for Modular Avatar.

---

## 📁 Repository Structure

```
iyan-vpm/
 └─ vpm.json
```

This repository contains only the **VPM index**.  
Each package has its own dedicated development repository.

---

## ✨ Author

**Iyan-Kim**  
GitHub: https://github.com/Yunhyuk-Jeong

Made with ❤️ for the VRChat & Unity community.
