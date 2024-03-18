const deleteButtons = document.querySelectorAll('.delete-button');

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


async function deleteFile(params) {
    const baseUrl = "https://api.bytescale.com";
    const path = `/v2/accounts/12a1ys6/files`;
    const entries = obj => Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
    const query = entries(params.querystring ?? {})
        .flatMap(([k, v]) => Array.isArray(v) ? v.map(v2 => [k, v2]) : [[k, v]])
        .map(kv => kv.join("=")).join("&");
    // Response function for removing the deleted data from the uploader bytescale API
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

deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        // Get the parent element (the common parent of the button and img)
        const parentElement = event.target.parentElement;

        // Get the sibling img element
        const imgElement = parentElement.querySelector('img');

        // Splitting the src url to get the path of the img in the API
        const imgSplit = imgElement.src.split('raw');
        const getImgId = imgElement.id.split('-');

        // Get path from img url
        const imgPath = imgSplit[1];
        const imgId = getImgId[1];

        // Do something with the img element
        console.log(imgElement.src);

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