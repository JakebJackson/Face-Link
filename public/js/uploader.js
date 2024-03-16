const options = {
    apiKey: "public_12a1ys62u7uydXDF6tT3LtQp6w4C", // Get API keys from: www.bytescale.com

    maxFileCount: 10,
    layout: "inline",
    container: "#upload-container",

    // Alternative setup: 
    // showFinishButton: false,
    // onUpdate: (event) => console.log(JSON.stringify(event))
    showFinishButton: true
};

Bytescale.UploadWidget
    .open(options)
    .then(async files => { // Line 16: Handle resolved value
        if (files.length === 0) {
            alert("No files selected.");
        } else {
            try {
                const response = await fetch('/api/app/upload', { // Line 21: Use await inside async function
                    method: 'POST',
                    body: JSON.stringify(files),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.replace('/');
                } else {
                    alert(response.statusText);
                }
            } catch (error) {
                alert(error.message); // Handle any errors during fetch
            }
        }
    })
    .catch(error => alert(error));