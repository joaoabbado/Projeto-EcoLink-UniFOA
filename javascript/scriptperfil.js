function previewProfilePic(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('profile-pic');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}