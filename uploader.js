const d = document,
  $inputFile = d.getElementById("files"),
  $main = d.querySelector("main"),
  $dropZone = d.querySelector(".dropzone");

const upload = (file) => {
  const xhr = new XMLHttpRequest(),
    formData = new FormData();

  formData.append("file", file);

  xhr.addEventListener('readystatechange', e => {
    if (xhr.readyState !== 4) return
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(JSON.parse(xhr.response))
    } else {
      const message = xhr.statusText || "Ha ocurrido un error"
      console.log(`Error ${xhr.status}: ${message}`)
    }
  })
  xhr.open("POST", "./assets/uploader.php")
  xhr.setRequestHeader("enc-type", "multipart/form-data")
  xhr.send(formData)
}

const progressUpload = (file) => {
  // Crear elementos
  const $progress = document.createElement("progress"),
    $span = document.createElement("span");

  //  Set default values to elements
  $progress.value = 0;
  $progress.max = 100;

  // Add elements to DOM
  $main.append($progress);
  $main.append($span);

  // Instance File Reader
  const reader = new FileReader()
  reader.readAsDataURL(file)

  // When uploading file
  reader.addEventListener("progress", e => {
    const progress = parseInt((e.loaded * 100) / e.total);
    $progress.value = progress;
    $span.innerHTML = `<b>${file.name}: ${progress}%</b>`;
  })

  // When uploaded
  reader.addEventListener("loadend", e => {
    upload(file)
    setTimeout(() => {
      $main.removeChild($progress);
      $main.removeChild($span);
      $inputFile.value = "";
    }, 3000);
  })
}

document.addEventListener("change", e => {
  if (e.target === $inputFile) {
    const files = Array.from(e.target.files)
    files.forEach(el => progressUpload(el))
  }
})

$dropZone.addEventListener("dragover", e => {
  e.stopPropagation();
  console.log(e)
  e.target.classList.add("active")
})

$dropZone.addEventListener("dragleave", e => {
  e.stopPropagation();
  e.target.classList.remove("active")
})

$dropZone.addEventListener("drop", e => {
  e.stopPropagation();
  const files = Array.from(e.dataTransfer.files)
  files.forEach(el => progressUpload(el))
  e.target.classList.remove("active")
})