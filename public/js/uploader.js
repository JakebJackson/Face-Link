// Get delete buttons for deleting images.
const deleteButtons = document.querySelectorAll('.delete-button');
const downloadButtons = document.querySelectorAll('.download-button');

// Options for bytescale use
const options = {
    apiKey: "public_12a1ys62u7uydXDF6tT3LtQp6w4C", // Get API keys from: www.bytescale.com

    maxFileCount: 10,
    layout: "inline",
    container: "#upload-container",

    showFinishButton: true
};

// Logic for when uploader widget is used by user.
Bytescale.UploadWidget
    .open(options)
    .then(async files => { // Line 16: Handle resolved value
        if (files.length === 0) {
            alert("No files selected.");
        } else {
            try {
                // Method for sending information to upload route
                const response = await fetch('/api/app/upload', {
                    method: 'POST',
                    body: JSON.stringify(files),
                    headers: { 'Content-Type': 'application/json' },
                });

                // if success reload page.
                if (response.ok) {
                    document.location.replace('/');
                } else {
                    alert(response.statusText);
                }
                // this catch is used to determine if routing is the issue
            } catch (error) {
                alert('Route error: ' + error.message); // Handle any errors during fetch
            }
        }
    })
    // this catch is used to determine
    .catch(error => alert('JavaScript error: ' + error));

// Delete file function, called on .delete-button click.
async function deleteFile(params) {
    // Standard information mapping for the bytescale backend information
    const baseUrl = "https://api.bytescale.com";
    const path = `/v2/accounts/12a1ys6/files`;
    const entries = obj => Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
    const query = entries(params.querystring ?? {})
        .flatMap(([k, v]) => Array.isArray(v) ? v.map(v2 => [k, v2]) : [[k, v]])
        .map(kv => kv.join("=")).join("&");
    // Response function for removing the data from the uploader bytescale API
    const response = await fetch(`${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`, {
        method: "DELETE",
        headers: Object.fromEntries(entries({
            "Authorization": `Bearer ${params.apiKey}`,
        }))
    })

    // response try catch method for removing the data from our database.
    try {
        const response2 = await fetch(`/api/app/delete/${params.id}`, {
            method: 'DELETE',
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

    if (Math.floor(response.status / 100) !== 2) {
        const result = await response.json();
        throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
    }
}

// Logic for when user downloads an image.
async function downloadFile(params) {
    const baseUrl = "https://upcdn.io";
    const path = `/${params.accountId}/raw${params.filePath}`;
    const entries = obj => Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
    const query = entries(params.querystring ?? {})
        .flatMap(([k, v]) => Array.isArray(v) ? v.map(v2 => [k, v2]) : [[k, v]])
        .map(kv => kv.join("=")).join("&");
    const response = await fetch(`${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`, {
        method: "GET",
        headers: Object.fromEntries(entries({
            "Authorization": params.apiKey === undefined ? undefined : `Bearer ${params.apiKey}`,
        }))
    });
    if (Math.floor(response.status / 100) !== 2) {
        const result = await response.json();
        throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
    }
    return await response.blob();
}



// Create event listener for each event button.
deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        // Get the parent element (the common parent of the button and img)
        const parentElement = event.target.parentElement.parentElement;
        // Get the sibling img element
        const imgElement = parentElement.querySelector('img');
        // Splitting the src url to get the path of the img in the API
        const imgSplit = imgElement.src.split('raw');
        const getImgId = imgElement.id.split('-');
        // Get path/id from split vars.
        const imgPath = imgSplit[1];
        const imgId = getImgId[1]

        deleteFile({
            accountId: "12a1ys6",
            apiKey: apiKey,
            id: imgId,
            querystring: {
                filePath: imgPath
            }
        }).then(
            () => console.log("Success."),
            error => console.error(error)
        );
    })
});

downloadButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const parentElement = event.target.parentElement.parentElement;
        const imgElement = parentElement.querySelector('img');
        const imgSplit = imgElement.src.split('raw');
        const imgPath = imgSplit[1];
        console.log(imgPath);

        downloadFile({
            accountId: "12a1ys6",
            filePath: imgPath,
            apiKey: "public_12a1ys62u7uydXDF6tT3LtQp6w4C",
            querystring: {
                download: true,
            }
        }).then(
            blob => {
                const objectUrl = window.URL.createObjectURL(blob);
                window.location.assign(objectUrl);
            },
            error => console.error(error)
        );

    })
});

