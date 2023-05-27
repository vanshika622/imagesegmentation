// Select the file input and submit button
const fileInput = document.getElementById('imagefile');
const submitBtn = document.getElementById('submitBtn');
const substitutionMap = {
    'a': 'n',
    'b': 'o',
    'c': 'p',
    // ...
    'y': 'l',
    'z': 'm',
    '0': '5',
    '1': '6',
    '2': '7',
    // ...
    '!': '?',
    '@': '%',
    // ...
  };

// Add a click event listener to the submit button
submitBtn.addEventListener('click', () => {
    // Get the selected file
    const file = fileInput.files[0];

    // Create a new image object
    const img = new Image();

    // Set the image source to the selected file
    img.src = URL.createObjectURL(file);

    // Wait for the image to load
    img.onload = () => {
        // Segment the image into a 4x4 grid
        const segments = segmentImage(img, 4, 4);


        // Display the segmented images to the user
        displaySegments(segments);
    };
});

// Function to segment an image into a grid
function segmentImage(image, rows, cols) {
    // Get the width and height of the image
    const width = image.width;
    const height = image.height;

    // Calculate the width and height of each segment
    const segmentWidth = width / 4;
    const segmentHeight = height / 4;

    // Create an array to store the segmented images
    const segments = [];

    // Loop through each row and column
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
            // Create a canvas to draw the segment onto
            const canvas = document.createElement('canvas');
            canvas.width = segmentWidth;
            canvas.height = segmentHeight;
            const ctx = canvas.getContext('2d');

            // Draw the segment onto the canvas
            ctx.drawImage(image, col * segmentWidth, row * segmentHeight, segmentWidth, segmentHeight, 0, 0, segmentWidth, segmentHeight);
            // ctx.drawImage(image, col * segmentWidth, row * segmentHeight, segmentWidth, segmentHeight, 0, 0, segmentWidth, segmentHeight);

            // Get the data URL of the canvas and add it to the segments array
            segments.push(canvas.toDataURL());
        }
    }

    return segments;
}

