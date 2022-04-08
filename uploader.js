const $inputFile = document.getElementById("files")

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

document.addEventListener("change", e => {
  if (e.target === $inputFile) {
    const files = Array.from(e.target.files)
    files.forEach(el => upload(el))
  }
})