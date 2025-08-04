let trainingData = {
  red: [],
  blue: [],
  other: []
};

document.querySelectorAll('.draggable').forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.src);
  });
});

document.querySelectorAll('.bucket').forEach(bucket => {
  bucket.addEventListener('dragover', e => e.preventDefault());
  bucket.addEventListener('drop', e => {
    e.preventDefault();
    const src = e.dataTransfer.getData('text/plain');
    const img = document.createElement('img');
    img.src = src;
    img.width = 100;
    img.height = 100;
    bucket.appendChild(img);
  });
});

function trainModel() {
  trainingData.red = getImagesFromBucket('redBucket');
  trainingData.blue = getImagesFromBucket('blueBucket');
  trainingData.other = getImagesFromBucket('otherBucket');
  alert('Model trained! Now test it.');
}

function getImagesFromBucket(bucketId) {
  const bucket = document.getElementById(bucketId);
  return Array.from(bucket.getElementsByTagName('img')).map(img => img.src);
}

function classify(img) {
  const color = getDominantColor(img.src);
  let prediction = 'Other';
  if (color === 'red') prediction = 'Red';
  else if (color === 'blue') prediction = 'Blue';

  document.getElementById('results').innerText =
    `AI Prediction: ${prediction} T-shirt`;
}

function getDominantColor(src) {
  if (src.includes('red')) return 'red';
  if (src.includes('blue')) return 'blue';
  return 'other';
}

function resetGame() {
  ['redBucket', 'blueBucket', 'otherBucket'].forEach(id => {
    document.getElementById(id).innerHTML = id.replace('Bucket', '') + ' T-shirts';
  });
  document.getElementById('results').innerText = '';
}
