import random
from pyscript import document
img_url=[
        "https://putiya.com/img/tool/dice01/dice01_a_01.png",
        "https://putiya.com/img/tool/dice01/dice01_a_02.png",
        "https://putiya.com/img/tool/dice01/dice01_a_03.png",
        "https://putiya.com/img/tool/dice01/dice01_a_04.png",
        "https://putiya.com/img/tool/dice01/dice01_a_05.png",
        "https://putiya.com/img/tool/dice01/dice01_a_06.png",
]
def img_out(parent):
        for i in range (3):
            print(parent[i])
            now_dice=parent[i]
            now_path=img_url[now_dice-1]
            dic=f"dice{i+1}"
            di=document.getElementById(dic)
            di.src=now_path
            document.getElementById(dic).innerHTML=di
def img_outpla(player):
        for i in range (3):
            print(player[i])
            now_dice=player[i]
            now_path=img_url[now_dice-1]
            dic=f"player{i+1}"
            di=document.getElementById(dic)
            di.src=now_path
            document.getElementById(dic).innerHTML=di
            
def get_yaku(a):
    """
    役を取得する関数
    Args:
        a: サイコロの目が入った配列

    Returns:
        役なし：-1, "continue", 0
        通常：強さ、"next"、仲間外れ
        それ以外：強さ，"next", 0
        
    Memo:
        役なし　：2,3,4のような全部違う値．この場合は3回までやり直す
        それ以外：役ありなので，それ以上サイコロを振らない
    """
    if a[0] == a[1] == a[2] == 1:
        return (5, "next", 0)
    elif a[0] == a[1] == a[2]:
        return (3, "next", 0)
    elif a == [4, 5, 6]:
        return (2, "next", 0)
    elif len(set(a)) == 2:
        for i in range(1, 7):
            if a.count(i) == 1:
                return (1, "next", i)
        return (0, 0, 0)
    elif a == [1, 2, 3]:
        return (-2, "next", 0)
    elif len(set(a)) == 3:
        return (-1, "continue", 0)
    else:
        print("ERROR")
        return (0, 0, 0)


def run2(x):
    input_elem = document.getElementById("english")
    print(int(input_elem.value))

    player_money = 10000
    kake = int(input_elem.value) * 1000
    player_money -= kake
    print("掛け金:", kake)
    parent = [0, 0, 0]
    player = [0, 0, 0]
    print("==== Parent ===")
    # 親の処理
    for i in range(3):
        parent[0] = random.randint(1, 6)
        parent[1] = random.randint(1, 6)
        parent[2] = random.randint(1, 6)
        parent.sort()
        print(parent)
        a, result, b = get_yaku(parent)
        if result == "next":
            break
    print("=== Player ===")
    # 子の処理
    for i in range(3):
        player[0] = random.randint(1, 6)
        player[1] = random.randint(1, 6)
        player[2] = random.randint(1, 6)
        player.sort()
        print(player)
        a, result, b = get_yaku(player)
        if result == "next":
            break
    print("=== Evaluate ===")
    # 勝負
    parent_yaku = get_yaku(parent)
    player_yaku = get_yaku(player)
    # 役を比べてる．通常の目同士でなければ，単純に大きさの比較ので良い
    if parent_yaku[0] > player_yaku[0]:
        document.getElementById("output").innerHTML="親の勝ち！"
    elif parent_yaku[0] < player_yaku[0]:
        document.getElementById("output").innerHTML="子の勝ち！"
    else:
        if player_yaku[0] == 1:
            # 通常の目同士の場合
            if parent_yaku[2] > player_yaku[2]:
                document.getElementById("output").innerHTML="親の勝ち！"
            elif parent_yaku[2] < player_yaku[2]:
                document.getElementById("output").innerHTML="子の勝ち！"
            else:
                document.getElementById("output").innerHTML="引き分け"
        else:
            # 通常の目ではないが，どちらも同じ役の場合
            print("Draw")
    img_out(parent)
    img_outpla(player)