// Function to display segmented images to the user
function displaySegments(segments) {
    // Get the segmented images div element
    const segmentedImagesDiv = document.getElementById('segmented-images');

    // Clear any existing content in the div
    segmentedImagesDiv.innerHTML = '';

    // Loop through each segment and create an img element to display it
    segments.forEach((segment, index) => {
        const innerdiv = document.createElement('div')
        innerdiv.setAttribute("data-segment", index)
        innerdiv.classList.add("password-segment")
        const img = document.createElement('img');
        img.src = segment;
        img.classList.add("image-segment")
        img.setAttribute('id', index)

        innerdiv.appendChild(img)

        segmentedImagesDiv.appendChild(innerdiv);

    });
    const dropped_container = document.getElementById("dropzone")
    //  const drop_txt = document.getElementById("#drop_txt")
    //  console.log(drop_txt)
    let len = segments.length;
    for (let i = 0; i < segments.length; i++) {
        console.log(i)
        const innerdiv = document.createElement('div')
        innerdiv.setAttribute("data-segment", i)
        innerdiv.classList.add("password-segment")
        const img = document.createElement('img');
        img.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURHxUYKCggGBolJxUVITEhJSkrLi4uFx8/ODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAQADBgT/xAAcEAEBAQEBAQEBAQAAAAAAAAAAARFhkVEhIgL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+6FAlKA6SlHOHKBwpQhQDhQIUoHCgQoBxYMWAZQIsA1gqBqKgSioEoqCxUUFZmBlRgVmYFjIoMzMDMzA8rDjnClB0hQIUA4cc4UB0hRzhygcpQIUAoUCFAOEEKAUIIUAoolAKKMUCUYoKqKCqkaArMwLGRQZmYFZowMzMDycKOcpwDlKBKUA4crnClB0hQIUA4UCFAOFAhQDiwYUAoUCEBLBhASwYoEqRQVUUFUVgEyKDKjArMwMqLAZmYHkIUoQpQOHK5woDpCgQoBw45woDpCjnCgOkKBCgFCgQoBwoEKAUICgEUAoBRRWASooKqMBRkUFZmBlRQZmYFZFB42HHOFAdIUc4cA5SgQpQOHK5woDpCgSlAOFAhSgcKBKUA4UCFAKFAhQDihCAookBRRigSioKsRQVUUGZmBWRQZUYHjIUc4cA4UCFAOFKEKA6QpXOU4BynHOFKDpCjnCgOkKBCgHFgxYBwoEKAawYsA1gqBLBhQCUYoEyKCqiwFZIoMqMCszA8TClCFAOFAlKAcOOcKUHSFAhSgcKUIUB0lKOcpwDhQJSgHCgQoBwoEKAUKBCgHKorAKEKwCiiUBVRYCqjASjFBWZgVkUHhpSlCFAdIUc4UB0hQIUA5SgQoDpKUc4coHClCFAdIUc5SgOkKOcOAcWDFgHCgQoBxYMWAajFgGoxQJRhAqooKoqCxUUGZmB4WFAhQDhQIUA5SgSlAOHK5woDpClCFAOFAlKA6Qo5w5QOFAhQDhQJSgHCgQoBxYMWAZQIsA1gqBFBWASwYoEyKCxUUFZmB4MoEWAcKBClB0hRzhQHSFAhQDhQIUoHKcc4UoOkKBCgHDjnKUB0hRzhSg6QoEKAUKBCgHCgQoBQghQCiisAoQrAJRigqooKqRgeCiwJhTOAcpSuf5wpnAdJSlc5nCmcB0lKVzmcKZwHSUpXOZwpnAdZSlcpnCmcB1lKVymcOZwHSU5XKZwpnAdZSlcpnCmcB1lKVymcOZwHSUpXOZxZnAdZVlc5nPCmcB0lKVzmc8X84Dpq6Ez5PFmcB01Y5zPk8L84ByqEz5PF/Pk8A1DP8APyeL/PyeAa65/wA/J4v58ngPARWYCixmAijMBQozAUKMwFCjMBQozAUKMwHCjMBQojAcJmBYTMBRYzAUWMwLCiMBRYzAqswKrMD/2Q=="
        img.classList.add("dropped-images")
        img.setAttribute('id', i)

        innerdiv.appendChild(img)
        // drop_txt.style.visibility="none";
        // drop_txt.style.opacity=0;
        dropped_container.appendChild(innerdiv)
    }

    dropped_container.style.display = "block"
    addDraggingevents();
}
function dragStart(event) {
    console.log(event.target.id)
    event.dataTransfer.setData("text", event.target.id);
}
function addDraggingevents() {
    const draggable_elements = document.querySelectorAll(".image-segment")
    console.log(draggable_elements)
    const droppableElems = document.querySelectorAll(".dropped-images");
    console.log(droppableElems)
    draggable_elements.forEach((elem) => {
        elem.addEventListener("dragstart", (event) => {
            console.log(event.target.id)
            event.dataTransfer.setData("text", event.target.id);

        });

    });
    droppableElems.forEach((elem) => {
        elem.addEventListener("dragenter", (event) => {
            event.target.classList.add("droppable-hover");
        });
        elem.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        elem.addEventListener("dragleave", (event) => {
            event.target.classList.remove("droppable-hover");
        });
        elem.addEventListener("drop", (event) => {
            event.preventDefault();

            // Set unique data for both elements 
            const draggableElemData = event.dataTransfer.getData("text");
            console.log(draggableElemData)
            const droppableElemData = event.target.id;
            console.log(droppableElemData)

            // Check if element is positioned correctly 

            // Get elements 
            const droppableElem = event.target;
            console.log(droppableElem)
            const draggableElem = document.getElementById(draggableElemData);
            console.log(draggableElem)

            // Change the state of droppable element
            droppableElem.src = draggableElem.src;
            console.log(droppableElem)
            droppableElem.classList.add("dropped");

            // Change the state of draggable element
            draggableElem.classList.add("dragged");
             draggableElem.setAttribute("draggable", "false");

            event.target.classList.remove("droppable-hover");

        });
    });
}

