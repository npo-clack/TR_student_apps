// three-lib.js
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

// FBXLoaderの追加
import { FBXLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/FBXLoader.js';

// OBJLoaderの追加
import { OBJLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/OBJLoader.js';

import { PointerLockControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/PointerLockControls.js';

export { THREE, FBXLoader, OBJLoader, PointerLockControls};