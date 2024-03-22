
function targetChangeColor(cell) {
    const currentColor = cell.style.backgroundColor;
    // 赤くなったセルの位置を保存するための配列
    const redCells = [];
    // テーブルを取得
    const rival = document.getElementById('rival');
  
    rival.querySelectorAll('td').forEach((cell, index) => {
      // クリックされたセルが赤くなった場合
      if (cell.style.backgroundColor === 'red') {
        // クリックされたセルの行と列のインデックスを取得して、配列に追加する
        const redRowIndex = cell.parentNode.rowIndex;
        const redCellIndex = cell.cellIndex;
        redCells.push({ row: redRowIndex, column: redCellIndex });
  
        // 赤くなったセルの位置を出力
        console.log("赤くなったセルの位置: 行 " + redRowIndex + ", 列 " + redCellIndex);
      }
    });
  
    // 押されたボタンの特定
    // クリックされたセルの行と列のインデックスを取得
    const yellowRowIndex = cell.parentNode.rowIndex;
    const yellowCellIndex = cell.cellIndex;
  
    // 赤色のセルの位置情報を参照して、特定のセルかどうか判定
    const isRedCell = redCells.some(redCell => redCell.row === yellowRowIndex && redCell.column === yellowCellIndex);
  
    if (isRedCell) {
      // 赤色のセルの場合は何かしらの処理を行う（ここではコンソールログの出力）
      console.log("赤色のセルがクリックされました");
      cell.style.backgroundColor = 'red';
      return;
    } else {
      // 赤色のセルでない場合は何かしらの処理を行う（ここではコンソールログの出力）
      console.log("赤色のセル以外がクリックされました");
      cell.style.backgroundColor = 'yellow';
      return;
    }
    // const newColor = (currentColor === 'yellow') ? 'lightGray' : 'yellow';
    // cell.style.backgroundColor = newColor;
  }
  