//Set -password
const setPasswordBtn = document.getElementById('set-password');
setPasswordBtn.addEventListener('click', async () => {
    // Get the selected segment images
    const droppedsegements = document.querySelectorAll(".dropped-images");
    console.log(droppedsegements)

    // Get the segment image URLs
    let myKey = ""
    let value = ""
    let obj = {};
    obj[myKey] = value;
    for (let i = 0; i < droppedsegements.length; i++) {
        // segmentURLs.push(droppedsegements[i].getAttribute('src'))
        myKey = droppedsegements[i].getAttribute('id')
        value = droppedsegements[i].getAttribute('src')
        obj[myKey] = value

    }
    
    const imageDataString = JSON.stringify(obj);
    chrome.storage.local.set({ 'jsondata': obj },()=>{
        console.log("password set")
    });
const encryptedImageData = encryptString(imageDataString, substitutionMap);
console.log(encryptedImageData)
chrome.storage.local.set({ 'encryptedImageData': encryptedImageData },()=>{
    console.log("password set")
});
chrome.storage.local.set({ 'Isdataset': true },()=>{
    console.log("password set")
});
// Retrieve the encrypted image data from local storage and decrypt it
// chrome.storage.local.get(['encryptedImageData'], function(result) {
//     const encryptedImageData = result.encryptedImageData;
   
    await new Promise(resolve => {
        chrome.storage.local.get(['Isdataset'], function (result) {
            isData = result.Isdataset;
            
            resolve();
        });
    });
    if(isData==true){
        console.log("not successfull")
        chrome.windows.create({
            url: chrome.runtime.getURL('sucessful.html'),
            type: 'popup',
            width: 600,
            height: 300,
            left: (screen.width / 2) - (300 / 2),
            top: (screen.height / 2) - (200 / 2)
        });
        

    }
    else{
        alert('Error while setting the password')
    }

    
    
    // const imageDataString = decryptString(encryptedImageData, substitutionMap);
    // const imageData = JSON.parse(imageDataString);
    
    console.log(imageData);
  });

  


    // const encryptionKey = generateEncryptionKey();
    // const { encryptedData, nonce } = await encryptImageSegments(obj, encryptionKey);
    // chrome.storage.local.set({ imageSegments: encryptedData, nonce: nonce });
    // chrome.storage.local.get(['imageSegments', 'nonce'], async (result) => {
    //     const encryptedData = result.imageSegments;
    //     const nonce = result.nonce;
    //     const imageSegmentData = await decryptImageSegments(encryptedData, nonce, encryptionKey);
    //     console.log(imageSegmentData);
    //   });

    // const { encryptedData, iv } = await encryptImageSegments(obj);
    // chrome.storage.local.set({ imageSegments: encryptedData, iv: iv },()=>{
    //     console.log("passowrd saved")
    // });
    // chrome.storage.local.get(['imageSegments', 'iv'], async (result) => {
    //     const encryptedData = result.imageSegments;
    //     const iv = result.iv;
    //     const imageSegmentData = await decryptImageSegments(encryptedData, iv);
    //     console.log(imageSegmentData);
    //     console.log("finished")
    //   });
// })

function encryptString(str, map) {
    let encryptedStr = '';
    for (const char of str) {
      const substitution = map[char] || char;
      encryptedStr += substitution;
    }
    return encryptedStr;
  }
  function decryptString(str, map) {
    // Invert the key-value pairs in the map object
    const inverseMap = {};
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        inverseMap[map[key]] = key;
      }
    }
  
    let decryptedStr = '';
    for (const char of str) {
      const substitution = inverseMap[char] || char;
      
      decryptedStr += substitution;
    }
    return decryptedStr;
  }
  
 // check password
 const checkPasswordBtn = document.getElementById('match-password');
 checkPasswordBtn.addEventListener('click',async()=>{
     let jsonImageData
   
      const droppedsegements = document.querySelectorAll(".dropped-images");
    console.log(droppedsegements)

    // Get the segment image URLs
    let myKey = ""
    let value = ""
    let obj = {};
    obj[myKey] = value;
    for (let i = 0; i < droppedsegements.length; i++) {
        // segmentURLs.push(droppedsegements[i].getAttribute('src'))
        myKey = droppedsegements[i].getAttribute('id')
        value = droppedsegements[i].getAttribute('src')
        obj[myKey] = value

    }
    console.log(typeof(obj))
    await new Promise(resolve => {
        chrome.storage.local.get(['jsondata'], function (result) {
            jsonImageData = result.jsondata;
            console.log(typeof (jsonImageData))
            resolve();
        });
    });

     if(JSON.stringify(obj)=== JSON.stringify(jsonImageData)){
        console.log("successfull")
        window.close();
     }
     else{
        console.log("not successfull")
        chrome.windows.create({
            url: chrome.runtime.getURL('error.html'),
            type: 'popup',
            width: 300,
            height: 200,
            left: (screen.width / 2) - (300 / 2),
            top: (screen.height / 2) - (200 / 2)
        });
        setTimeout(() => {
           
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.remove(tabs[0].id);
            });
        }, 1000);
     }
    
 })
  
  