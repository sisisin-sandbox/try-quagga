document.querySelector('#start').addEventListener('click', () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    init();
  }
});
function init() {
  Quagga.init(
    {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('.video-el'),
      },
      numOfWorkers: 1,
      locate: true,
      decoder: {
        readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader'],
      },
    },
    function(err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    },
  );

  Quagga.onDetected(detect);
}

function detect(result) {
  Quagga.offDetected(detect);
  console.log(result);
}

document.querySelector('#stop').addEventListener('click', () => {
  Quagga.stop();
});
