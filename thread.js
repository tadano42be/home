self.addEventListener('message', (event) => {
    console.log('Message received from main thread:', event.data);
    // Perform background task here
    const result = `Processed: ${event.data}`;
    self.postMessage(result); // Send result back to main thread
});
