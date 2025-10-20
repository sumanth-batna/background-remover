function previewImage() {
    const fileInput = document.getElementById("imageInput");
    const originalImage = document.getElementById("originalImage");
    if (fileInput.files.length) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            originalImage.src = e.target.result;
            originalImage.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

async function removeBackground() {
    const fileInput = document.getElementById("imageInput");
    const processedImage = document.getElementById("processedImage");
    const downloadLink = document.getElementById("downloadLink");
    if (!fileInput.files.length) {
        alert("Please upload an image first.");
        return;
    }
    
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");
    
    const apiKey = "3utFsvtfhH7GJYrsixxj1f8e"; // Replace with your API key
    
    try {
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": apiKey },
            body: formData
        });
        
        if (!response.ok) {
            throw new Error("Failed to remove background");
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        processedImage.src = url;
        processedImage.style.display = "block";
        downloadLink.href = url;
        downloadLink.style.display = "block";
    } catch (error) {
        alert(error.message);
    }
}
