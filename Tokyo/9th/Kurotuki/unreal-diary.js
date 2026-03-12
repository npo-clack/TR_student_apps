function startGame() {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  document.getElementById("pushpin-image").style.display = "block";
}

const characters = {
      "パン屋": {
        intro: "朝5時。あなたはパン屋として働いている。",
        choices: {
          "1": {
            text: "店の前を掃除した。",
            result: "客足は少ないが、店前がきれいになって評判が上がった。",
            nextChoices: {
              "1": {
                text: "SNSに店の写真を投稿した。",
                result: "写真がちょっとした話題となり店の知名度が上がった。"
              },
              "2": {
                text: "特に何もせず、明日に備えるとしよう。",
                result: "静かな一日が終わった。"
              },
              "3": {
                text: "ついでに近所の落ち葉を拾っておいた。",
                result: "面白い形の落ち葉があった。洗ってレジの横にでも飾っておこう。"
              },
            }
          },
          "2": {
            text: "特製クロワッサンを試作した。",
            result: "新作は子供たちに大人気だった。",
            nextChoices: {
              "1": {
                text: "隣のカフェに試供品を持っていった。",
                result: "カフェとのコラボが決まった。これから忙しくなりそうだ。"
              },
              "2": {
                text: "さらにレシピを改良してみた。",
                result: "バターの量が増えたが、完璧な味に近づいた。"
              },
              "3": {
                text: "今度はカレーパンを試作してみた。",
                result: "なかなかカレーの味が決まらない。次の休日はカレーを食べに行こう。"
              },
            }
          },
          "3": {
            text: "そういえば今日は定休日だった。",
            result: "どこかへ出掛けることにした。",
            nextChoices: {
              "1": {
                text: "ほかの店のパンを食べに行った。",
                result: "カレーパンを食べた。ナンの中にカレーを入れたら食べやすいのでは？"
              },
              "2": {
                text: "公園を散歩した。",
                result: "鳥のさえずりを聞きながらしばらく歩いた。今日はとても穏やかに過ごせた。"
              },
              "3": {
                text: "買ったがまだ読んでいない本を読んだ。",
                result: "普段読まないジャンルの本だったが、面白かった。"
              },
            }
          },
        },
      },
      "清掃員": {
        intro: "午後3時。あなたはビルの清掃員として働いている。",
        choices: {
          "1": {
            text: "誰もいない会議室を念入りに掃除した。",
            result: "管理者から感謝された。来月から給料が少し上がるらしい。",
            nextChoices: {
              "1": {
                text: "上司に昇給の理由を聞いてみた。",
                result: "誠実な働きぶりが評価されたと知って嬉しくなった。"
              },
              "2": {
                text: "感謝の手紙を書いた。",
                result: "上司との関係が良好になり、今後も頼られる存在に。"
              },
              "3": {
                text: "別の場所も念入りに掃除した。",
                result: "今までの努力が報われたような気がして力が入った。"
              },
            }
          },
          "2": {
            text: "エレベーターの中で落書きを発見した。",
            result: "落書きを報告したことで、監視カメラの設置が決まったらしい。",
            nextChoices: {
              "1": {
                text: "誰がやったか探ってみた。",
                result: "意外にも新人スタッフだった。話し合って解決できた。"
              },
              "2": {
                text: "静かに見守ってみた。",
                result: "数日経って消えていなかったら消しに行こう。"
              },
              "3": {
                text: "すぐに消した。",
                result: "かなり時間がかかってしまったが、消えてよかった。"
              },
            }
          },
          "3": {
            text: "休憩所の様子を見に行った。",
            result: "昼休憩後だが、あまり散らかっていなかった。",
            nextChoices: {
              "1": {
                text: "それでも掃除をした。",
                result: "多少のゴミは落ちているはずだ。"
              },
              "2": {
                text: "ゴミ箱の中身を捨てに行った。",
                result: "最近はコンビニの新作スイーツが人気らしい。"
              },
              "3": {
                text: "少し休憩した。",
                result: "もちろんその後に机を拭いたり椅子の位置を戻したりした。"
              },
            }
          },
        },
      },
      "密偵": {
        intro: "深夜0時。あなたは秘密組織に雇われた密偵だ。",
        choices: {
          "1": {
            text: "標的の家を監視した。",
            result: "標的が意外な情報を電話で話していた。大きな発見だった。",
            nextChoices: {
              "1": {
                text: "その情報を上司に即座に送信した。",
                result: "作戦が前倒しされ、チーム全体の評価が上がった。"
              },
              "2": {
                text: "情報を分析してから送信した。",
                result: "より深い理解が得られ、次のミッションが成功しやすくなった。"
              },
              "3": {
                text: "監視を続けた。",
                result: "さらに有用な情報が得られた。"
              },
            }
          },
          "2": {
            text: "盗聴器を設置した。",
            result: "盗聴器の設置に成功したが、ギリギリで見つかりそうになった。",
            nextChoices: {
              "1": {
                text: "証拠を消すために現場に戻った。",
                result: "リスクは高かったが、すべて綺麗に処理できた。"
              },
              "2": {
                text: "一切手を加えず、様子を見た。",
                result: "幸運にも標的は何も気付かず、情報収集が続行できた。"
              },
              "3": {
                text: "仲間に報告した。",
                result: "運良く標的に気付かれずに済んだがこれからは仲間と協力した方がいいだろう。"
              },
            }
          },
          "3": {
            text: "変装して標的の家に忍び込んだ。",
            result: "夜通しパーティーをしていたため潜入は容易だった。",
            nextChoices: {
              "1": {
                text: "標的本人と接触した。",
                result: "酒が入っているのか口が軽く、すぐに情報を得ることができた。"
              },
              "2": {
                text: "盗聴器を設置した。",
                result: "こんなにも人が多いのだからすぐには気付かれないだろう。"
              },
              "3": {
                text: "周囲の人の話を盗み聞きした。",
                result: "彼らからも思わぬ情報が得られた。"
              },
            }
          },
        },
      },
      /*"職業": {
        intro: "導入",
        choices: {
          "1": {
            text: "選択肢１",
            result: "結果１",
            nextChoices: {
              "1": {
                text: "選択肢１－１",
                result: "結果１－１"
              },
              "2": {
                text: "選択肢１－２",
                result: "結果１－２"
              },
              "3": {
                text: "選択肢１－３",
                result: "結果１－３"
              },
            }
          },
          "2": {
            text: "選択肢２",
            result: "結果２",
            nextChoices: {
              "1": {
                text: "選択肢２－１",
                result: "結果２－１"
              },
              "2": {
                text: "選択肢２－２",
                result: "結果２－２"
              },
              "3": {
                text: "選択肢２－３",
                result: "結果２－３"
              },
            }
          },
          "3": {
            text: "選択肢３",
            result: "結果３",
            nextChoices: {
              "1": {
                text: "選択肢３－１",
                result: "結果３－１"
              },
              "2": {
                text: "選択肢３－２",
                result: "結果３－２"
              },
              "3": {
                text: "選択肢３－３",
                result: "結果３－３"
              },
            }
          },
        },
      },*/
    };

    const gameDiv = document.getElementById("game");
    let currentCharacter = null;

    function makeGame() {
      const characterKeys = Object.keys(characters);
      currentCharacter = characterKeys[Math.floor(Math.random() * characterKeys.length)];
      const character = characters[currentCharacter];

      gameDiv.innerHTML = `
        <h2>とある${currentCharacter}の日記</h2>
        <p>${character.intro}</p>
        <p>何をしましたか？</p>
        <button onclick="handleChoice('1')">1. ${character.choices["1"].text}</button><br>
        <button onclick="handleChoice('2')">2. ${character.choices["2"].text}</button><br>
        <button onclick="handleChoice('3')">3. ${character.choices["3"].text}</button><br>
        `;
    }

    function handleChoice(choiceKey) {
  const choice = characters[currentCharacter].choices[choiceKey];

  gameDiv.innerHTML = `
    <h2>結果</h2>
    <p>${choice.result}</p>
    <p>次に何をしましたか？</p>
    <button onclick="handleNextChoice('${choiceKey}', '1')">1. ${choice.nextChoices["1"].text}</button><br>
    <button onclick="handleNextChoice('${choiceKey}', '2')">2. ${choice.nextChoices["2"].text}</button><br>
    <button onclick="handleNextChoice('${choiceKey}', '3')">3. ${choice.nextChoices["3"].text}</button><br>
  `;
}

    function handleNextChoice(choiceKey, nextKey) {
      const finalResult = characters[currentCharacter].choices[choiceKey].nextChoices[nextKey].result;
      gameDiv.innerHTML = `
        <h2>最終結果</h2>
        <p>${finalResult}</p>
        <button onclick="makeGame()">別の一日を書く</button>
      `;
    }

    // 最初にゲームを開始
    makeGame();