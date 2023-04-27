fetch("./header.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        let header = document.querySelector("header")
        header.classList.add("navbar")
        header.style.backgroundColor = "#390050"
        header.innerHTML = data;

    })
    .catch(() => null)

