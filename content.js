// Select the file input and submit button
const fileInput = document.getElementById('fileInput');
const submitBtn = document.getElementById('submitBtn');

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
    const segments = segmentImage(img, 2, 2);
    
    // Display the segmented images to the user
    displaySegments(segments);
  };
});

// Function to segment an image into a grid
// function segmentImage(image, rows, cols) {
//   // Get the width and height of the image
//   const width = image.width;
//   const height = image.height;
  
//   // Calculate the width and height of each segment
//   const segmentWidth = width / cols;
//   const segmentHeight = height / rows;
  
//   // Create an array to store the segmented images
//   const segments = [];
  
//   // Loop through each row and column
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < 2; col++) {
//       const x = col * Math.floor(cols / 2) * segmentWidth;
//       // Create a canvas to draw the segment onto
//       const canvas = document.createElement('canvas');
//       canvas.width = segmentWidth;
//       canvas.height = segmentHeight;
//       const ctx = canvas.getContext('2d');
      
//       // Draw the segment onto the canvas
//       // ctx.drawImage(image, col * segmentWidth, row * segmentHeight, segmentWidth, segmentHeight, 0, 0, segmentWidth, segmentHeight);
//       ctx.drawImage(image, x, row * segmentHeight, segmentWidth, segmentHeight, 0, 0, segmentWidth, segmentHeight);
      
//       // Get the data URL of the canvas and add it to the segments array
//       segments.push(canvas.toDataURL());
//     }
//   }

//   return segments;
// }
function segmentImage(image, rows, cols) {
  // Get the width and height of the image
  const width = image.width;
  const height = image.height;

  // Calculate the width and height of each segment
  const segmentWidth = width / 2;
  const segmentHeight = height / 4;

  // Create an array to store the segmented images
  const segments = [];

  // Loop through each row and column
  for (let row = 0; row < 2; row ++) {
    for (let col = 0; col < 4; col ++) {
      // Create a canvas to draw the segment onto
      const canvas = document.createElement('canvas');
      canvas.width = segmentWidth ;
      canvas.height = segmentHeight ;
      const ctx = canvas.getContext('2d');

      // Draw the segment onto the canvas
      ctx.drawImage(image, col * segmentWidth, row * segmentHeight, segmentWidth, segmentHeight, 0, 0, segmentWidth, segmentHeight);
      // ctx.drawImage(image, col * segmentWidth, row * segmentHeight, segmentWidth * 2, segmentHeight * 2, 0, 0, segmentWidth * 2, segmentHeight * 2);

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
    const innerdiv= document.createElement('div')
    innerdiv.setAttribute("data-segment", index)
    innerdiv.classList.add("password-segment")
    const img = document.createElement('img');
    img.src = segment;
    img.classList.add("image-segment")
    img.setAttribute('id',index)
    
    innerdiv.appendChild(img)
    
    segmentedImagesDiv.appendChild(innerdiv);
    
  });
  const dropped_container= document.getElementById("dropzone")
  let len = segments.length;
  for(let i=0;i<segments.length;i++){
    console.log(i)
    const innerdiv= document.createElement('div')
    innerdiv.setAttribute("data-segment", i)
    innerdiv.classList.add("password-segment")
    const img = document.createElement('img');
    img.src = ""
    img.classList.add("dropped-images")
    img.setAttribute('id',i)
    
    innerdiv.appendChild(img)
    dropped_container.appendChild(innerdiv)
  }
  
  dropped_container.style.display="block"
  addDraggingevents();
}
function dragStart(event) {
  console.log(event.target.id)
  event.dataTransfer.setData("text", event.target.id);
}
function addDraggingevents(){
  const draggable_elements = document.querySelectorAll(".image-segment")
  console.log(draggable_elements)
  const droppableElems = document.querySelectorAll(".dropped-images");
  console.log(droppableElems)
  draggable_elements.forEach((elem) => {
    elem.addEventListener("dragstart", (event)=>{
      console.log(event.target.id)
  event.dataTransfer.setData("text", event.target.id);

    });
    
  });
  droppableElems.forEach((elem) => {
    elem.addEventListener("dragenter", (event)=>{
      event.target.classList.add("droppable-hover");
    });
    elem.addEventListener("dragover", (event)=>{
      event.preventDefault();
    });
    elem.addEventListener("dragleave", (event)=>{
      event.target.classList.remove("droppable-hover");
    });
    elem.addEventListener("drop", (event)=>{
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
    // draggableElem.setAttribute("draggable", "false");
   
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
  var obj = {};
  obj[myKey] = value;
  for(let i =0;i<droppedsegements.length;i++){
    // segmentURLs.push(droppedsegements[i].getAttribute('src'))
    var myKey = droppedsegements[i].getAttribute('id')
    var value = droppedsegements[i].getAttribute('src')
    obj[myKey]=value
  }
  // droppedsegements.map(segment => segment.querySelector('img').getAttribute('src'));
  console.log(obj)

  const key = 'my-password';
const sensitiveData = obj;

const encryptedData = await encryptData(sensitiveData, key);

localStorage.setItem('encryptedData', encryptedData);

});

async function encryptData(input, key) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  const iv = crypto.getRandomValues(new Uint8Array(16));

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    data,
  );

  return { iv, encryptedData };
}
async function decryptData(encryptedData, key, iv) {
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    encryptedData,
  );

  const decoder = new TextDecoder();
  const output = decoder.decode(decryptedData);

  return output;
}

