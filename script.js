const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const generateMemeButton = document.getElementById('generateMeme');
const downloadMemeButton = document.getElementById('downloadMeme');
let uploadedImage;

// Handle image upload
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width > 500 ? 500 : img.width;
            canvas.height = img.height > 500 ? 500 : img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            uploadedImage = img;
        };
        img.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Generate meme
generateMemeButton.addEventListener('click', () => {
    if (!uploadedImage) {
        alert("Please upload an image first!");
        return;
    }
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    ctx.font = '30px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';

    const topText = topTextInput.value.toUpperCase();
    ctx.fillText(topText, canvas.width / 2, 40);
    ctx.strokeText(topText, canvas.width / 2, 40);

    const bottomText = bottomTextInput.value.toUpperCase();
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
});

// Download meme
downloadMemeButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
