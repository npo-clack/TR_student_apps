import { THREE, FBXLoader, OBJLoader, PointerLockControls} from './three-lib.js';

//前進か後進か変数宣言
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

//移動速度と移動方向の定義
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0.5, 1);

// レンダラーを作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//FPS視点設定
const controls = new PointerLockControls(camera, renderer.domElement)
window.addEventListener("click", () => {
  controls.lock();
})
// FBXLoaderのインスタンスを作成
const fbxLoader = new FBXLoader();

// FBXファイルを読み込み
fbxLoader.load('uploads_files_2740865_city+models+byothers.fbx', (fbxModel) => {
  // モデルの位置やサイズを調整
  fbxModel.scale.set(0.1, 0.1, 0.1);
  fbxModel.position.set(0, 0, 0);

  // シーンに追加
  scene.add(fbxModel);
});

// OBJLoaderのインスタンスを作成
const objLoader = new OBJLoader();


// OBJファイルを読み込み
objLoader.load('uploads_files_2740865_city+models+byothers.obj', (objModel) => {
  // モデルの位置やサイズを調整
  objModel.scale.set(0.1, 0.1, 0.1);
  objModel.position.set(2, 0, 0);

  // シーンに追加
  scene.add(objModel);
});

// テクスチャーローダーのインスタンスを作成
const textureLoader = new THREE.TextureLoader();

// テクスチャーファイルのパス
const texturePath = 'textures'; // テクスチャーファイルの実際のパスに変更してください

// テクスチャーフォルダー内のすべてのファイルを取得
const textureFiles = ["45building_d.png","45building_n.png","textures/45building_s.png","97_paving outdoor concrete regular block texture-seamless.jpg",
"textures/140_paving outdoor concrete regular block texture-seamless.jpg","textures/180_concrete paving outdoor texture-seamless.jpg",
"textures/aerial_grass_rock_diff_1k (1).jpg","textures/aerial_grass_rock_nor_1k (1).jpg","textures/aerial_grass_rock_rough_1k.jpg","textures/AIT01W2W1_d.png",
"textures/AIT01W2W1_s.png","textures/AIT01W2W2_d.png","textures/AIT01W2W2_s.png","textures/AIT01W2W5_d.png","textures/AIT01W2W5_s.png","textures/AIT01W2W6_d.png",
"textures/AIT01W2W7_s.png","textures/AIT01W2W8_d.png","textures/AIT01W2W8_s.png","textures/Albedo.jpeg"];
// テクスチャーを非同期で読み込む関数
const loadTexture = (filename) => {
  return new Promise((resolve, reject) => {
    textureLoader.load(textureFolder + filename, resolve, undefined, reject);
  });
};
// すべてのテクスチャーを読み込むPromiseの配列を作成
const texturePromises = textureFiles.map(loadTexture);

// すべてのテクスチャーが読み込まれた後に実行される処理
Promise.all(texturePromises)
  .then((textures) => {
    // texturesには読み込まれたテクスチャーの配列が入っています

    // ここで必要な処理を行う
    // 例：テクスチャーを適用したマテリアルを作成し、オブジェクトに適用してシーンに追加するなど
// テクスチャーを読み込み、マテリアルに適用する
textureLoader.load(texturePath, (texture) => {
  // マテリアルを作成
  const material = new THREE.MeshBasicMaterial({ map: texture });

 // シーンにボックスを追加
 scene.add(box);
});
  // })
  // .catch((error) => {
  //   // console.error('テクスチャーの読み込み中にエラーが発生しました', error);
   });
  
// // テクスチャーを読み込み、マテリアルに適用する
// textureLoader.load(texturePath, (texture) => {
//   // マテリアルを作成
//   const material = new THREE.MeshBasicMaterial({ map: texture });

//  // シーンにボックスを追加
//  scene.add(box);
// });
  
// テクスチャーファイルのパス
const texturePath2 = 'uploads_files_1872992_Textures'; // テクスチャーファイルの実際のパスに変更してください

