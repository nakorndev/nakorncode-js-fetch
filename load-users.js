// fetch() <-- promise
// response.json() <-- promise
// data

const loadingRow = document.getElementById('loadingRow')
const tableBody = document.getElementById('tableBody')

function createErrorRow(text) {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    td.innerText = text
    td.colSpan = 4
    td.classList.add('has-text-centered')
    td.classList.add('has-text-danger')
    tr.append(td)
    tableBody.append(tr)
}

fetch('https://reqres.in/api/users?page=2')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        if (json.data.length == 0) {
            createErrorRow('ไม่พบข้อมูล')
            return
        }
        for (let user of json.data) {
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            td1.innerText = user.id
            td2.innerText = user.avatar
            td3.innerText = user.email
            td4.innerText = `${user.first_name} ${user.last_name}`
            tr.append(td1)
            tr.append(td2)
            tr.append(td3)
            tr.append(td4)
            tableBody.append(tr)
        }
    })
    .catch((err) => {
        createErrorRow(err.message || 'มีปัญหาบางอย่างไม่คาดคิด')
    })
    .finally(() => {
        loadingRow.remove()
    })
