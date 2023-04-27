let data = []

let obj = {
    "type": "Line",
    "chartName": "Name",
    "createdOn": "Monday",
    "download": "pdf",
}

let numRows = 20

for (let i = 0; i < numRows; i++) {
    data.push(obj)
}

for (let item of data) {
    let tr = document.createElement("tr")
    let table = document.querySelector("tbody")
    table.appendChild(tr)

    let properties = ["type", "chartName", "createdOn", "download"]

    for (let property of properties) {
        let td = document.createElement("td")
        td.innerHTML = item[property]
        tr.appendChild(td)
    }
}