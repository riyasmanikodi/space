/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /loaders/AssetLoader.js
 * Purpose: Advanced Normalization, Center-Snapping, and Emissive Material Injection
 */

import * as THREE from 'three';
import { GLTFLoader } from 'https://esm.sh/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://esm.sh/three@0.150.1/examples/jsm/loaders/DRACOLoader.js';

export class AssetLoader {
    constructor(manager) {
        this.gltfLoader = new GLTFLoader(manager);
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        this.gltfLoader.setDRACOLoader(this.dracoLoader);

        this.textureLoader = new THREE.TextureLoader(manager);
        this.assets = new Map();
    }

    async loadAsset(name, modelPath, texturePath, sectorColor = 0xffffff) {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                modelPath,
                (gltf) => {
                    const model = gltf.scene;

                    // 1. CENTER-SNAP ROUTINE
                    // Forces model to (0,0,0) relative to its anchor to prevent "offset vanishing"
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);

                    // 2. INDUSTRIAL MATERIAL INJECTION
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;

                            // Force PBR Standard for light reaction
                            const oldMat = child.material;
                            child.material = new THREE.MeshStandardMaterial({
                                map: oldMat.map,
                                color: oldMat.color,
                                metalness: 0.9,
                                roughness: 0.1,
                                emissive: new THREE.Color(sectorColor),
                                emissiveIntensity: 0.2 // Subtle glow to ensure visibility
                            });
                        }
                    });

                    // 3. SCALE NORMALIZATION
                    const size = box.getSize(new THREE.Vector3()).length();
                    const scaleFactor = 6.0 / size; // Scale up to be visible on ring
                    model.scale.set(scaleFactor, scaleFactor, scaleFactor);

                    const wrapper = new THREE.Group();
                    wrapper.add(model);

                    this.assets.set(name, wrapper);
                    resolve(wrapper);
                },
                undefined,
                (err) => {
                    console.error(`:: ASSET_LOAD_CRASH [${name}]:`, err);
                    reject(err);
                }
            );
        });
    }

    get(name) {
        return this.assets.get(name);
    }
}