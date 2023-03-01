const form = document.querySelector('form');

const upload = async (formData) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/tms', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

form.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(form);
    const res = await upload(formData);
    console.log('response', res);
    form.reset();
  } catch (error) {
    console.error(error);
  }
});
