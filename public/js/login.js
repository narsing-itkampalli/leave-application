(() => {
    const username = document.querySelector('#faculty-username');
    const password = document.querySelector('#faculty-password');
    const submitBtn = document.querySelector('.faculty-btn');
    const errorMessage = document.querySelector('#faculty-error-message');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const data = {
            email: username.value,
            password: password.value,
            role: 'staff'
        };

        errorMessage.innerText = '';

        if(!data.email || !data.password) {
            return;
        }

        fetch('/auth/login', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            return res.json();
        }).then((data) => {
            if(!data.ok) {
                errorMessage.innerText = data.message;
            }else {
                location.replace('/');
            }
        })
    });
})();

(() => {
    const username = document.querySelector('#hoi-username');
    const password = document.querySelector('#hoi-password');
    const submitBtn = document.querySelector('.hoi-btn');
    const errorMessage = document.querySelector('#hoi-error-message');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const data = {
            email: username.value,
            password: password.value,
            role: 'higherAuthority'
        };

        errorMessage.innerText = '';

        if(!data.email || !data.password) {
            return;
        }

        fetch('/auth/login', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            return res.json();
        }).then((data) => {
            if(!data.ok) {
                errorMessage.innerText = data.message;
            }else {
                location.replace('/');
            }
        })
    });
})();