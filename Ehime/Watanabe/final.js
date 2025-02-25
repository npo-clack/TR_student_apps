document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".country");
    const foodImages = document.querySelectorAll("#food-container img");
    const foodTitles = document.querySelectorAll("#food-container p");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const country = this.getAttribute("data-country");
            // すべての料理画像を非表示にする
            foodImages.forEach(img => {
                img.style.display = "none";
            });
            foodTitles.forEach(img => {
                img.style.display = "none";
            });
            // クリックされた国の料理画像を表示
            const selectedImage = document.querySelector(`#food-container img[data-country="${country}"]`);
            if (selectedImage) {
                selectedImage.style.display = "block";
            }
            const selectedTitle = document.querySelector(`#food-container p[data-country="${country}"]`);
            if (selectedTitle) {
                selectedTitle.style.display = "block";
            }
        });
    });
    // 初期状態ですべての画像を非表示にする
    foodImages.forEach(img => img.style.display = "none");
    foodTitles.forEach(img => img.style.display = "none");
});
