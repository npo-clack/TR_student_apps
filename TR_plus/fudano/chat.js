let chatOpen = false;

//ページロード時にイベントリスナーを設定
document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  //トグルボタンの初期位置を設定
  const chatToggle = document.getElementById('chat-toggle');
  if (chatToggle) {
    chatToggle.style.right = '0%';
  }
});

function toggleChat(){
    const chat = document.getElementById('chat');
    const chatToggle = document.getElementById('chat-toggle');

    chatOpen = !chatOpen;
    chatToggle.textContent = chatOpen ? '>>>' : '<<<';
    chat.style.right = chatOpen ? '0px' : '-315px';
    chatToggle.style.right = chatOpen ? '300px' : '0%';

 console.log(chat.style.right);
 console.log(chatToggle.textContent);
}


function sendMessage() {
    let message = document.getElementById('chat-input').value;
    if (message === "" || message == null || message === undefined) {
        alert("メッセージを入力してください");
        return;
    }
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    document.getElementById('chat-messages').appendChild(messageElement);
    document.getElementById('chat-input').value = '';
    //スクロールを最下部に
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
