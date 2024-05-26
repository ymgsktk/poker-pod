document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io(); // Socket.IOのクライアントスクリプトを使用
    const countSpan = document.getElementById('count');
    const incrementButtons = document.querySelectorAll('.incrementBtn');
    const resetButton = document.getElementById('resetBtn');

    // サーバーから現在のカウントを受信
    socket.on('updateCount', (count) => {
        countSpan.textContent = count;
    });

    // 各ボタンにクリックイベントリスナーを追加
    incrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const incrementValue = parseInt(button.getAttribute('data-increment'), 10);
           // console.log(incrementValue)
            socket.emit('increment', incrementValue);
        });
    });
    resetButton.addEventListener('click', () => {
        socket.emit('reset'); // サーバーにリセットを通知
});
});
