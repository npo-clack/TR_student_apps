let task = [];
let nextTaskId = 1;

//ページロード時にイベントリスナーを設定
document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('task-input');
  if (taskInput) {
    taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  }
});

function addTask() {
  //タスク追加のロジック
 
  let content = document.getElementById('task-input').value;
  if (content === "" || content == null || content === undefined) {
    alert("タスクを入力してください");
    return;
  }
  //タスク追加処理内容
  const id = nextTaskId++;
  task.push({ id: id, content: content, completed: false });
  console.log(task);
  const addToP = document.createElement('p');
  addToP.classList.add('task-item');
  addToP.dataset.id = id;
  
  //チェックボックスを生成
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.addEventListener('change', () => {
    // タスクの完了状態を更新
    const taskId = Number(addToP.dataset.id);
    const taskItem = task.find(t => t.id === taskId);
    if (taskItem) {
      taskItem.completed = checkbox.checked;
    }
    updateTaskStats();
  });
  addToP.appendChild(checkbox);
  
  //テキストを要素に追加
  const span = document.createElement('span');
  span.textContent = content;
  addToP.appendChild(span);
  
  //削除ボタンを生成
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '×';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    const idToRemove = Number(addToP.dataset.id);
    const index = task.findIndex(t => t.id === idToRemove);
    if (index !== -1) task.splice(index, 1);
    console.log(task);
    addToP.remove();
    updateTaskStats();
  });
  addToP.appendChild(deleteBtn);

  //bodyにP要素を追加
  document.body.append(addToP);
  updateTaskStats();
}

function updateTaskStats() {
  //ここにタスク統計の更新ロジックを実装
  let totalTasks = document.querySelectorAll('p.task-item').length;
  let completedTasks = document.querySelectorAll('p.task-item input[type="checkbox"]:checked').length;
  let percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  console.log(`Total Tasks: ${totalTasks}, Completed Tasks: ${completedTasks}`);
  document.getElementById('completed').textContent = completedTasks;
  document.getElementById('total').textContent = totalTasks;
  document.getElementById('percentatage').textContent = percentage.toFixed(0);
}

function clearTasks() {
  //ここにタスク全削除のロジックを実装
  const tasks = document.querySelectorAll('p.task-item');
  tasks.forEach(task => task.remove());
  task = [];
  console.log(task);
  updateTaskStats();
}

function saveTasks() {
  //ここにタスク保存のロジックを実装

  //チェックボックスの状態をtaskに反映
  document.querySelectorAll('p.task-item').forEach(taskElement => {
    const taskId = Number(taskElement.dataset.id);
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    const taskItem = task.find(t => t.id === taskId);
    if (taskItem && checkbox) {
      taskItem.completed = checkbox.checked;
    }
  });

  //タスクデータ
  let TaskData = task;
  const jsonData = JSON.stringify(TaskData);
  localStorage.setItem('tasks', jsonData);
  //次のタスクIDデータ
  let NextTaskIDData = nextTaskId;
  const jsonData2 = JSON.stringify(NextTaskIDData);
  localStorage.setItem('nextTaskId', jsonData2);

  sendWebHook();
}

function loadTasks() {
  //ここにタスク読み込みのロジックを実装

  //タスクデータ
  const storedTaskData = localStorage.getItem('tasks');
  const loadedTaskData = JSON.parse(storedTaskData);
  console.log(loadedTaskData);
  
  //次のタスクIDデータ
  const storedNextTaskIdData = localStorage.getItem('nextTaskId');
  const loadedNextTaskIdData = JSON.parse(storedNextTaskIdData);
  console.log(loadedNextTaskIdData);
  
  //グローバル変数に反映
  if (loadedTaskData && Array.isArray(loadedTaskData)) {
    task = loadedTaskData;
  }
  if (loadedNextTaskIdData !== null && loadedNextTaskIdData !== undefined) {
    nextTaskId = loadedNextTaskIdData;
  }
  
  //既存のタスク表示をクリア
  const existingTasks = document.querySelectorAll('p.task-item');
  existingTasks.forEach(t => t.remove());
  
  //読み込んだタスクをDOMに表示
  if (loadedTaskData && Array.isArray(loadedTaskData)) {
    loadedTaskData.forEach(t => {
      const addToP = document.createElement('p');
      addToP.classList.add('task-item');
      addToP.dataset.id = t.id;
      
      //チェックボックスを生成
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkbox');
      //保存されていた完了状態を復元
      if (t.completed) {
        checkbox.checked = true;
      }
      checkbox.addEventListener('change', () => {
        //タスクの完了状態を更新
        const taskId = Number(addToP.dataset.id);
        const taskItem = task.find(tm => tm.id === taskId);
        if (taskItem) {
          taskItem.completed = checkbox.checked;
        }
        updateTaskStats();
      });
      addToP.appendChild(checkbox);
      
      //テキストを要素に追加
      const span = document.createElement('span');
      span.textContent = t.content;
      addToP.appendChild(span);
      
      //削除ボタンを生成
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => {
        const idToRemove = Number(addToP.dataset.id);
        const index = task.findIndex(tm => tm.id === idToRemove);
        if (index !== -1) task.splice(index, 1);
        console.log(task);
        addToP.remove();
        updateTaskStats();
      });
      addToP.appendChild(deleteBtn);
      
      //bodyにP要素を追加
      document.body.append(addToP);
    });
  }
  
  updateTaskStats();
}

async function sendWebHook(){

  //let webhooksTask = task.filter((task) => !task.completed);　（未完了タスクのみ送信したい場合の例）

  const response = await fetch('https://discord.com/api/webhooks/1461963068174241877/iXgnt-Ilt37zU16lsLvbhc8mMgJNMpcV7Y7c_JrN0Kz_Itce-KR7zagHKjAkmxVCUg3P');
  response.ok // true
  console.log("Saved to Discord Webhook");

  fetch('https://discord.com/api/webhooks/1461963068174241877/iXgnt-Ilt37zU16lsLvbhc8mMgJNMpcV7Y7c_JrN0Kz_Itce-KR7zagHKjAkmxVCUg3P', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content: task.filter((task) => !task.completed).map(t => t.content).join('\n-----------------------\n')}) 
  })
 
}