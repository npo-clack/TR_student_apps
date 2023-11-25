'use strict';


window.onload = function () { //HTMLを読み込んでから実行

        // aliases
        var WinWith = 1080;
        var WinHeight = 1050;

        const { Engine, Render, World, Constraint, Body, Bodies, Mouse, Composite, MouseConstraint, Runner, Svg, Events } = Matter;

        const engine = Engine.create();
        engine.timing.timeScale = 1; //速度調節 //ChatGPT
        //engine.enableSleeping = true;        //ChatGPT
        const runner = Runner.create();
        const render = Render.create({
                element: document.body,
                options: {
                        width: WinWith, hight: WinHeight,//指定しない場合は50,50
                        wireframes: true,
                },
                engine: engine,
        });

        //マウス操作
        const mouse = Mouse.create(render.canvas);
        render.mouse = mouse;
        const mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                        stiffness: 1,//保持したときの回転数-->1は反動なし(0は動かない,0.1から反動やばい)
                        render: { visible: false }
                }
        });
        Composite.add(engine.world, mouseConstraint);//engine.world, 動かすor投入するものができる

        Render.run(render);//描画開始


        var ground = Bodies.rectangle(WinWith / 2, WinHeight / 2 + 100, WinHeight, 100, { isStatic: true, friction: 0 });//床
        var wallL = Bodies.rectangle(0, WinHeight / 2, 10, WinHeight, { isStatic: true });//壁左
        var wallR = Bodies.rectangle(WinWith, WinWith / 2, 10, WinHeight, { isStatic: true });//壁右
        World.add(engine.world, [ground, wallL, wallR]);//世界に追加..



        const AddCircle = document.getElementById('Circle');//htmlの〇ボタン
        AddCircle.disable = false
        AddCircle.onclick = function () {
                AddDisk(40, 50, 30);
        };
        var disk;
        function AddDisk(x, y, big) {
                disk = Bodies.circle(x, y, big, {
                        isStatic: false,
                        //restitution: 3,
                        friction: 0,
                });//diskを定義(丸)
                World.add(engine.world, disk);//世界に追加..
                console.log('Added Circle');
        }

        //Use ChatGPT
        // 一時停止フラグ
        let isPaused = false;
        const Do = document.getElementById('Do');
        Do.addEventListener("click", () => {
                if (isPaused) {
                        // 一時停止
                        Runner.stop(runner);
                        console.log('すとっぷ')

                } else {
                        // 再開
                        Runner.run(runner, engine);
                        console.log('実行(*´ε`*)ﾁｭｯﾁｭ')
                }
                isPaused = !isPaused;
        });
        var aru;
        const temple = document.getElementById('temple');
        temple.onclick = function () {
                console.log('Added temple...');
                var temp;
                AddDisk(1001, 400, 15);
                Runner.start(runner, engine)
                console.log("reset");
                temp = 1;
                console.log(temp);
                if (temp == 1) {
                        setTimeout(() => {
                                console.log("wait"),
                                World.remove(engine.world, disk);
                                Runner.stop(runner);
                        }, 100)
                }

                const hoge1 = Bodies.rectangle(110, 130, 300, 10, { //スライダ追加
                        angle: Math.PI / 8,
                        isStatic: true,
                });
                const hoge2 = Bodies.rectangle(100, 300, 7, 100, { //壁追加
                        angle: Math.PI,
                        isStatic: true,
                });
                const hoge3 = Bodies.rectangle(450, 230, 300, 10, { //しーそいた
                        isStatic: false,//回転いた
                });
                const hoge4 = Bodies.rectangle(550, 130, 10, 10, { //しーそ固定
                        isStatic: true,
                });
                const hoge5 = Bodies.rectangle(220, 354, 250, 10, { //hogehogeの壁
                        isStatic: true,
                });
                const hoge6 = Bodies.rectangle(430, 430, 260, 10, { //逆斜めのいた
                        angle: -Math.PI / 8,
                        isStatic: true,
                });
                const hoge7 = Bodies.rectangle(180, 525, 155, 10, { //hogepiyoの壁 
                        isStatic: true,
                });
                const hoge8 = Bodies.rectangle(100, 485, 7, 100, { //hogepiyoの床
                        isStatic: true,
                });
                const hoge9 = Bodies.rectangle(1001, 430, 7, 100, { //跳ねる板
                        angle: Math.PI / 4,
                        //restitution: 100,
                        isStatic: true,
                        //isSensor: true,
                });
                /*
                const hoge10 = Bodies.rectangle(650, 480, 7, 100, {
                        angle: Math.PI / 2,
                        isStatic: true,
                });
                */
                const portalA = Bodies.rectangle(1074, 500, 7, 150, { //ポータルin
                        isStatic: true,
                        label: 'portalA'
                });
                const portalB = Bodies.rectangle(1000, 0, 100, 7, { //ポータルout
                        isStatic: true,
                        label: 'portalB',
                        angle: Math.PI / 0,
                });
                const goal = Bodies.rectangle(550, 130, 5, 10, { //ゴール
                        isStatic: true,
                        isSensor: true,
                });

                World.add(engine.world, [hoge1, hoge2, hoge3, hoge4, hoge5, hoge6, hoge7, hoge8, hoge9, portalA, portalB, goal]);

                //World.add(engine.world, hoge10);
                //console.log("hoge10");

                const piyo = Constraint.create({ //hoge3の軸を追加してしーそ
                        pointA: { x: 0, y: 0 },
                        bodyA: hoge3,
                        pointB: { x: 450, y: 230 },
                        length: 0,
                })
                World.add(engine.world, piyo)//回転するやつ
                /*setInterval(() => { //無限回転Let'sGo
                        Body.setAngularVelocity(hoge3, -0.1)
                }, 100)*/
                // 範囲を定義

                const Gravity = document.getElementById('Gravity');
                let counter = 1;
                Gravity.onclick = function () {
                        counter++;
                        console.log(counter)
                        if (counter % 2 == 0) {
                                //偶数の場合無重力
                                engine.world.gravity.y = 0;
                        } else {
                                engine.world.gravity.y = 1;
                        }
                }

                //useChatGPT
                const hogehoge = { //上側
                        x: 10, // 範囲の中心 x 座標
                        y: 300, // 範囲の中心 y 座標
                        width: 1000, // 範囲の幅
                        height: 100, // 範囲の高さ
                        windSpeed: 0.001,//風の強さ
                };
                const hogepiyo = {//下側
                        x: 30,
                        y: 500,
                        width: 1000,
                        height: 30,
                        windSpeed: 0.1,
                };

                function Hanpatu(pair, restitutions) {
                        console.log("反発");
                        pair.bodyA.restitution = restitutions;
                        pair.bodyB.restitution = restitutions;
                };

                Events.on(engine, 'collisionStart', (event) => {
                        const pairs = event.pairs;

                        pairs.forEach((pair) => {
                                if ((pair.bodyA === disk && pair.bodyB.label === 'portalA') ||
                                        (pair.bodyB === disk && pair.bodyA.label === 'portalA')) {
                                        console.log("In");
                                        teleport(disk, portalB);
                                }
                                if ((pair.bodyA === disk && pair.bodyB.label === 'portalB') ||
                                        (pair.bodyB === disk && pair.bodyA.label === 'portalB')) {
                                        console.log("in");
                                        teleport(disk, portalA);
                                }
                                if ((pair.bodyA === hoge3 && pair.bodyB === hoge4) ||
                                        (pair.bodyA === hoge4 && pair.bodyB === hoge3)) {
                                        Hanpatu(pair, 2);
                                }
                                if ((pair.bodyA === disk && pair.bodyB === goal) ||
                                        (pair.bodyB === disk && pair.bodyA === goal)) {
                                        Goal();
                                }
                                if ((pair.bodyA === disk && pair.bodyB === hoge9) ||
                                        (pair.bodyA === hoge9 && pair.bodyB === disk)) {
                                        Hanpatu(pair, 3);
                                        setTimeout(() => { console.log("いちじていし") }, 1);
                                        disk.restitution = 0
                                }
                        });
                });

                function teleport(body, portal) {
                        Body.setPosition(body, { x: portal.position.x, y: portal.position.y });
                }

                function Goal() {
                        console.log("ピタゴラス一地");
                }

                // エンジンの更新サイクルごとに範囲内の物体に風の力を適用
                Events.on(engine, 'beforeUpdate', () => {
                        engine.world.bodies.forEach((body) => {
                                let windForce = { x: 0, y: 0 }; // 風の方向と初期化

                                // hogehoge の範囲内の場合
                                if (
                                        body.position.x > hogehoge.x - hogehoge.width / 2 &&
                                        body.position.x < hogehoge.x + hogehoge.width / 2 &&
                                        body.position.y > hogehoge.y - hogehoge.height / 2 &&
                                        body.position.y < hogehoge.y + hogehoge.height / 2
                                ) {
                                        windForce = { x: hogehoge.windSpeed, y: 0 };
                                }

                                // hogepiyo の範囲内の場合
                                if (
                                        body.position.x > hogepiyo.x - hogepiyo.width / 2 &&
                                        body.position.x < hogepiyo.x + hogepiyo.width / 2 &&
                                        body.position.y > hogepiyo.y - hogepiyo.height / 2 &&
                                        body.position.y < hogepiyo.y + hogepiyo.height / 2
                                ) {
                                        windForce = { x: hogepiyo.windSpeed, y: 0 };
                                }

                                // 風の力を適用
                                Body.applyForce(body, body.position, windForce);
                        });
                });

                // SVGを取得してワールドに追加する関数
                const addSvgToWorld = (url, position, scale) => {
                        fetch(url)
                                .then(response => response.text())
                                .then(svgData => {
                                        const svgDocument = new DOMParser().parseFromString(svgData, 'image/svg+xml');
                                        const svgPath = svgDocument.querySelector('path');

                                        const vertices = Svg.pathToVertices(svgPath);
                                        vertices.forEach(vertex => {
                                                vertex.x *= scale;
                                                vertex.y *= scale;
                                        });

                                        const box = Bodies.fromVertices(position.x, position.y, vertices, {
                                                isStatic: true,
                                                render: {
                                                        sprite: {
                                                                //xScale : 4, // x方向のスケールを変更
                                                                //yScale : 5, // y方向のスケールを変更
                                                        },
                                                },
                                        });

                                        World.add(engine.world, box);
                                })
                                .catch(error => console.error(error));
                };

                // 指定したSVGをワールドに追加
                addSvgToWorld('し.svg', { x: 490, y: 60 }, 1.5);
                temple.disabled = true;
        };
}

