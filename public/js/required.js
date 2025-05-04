document.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.style.borderColor = 'var(--error-red)';
        } else {
            this.style.borderColor = '';
        }
    });
});