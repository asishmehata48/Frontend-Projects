const form = document.getElementById('shorten-form');
const longUrlInput = document.getElementById('long-url');
const shortUrlInput = document.getElementById('short-url');
const resultDiv = document.getElementById('result');
const copyBtn = document.getElementById('copy-btn');
const urlListBody = document.querySelector('#url-list tbody');

const DOMAIN = 'https://short.ly/';

function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

function saveToLocalStorage(longUrl, shortUrl) {
  const stored = JSON.parse(localStorage.getItem('urls')) || [];
  stored.push({ longUrl, shortUrl });
  localStorage.setItem('urls', JSON.stringify(stored));
}

function loadUrlList() {
  const stored = JSON.parse(localStorage.getItem('urls')) || [];
  urlListBody.innerHTML = '';
  stored.forEach(({ longUrl, shortUrl }) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="${longUrl}" target="_blank">${longUrl}</a></td>
      <td><a href="${shortUrl}" target="_blank">${shortUrl}</a></td>
    `;
    urlListBody.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const longUrl = longUrlInput.value.trim();

  if (!isValidUrl(longUrl)) {
    alert('❌ Please enter a valid URL.');
    return;
  }

  const shortCode = generateShortCode();
  const shortUrl = DOMAIN + shortCode;

  shortUrlInput.value = shortUrl;
  resultDiv.classList.remove('hidden');

  saveToLocalStorage(longUrl, shortUrl);
  loadUrlList();

  longUrlInput.value = '';
});

copyBtn.addEventListener('click', () => {
  shortUrlInput.select();
  document.execCommand('copy');
  copyBtn.textContent = '✅ Copied';
  setTimeout(() => (copyBtn.textContent = '📋 Copy'), 2000);
});

window.onload = loadUrlList;