// テクスチャーを読み込み、マテリアルに適用する
textureLoader.load(texturePath2, (texture) => {
  // マテリアルを作成
  const material = new THREE.MeshBasicMaterial({ map: texture });
 // シーンにボックスを追加
 scene.add(box);
});

// ジオメトリとマテリアルを作成
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const planeGeometry = new THREE.PlaneGeometry(20, 20, 5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // 白色に変更

// ボックスメッシュと平面メッシュを作成
const box = new THREE.Mesh(boxGeometry, boxMaterial);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI * 0.5; // 平面を横に配置するために回転

// シーンに追加
//scene.add(box);
//scene.add(plane);

const movementSpeed = 1
//キーボード操作
const onKeyDown = (e) => {
  switch (e.code) {
    case "KeyW":
      moveForward = true;
      break;
    case "KeyS":
      moveBackward = true;
      break;
    case "KeyA":
      moveLeft = true;
      break;
    case "KeyD":
      moveRight = true;
      break;
  }
};

const onKeyUp = (e) => {
  switch (e.code) {
    case "KeyW":
      moveForward = false;
      break;
    case "KeyS":
      moveBackward = false;
      break;
    case "KeyA":
      moveLeft = false;
      break;
    case "KeyD":
      moveRight = false;
      break;
  }
};

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

let prevTime = performance.now();

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

const collidableObjects = ['uploads_files_2740865_city+models+byothers.obj','uploads_files_2740865_city+models+byothers.fbx'];

// マウスのクリックイベントリスナー
window.addEventListener('mousemove', (event) => {
  // マウス座標を正規化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycasterの起点と方向を設定
  raycaster.setFromCamera(mouse, camera);

  // シーン上のオブジェクトとRaycasterの交差を判定
  const intersects = raycaster.intersectObjects(collidableObjects, true);

  // 例：交差しているオブジェクトがあればコンソールに表示
  if (intersects.length > 0) {
    // console.log(intersects[0].object); // 最初に交差したオブジェクトを表示

    // 交差したオブジェクトが当たり判定に含まれるものであれば進行を停止する
    if (collidableObjects.includes(intersects[0].object)) {
      // 進行を停止する処理をここに追加
      moveForward = false;
      moveBackward = false;
      moveLeft = false;
      moveRight = false;
    }
  }
});

function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();
  
  //前進後進判定
  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);

  //ポインターがONになったら
  if(controls.isLocked) {
    const delta = (time - prevTime) / 1000;
    //減衰
    velocity.z -= velocity.z * 5.0 * delta;
    velocity.x -= velocity.x * 5.0 * delta;
    if(moveForward || moveBackward) {
      velocity.z -= direction.z * 20 * delta;
    }
    if(moveRight || moveLeft) {
      velocity.x -= direction.x * 20 * delta;
        
    }
  
    velocity.z -=direction.z * movementSpeed * delta;
    controls.moveForward(-velocity.z * movementSpeed * delta);
    controls.moveRight(direction.x * movementSpeed * delta);
  }

  prevTime = time;

  renderer.render(scene, camera);

  // シーン上のオブジェクトとRaycasterの交差を判定
  const intersects = raycaster.intersectObjects(collidableObjects, true);

 // 例：交差しているオブジェクトがあれば何か処理を行う
 if (intersects.length > 0) {
  // 例：オブジェクトが交差している場合の処理
  // ここで進行を停止するかどうかの条件を設定し、必要ならば moveForward = false; のように進行を停止する処理を追加
 }
}

animate();

//画面リサイズ設定

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// // アニメーションループを設定
// const animate = function () {
//   requestAnimationFrame(animate);

//   // ボックスを回転させるアニメーション
//   box.rotation.x += 0.01;
//   box.rotation.y += 0.01;

//   // レンダリング
//   renderer.render(scene, camera);
// };

// アニメーションを開始
// animate();
