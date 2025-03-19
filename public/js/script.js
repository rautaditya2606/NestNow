(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


function togglePassword() {
  const password = document.getElementById('password');
  const icon = document.querySelector('.fa-eye');
  if (password.type === 'password') {
    password.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    password.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function previewImage() {
  const fileInput = document.getElementById('imageUrl');
  const preview = document.getElementById('imagePreview');
  const img = preview.querySelector('img');

  if (!fileInput.files || !fileInput.files[0]) {
    alert('Please select an image file');
    return;
  }

  const file = fileInput.files[0];
  const imageUrl = URL.createObjectURL(file);

  img.src = imageUrl;
  preview.classList.remove('d-none');

  img.onerror = () => {
    preview.classList.add('d-none');
    alert('Failed to load image. Please check the file.');
    URL.revokeObjectURL(imageUrl);
  };
}