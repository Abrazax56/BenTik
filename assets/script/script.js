
const downloadBox = document.querySelector(".dlbx");
const form = document.forms['form'];
const input = document.querySelector('.form-control');
const buttonSubmit = document.querySelector('.btn-submit');
const buttonLoad = document.querySelector('.btn-loading');

(async function submited() {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    buttonSubmit.classList.toggle('d-none');
    buttonLoad.classList.toggle('d-none');
    try {
      const url = input.value;
      await getData(url);
    } catch (err) {
      alert(err);
    }
  });
})();

function getData (url) {
  const urlAPI = ['https://api.zeeoneofc.my.id/api/downloader/tiktok?apikey=aow3INzCyGcQpJf&url=', 'https://api.zeeoneofc.my.id/api/downloader/tiktok?apikey=SeKZosORCO9vmBF&url=', 'https://api.zeeoneofc.my.id/api/downloader/tiktok?apikey=Vs4iDRUudCsvoqA&url='];
  const apiURL = urlAPI[Math.floor(Math.random() * urlAPI.length)];
  fetch(`${apiURL}${url}`)
  .then(response => response.json())
  .then(response => {
    if(response.status === 403) {
      throw new Error(response.message);
    } else {
      buttonSubmit.classList.toggle('d-none');
      buttonLoad.classList.toggle('d-none');
      downloadBox.innerHTML = showUI(response.result.wm, response.result.nowm, response.result.audio);
      form.reset();
    }
  })
  .catch(err => {
    alert(err);
    console.error(err);
  });
}

function showUI (urlwm, urlnowm, urlaud) {
  return `<div class="mt-5 dl w-100 d-flex flex-wrap gap-4 justify-content-center align-items-center">
        <a class="link-dl px-5 py-2 d-flex flex-column justify-content-center align-items-center" href="${urlwm}" target="_blank">
          <h1 class="title-dl"><i class="fa-solid fa-arrow-down"></i> Watermark</h1>
          <p class="sub-dl">download this video with watermark</p>
        </a>
        <a class="link-dl px-5 py-2 d-flex flex-column justify-content-center align-items-center" href="${urlnowm}" target="_blank">
          <h1 class="title-dl"><i class="fa-solid fa-arrow-down"></i> No Watermark</h1>
          <p class="sub-dl">download this video without watermark</p>
        </a>
        <a class="link-dl px-5 py-2 d-flex flex-column justify-content-center align-items-center" href="${urlaud}" target="_blank">
          <h1 class="title-dl"><i class="fa-solid fa-arrow-down"></i> Audio</h1>
          <p class="sub-dl">download audio from this video</p>
        </a>
      </div>`
}