//たまり場
/*
const AddRectangle = document.getElementById('rectangle');
AddRectangle.onclick = function () {
        console.log('Added Rectangle');
        var parts = Bodies.rectangle(450, 170, 300, 10, {
                isStatic: true,
                angle: Math.PI / 4,
        });//X軸, Y軸, 長さ, 幅 になっている
        World.add(engine.world, [parts])//世界に追加..
}
 //Use ChatGPT
 // マウスが何かをつかんでいるかどうかを確認
 function isMouseGrabbing() {
         return mouseConstraint.body !== null;
 }
// この部分にマウスが放している間の処理を追加できます
document.addEventListener("mouseup", () => {
        if (isMouseGrabbing()) {
                // マウスが何かをつかんでいる間の処理
                console.log("マウスが何かをつかんでいます。");
                const mouseX = mouse.position.x;
                const mouseY = mouse.position.y;
                // すべての物体の座標を取得
                const bodies = Composite.allBodies(engine.world);

                // マウスの下にある物体を特定
                let objectUnderMouse = null;
                for (const body of bodies) {
                        // body.isStatic =false
                        // console.log(body.isStatic)
                        if (Matter.Bounds.contains(body.bounds, { x: mouseX, y: mouseY })) {
                                objectUnderMouse = body; //ObjectUnderMouseがマウス下のBodyを特定しているからそいつを!isStaticeにする。d
                                break;
                        } 
                }
                console.log("マウスの下にある物体が特定されました:", objectUnderMouse);
        } else {
                // マウスが何かをつかんでいない間の処理
                console.log("マウスは何かをつかんでいません。");
        }
        // 任意の条件に基づくif文
         if (mouseConstraint.body) {
             // マウスが物体の上にある場合の処理
             console.log("マウスが物体の上にあります");
         } else {
             // マウスが物体の上にない場合の処理
             console.log("マウスは物体の上にありません");
         }
// マウスが動いている間の処理
document.addEventListener("mousemove", (e) => {
        if (isMouseGrabbing()) {
                // マウスが何かをつかんでいる間の処理
                console.log("マウスが何かをつかんでいます。");
        } else {
                // マウスが何かをつかんでいない間の処理
                console.log("マウスは何かをつかんでいません。");
        }
});
});
*/


/*
// ポータルAの処理
function handleCollisionPortalA(body, portal) {
console.log("ポータルAに入った");
Body.setPosition(body, { x: portal.position.x, y: portal.position.y });
}
 
// ポータルBの処理
function handleCollisionPortalB(body, portal) {
console.log("ポータルBに入った");
Body.setPosition(body, { x: portal.position.x, y: portal.position.y });
}
*/

/*
                Events.on(engine, 'collisionStart', (event) => { //反発させよう
                const pairs = event.pairs;
                pairs.forEach((pair) => {
                        // 物体が壁に衝突した場合
                        if ((pair.bodyA === hoge3 && pair.bodyB === hoge4) || (pair.bodyA === hoge4 && pair.bodyB === hoge3)) {
                                const restitution = 0.7;
                                console.log("当たった");
                                pair.bodyA.restitution = restitution;
                                pair.bodyB.restitution = restitution;
                        }
                });
        });
        */