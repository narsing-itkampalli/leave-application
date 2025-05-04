(() => {
    const username = document.querySelector('#faculty-username');
    const password = document.querySelector('#faculty-password');
    const submitBtn = document.querySelector('.faculty-btn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(username.value && password.value) {
            location.href = './project 1.html';
        }
    });
})();

(() => {
    const username = document.querySelector('#hoi-username');
    const password = document.querySelector('#hoi-password');
    const submitBtn = document.querySelector('.hoi-btn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(username.value && password.value) {
            location.href = './project2.html';
        }
    });
})();