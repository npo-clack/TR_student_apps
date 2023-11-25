'use strict';

window.onload = function () {
  const { Engine, Render, World, Composite, Body, Bodies, Mouse, MouseConstraint, Runner, Vector, Events, Query } = Matter;

  if (hights >= 600) {
    hights = 600;
  } else {
    hights = hights - 10;
  }

  console.log(widths); //テスト用
  console.log(hights);

  var longs = document.getElementById('long');
  longs.addEventListener('change', function () {
    console.log(longs.value);
  });


  var widthes = document.getElementById('haba');
  widthes.addEventListener('change', function () {
    console.log(widthes.value);
  });

  document.getElementById('gravity').addEventListener('input', function (event) {
    engine.world.gravity.y = event.target.value;
  });

  var canvas = document.getElementById('canvas');

  const engine = Engine.create();
  const runner = Runner.create();
  const render = Render.create({
    canvas: canvas,
    element: document.body,
    options: {
      width: widths, hight: hights,
      wireframes: false,
    },
    engine: engine,
  });

  Render.run(render);

  let isPaused = false;
  const Do = document.getElementById('Do');
  Do.addEventListener("click", () => {
    if (isPaused) {
      // 再開
      Runner.run(runner, engine);
      console.log('実行(*´ε`*)ﾁｭｯﾁｭ')
      Do.innerText = '実行(*´ε`*)ﾁｭｯﾁｭ'

    } else {
      // 一時停止
      Runner.stop(runner);
      console.log('すとっぷ')
      Do.innerText = 'すとっぷ'
    }
    isPaused = !isPaused;
  });

  //マウス操作
  const mouse = Mouse.create(render.canvas);
  render.mouse = mouse;
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 1,//保持したときの回転数-->1は反動なし(0は動かない,0.1から反動やばい)
    }
  });

  const test = Bodies.circle(widths / 2, hights / 2, 30, {
    isStatic: false
  }); //テスト配置用

  const World_wall = Body.create({
    parts: [
      Bodies.rectangle(0, hights / 2, 10, hights),//Left
      Bodies.rectangle(widths - (widths / 8), hights / 2, 10, hights),//Right
      Bodies.rectangle(widths / 2, hights + 10, widths - 10, 50),//Ground
    ],
    isStatic: true,
    friction: 0,
  });


  //素材用ボタン
  const rectangle = Bodies.rectangle(widths - ((widths / 20)), hights / 5, widths / 15, hights / 50, { isStatic: true });
  const circle = Bodies.circle(widths - ((widths / 20)), hights / 3, widths / 50, { isStatic: true });
  const portal1 = Bodies.rectangle(widths - ((widths / 20) + 40), hights / 2, hights / 40, widths / 12, { isStatic: true });
  const portal2 = Bodies.rectangle(widths - ((widths / 20) - 10), hights / 2, hights / 40, widths / 12, { isStatic: true });
  const hint = Bodies.rectangle(widths - ((widths / 20) - 10),10, 10,10,{isStatic:true,render:{textture:"無題.png"}})
  World.add(engine.world, [rectangle, circle, test, World_wall, mouseConstraint, portal1, portal2,hint]);
  console.log("Add Wall");

  //ChatGPT
  // マウスクリック時の処理
  Events.on(mouseConstraint, 'mousedown', (event) => {
    const mousePosition = event.mouse.position;
    // マウスの位置にある物体を検索
    const bodiesUnderMouse = Query.point(engine.world.bodies, mousePosition);
    // 特定の条件をチェックして物体に対する操作を行う
    bodiesUnderMouse.forEach((body) => {
      if (body === circle) {
        console.log('〇がクリックされました。');
        AddCircle();
      } else if (body === rectangle) {
        console.log('barがクリックされました。');
        AddBar(longs.value, widthes.value, 0);
      } else if (body === portal1) {
        console.log("PortalA解放");
        AddBar(longs.value, widthes.value, 1);
      } else if (body === portal2) {
        console.log("PortalBを解放");
        AddBar(longs.value, widthes.value, 2);
      }
    });
  });

  var disk;
  function AddCircle() {
    disk = Bodies.circle(widths / 2, hights / 2, 30);
    World.add(engine.world, disk);
  };

  function AddBar(hoge, piyo, hogehoge) {
    const bar = Bodies.rectangle(widths / 2, hights / 2, hoge, piyo, hogehoge);
    if (hogehoge === 1) {
      bar.label = 'portalA'
    } else if (hogehoge === 2) {
      bar.label = 'portalB'
    } else {
      bar.label = '';
    };
    console.log("in");
    World.add(engine.world, bar);
  };


  document.addEventListener("click", (e) => {
    if (e.button === 0) {
      if (isMouseGrabbing()) {
        const mouseX = mouse.position.x;
        const mouseY = mouse.position.y;
        const bodies = Composite.allBodies(engine.world);
        let objectUnderMouse = null;

        for (const b of bodies) {
          if (Matter.Bounds.contains(b.bounds, { x: mouseX, y: mouseY })) {
            objectUnderMouse = b;
          }
        }
        if (objectUnderMouse.id != 6 && objectUnderMouse.id != 8 && objectUnderMouse.id != 7 && objectUnderMouse.id != 9 && objectUnderMouse.id != 10) {
          if (objectUnderMouse) {
            objectUnderMouse.isStatic = !objectUnderMouse.isStatic;
            console.log(objectUnderMouse, "の isStatic プロパティを反転させました:", objectUnderMouse.isStatic);
          }
        } else {
          console.log("虚無です");
        }
      }
    }
  });

  Matter.Events.on(engine, 'afterUpdate', function () {
    // ワールド内のすべての物体をループ
    for (var i = 0; i < engine.world.bodies.length; i++) {
      var body = engine.world.bodies[i];

      // 物体が画面外に出たかどうかをチェック
      if (body.position.y < 0 || body.position.y > render.canvas.width) {
        // 画面外に出た物体をワールドから削除
        Matter.Composite.remove(engine.world, body);
      }
    }
  });

  // マウスが何かをつかんでいるかどうかを確認
  function isMouseGrabbing() {
    return mouseConstraint.body !== null;
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
        teleport(disk, portal1);
      }
    });
  });

  function teleport(body, portal) {
    Body.setPosition(body, { x: portal.position.x, y: portal.position.y });
  }


  Runner.run(runner, engine);
}