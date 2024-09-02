document.getElementById('startButton').addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('time').value);
    const milliseconds = minutes * 60 * 1000;
    const endTime = Date.now() + milliseconds;
  
    chrome.storage.local.set({ endTime: endTime }, function() {
      console.log("Time set in storage: ", new Date(endTime));
      window.close();
    });
  });
  