# Studio Iyan VPM Repository

Studio Iyan의 Unity/VRChat 에디터 도구를 배포하는 VPM listing 저장소입니다.

사용자는 목적에 따라 전체 Studio Iyan listing을 추가하거나, 특정 도구만 보이는 단일 도구 listing을 VCC에 추가할 수 있습니다.

## Add to VCC

### 전체 Studio Iyan VPM

[Add Studio Iyan VPM to VCC](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/vpm.json)

수동 추가 URL:

```text
https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/vpm.json
```

호환용 alias:

```text
https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/index.json
```

### 단일 도구 VPM listings

| Listing | VCC Add URL | Manual URL |
| --- | --- | --- |
| UV Mask Tool only | [Add UV Mask Tool VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/uv-mask-tool.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/uv-mask-tool.json` |
| Prefab Material Remapper only | [Add Prefab Material Remapper VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/prefab-material-remapper.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/prefab-material-remapper.json` |
| MA Blendshape Sync Auto Setup only | [Add MA Blendshape Sync Auto Setup VPM](vcc://vpm/addRepo?url=https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/ma-blendshape-sync-auto-setup.json) | `https://raw.githubusercontent.com/Yunhyuk-Jeong/iyan-vpm/main/ma-blendshape-sync-auto-setup.json` |

전체 listing은 VCC에서 모든 Studio Iyan 패키지를 보여주지만, listing에 포함되어 있다는 이유만으로 모든 패키지를 자동 설치하지는 않습니다. 특정 도구만 VCC에 보이게 하고 싶은 사용자는 단일 도구 listing을 추가하면 됩니다.

향후 "모든 도구 한 번에 설치" 기능이 필요하다면 각 도구의 `vpmDependencies`에 다른 도구를 강제로 넣지 말고, 별도 meta package를 만드는 것이 맞습니다.

예정 후보:

```text
com.studioiyan.avatar-vault
```

목적: Studio Iyan 도구들을 `vpmDependencies`로 모아 설치하는 선택형 meta package.

## Available Packages

| Package | Package ID | Listing |
| --- | --- | --- |
| Plane Fit To Camera Tool | `com.iyankim.planefittocamera` | Full only |
| MA Blendshape Sync Auto Setup | `com.iyankim.mablendshapesyncautosetup` | Full, single-tool |
| Hierarchy Plus Rebone | `com.iyankim.hierarchyplusrebone` | Full only |
| Prefab Material Remapper | `com.iyankim.prefabmaterialremapper` | Full, single-tool |
| Studio Iyan UV Mask Tool | `com.iyankim.uvmasktool` | Full, single-tool |

## Tool Summaries

### Plane Fit To Camera Tool

Repository: <https://github.com/Yunhyuk-Jeong/vpm-plane-fit-to-camera>

Unity Plane 또는 Plane-like mesh를 현재 Camera view에 맞춰 위치, 회전, 크기를 자동 조정하는 에디터 도구입니다. Perspective/Orthographic 카메라, 여러 Plane 동시 처리, 수동 거리 지정, 정사각형 모드, 뷰 기준 회전, KR/EN/JP UI, Undo를 지원합니다.

### MA Blendshape Sync Auto Setup

Repository: <https://github.com/Yunhyuk-Jeong/vpm-ma-blendshape-sync-auto-setup>

Modular Avatar의 Blendshape Sync 컴포넌트를 여러 대상 오브젝트에 자동 설정하는 에디터 도구입니다. 소스/타겟 메시의 공통 blendshape를 감지하고, 다중 타겟, 드래그 앤 드롭, 하위 오브젝트 재귀 처리, 실시간 미리보기, KR/EN/JP UI, Undo를 지원합니다.

### Hierarchy Plus Rebone

Repository: <https://github.com/Yunhyuk-Jeong/vpm-hierarchy-plus-rebone>

중단된 HierarchyPlus 도구를 Unity 2022.3+와 VPM/VCC 배포에 맞게 재구성한 에디터 전용 도구입니다. Hierarchy 창의 depth 색상, guide line, component icon, tag/layer label, regex filtering, 저장 설정, namespace 충돌 방지를 제공합니다.

### Prefab Material Remapper

Repository: <https://github.com/Yunhyuk-Jeong/vpm-prefab-material-remapper>

Prefab Asset에 FBX식 material remapping workflow를 제공하는 에디터 전용 도구입니다. material slot name 기준으로 여러 renderer의 material을 일괄 교체하며, `MeshRenderer`와 `SkinnedMeshRenderer`, Prefab Asset 안전 편집, KR/EN/JP UI를 지원합니다.

### Studio Iyan UV Mask Tool

Repository: <https://github.com/Yunhyuk-Jeong/vpm-uv-mask-tool>

Renderer의 material slot에서 사용되는 UV island를 선택하고 PNG mask texture로 내보내는 에디터 전용 도구입니다. `MeshRenderer`와 `SkinnedMeshRenderer`, UV channel 자동 감지, 선택/반전/전체 선택, Scene View highlight, padding/anti-aliasing, 최대 8192 custom resolution, KR/EN/JP UI를 지원합니다.

## Listing Generation

이 저장소는 루트 디렉터리를 공개 output 위치로 사용합니다.

```text
iyan-vpm/
  source-all.json
  source-uv-mask-tool.json
  source-prefab-material-remapper.json
  source-ma-blendshape-sync-auto-setup.json
  vpm.json
  index.json
  uv-mask-tool.json
  prefab-material-remapper.json
  ma-blendshape-sync-auto-setup.json
  scripts/
    generate-listings.mjs
    validate-listings.mjs
```

`vpm.json`은 기존 통합 listing URL을 보존하는 canonical package catalog입니다. `source-*.json` 파일은 어떤 패키지를 어떤 output listing에 노출할지 정의합니다.

생성 명령:

```bash
node scripts/generate-listings.mjs
```

검증 명령:

```bash
node scripts/validate-listings.mjs
```

새 단일 도구 listing을 추가하려면 `source-new-tool.json`을 추가하고, `source-all.json`에 해당 package id와 repository를 등록한 뒤 생성/검증을 실행하면 됩니다.

## Automation

`.github/workflows/build-listings.yml`은 다음 이벤트에서 모든 listing을 재생성하고 검증합니다.

- `repository_dispatch`
- `workflow_dispatch`
- `vpm.json`, `source-*.json`, `scripts/*.mjs`, workflow 파일 변경 push

기존 `vpm.json` URL은 그대로 유지됩니다.

## Author

Studio Iyan  
GitHub: <https://github.com/Yunhyuk-Jeong>
