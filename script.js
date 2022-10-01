let url = "http://localhost:3000/"

document.getElementById("sendUser").addEventListener("click", async() => {
    const name = document.getElementById("userName")
    const email = document.getElementById("email")
    const password = document.getElementById("password")  
    let userData = {
        name: name.value,
        email: email.value,
        password: password.value
    }
    await fetch(`${url}user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })
})

document.getElementById("sendEvent").addEventListener("click", async() => {
    const eventName = document.getElementById("eventName")
    const description = document.getElementById("description")
    const image = document.getElementById("image")
    const data = document.getElementById("data")
    const place = document.getElementById("place")    
    const coordinates = document.getElementById("coordinates")    
    const important_info = document.getElementById("important_info")    
    const map = document.getElementById("map")    
    let eventData = {
        name: eventName.value,
        description: description.value,
        image: image.value,
        data: data.value,
        place: place.value,
        coordinates: coordinates.value,
        important_info: important_info.value,
        map: map.value
    }
    await fetch(`${url}event`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(eventData)
    })
})

document.getElementById("sendTicket").addEventListener("click", async() => {
    const id = document.getElementById("id")
    const code = document.getElementById("code")
    const area = document.getElementById("area")  
    let ticketData = {
        id: id.value,
        code: code.value,
        type: area.value
    }
    await fetch(`${url}ticket`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ticketData)
    })
})

// Buscar

document.getElementById("authUser").addEventListener("click", async() => {
    const emailLogin = document.getElementById("emailLogin")
    const passwordLogin = document.getElementById("passwordLogin")  
    const token = document.getElementById("token")  
    let userData = {
        email: emailLogin.value,
        password: passwordLogin.value
    }
    await fetch(`${url}user/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    }).then(response => response.json()).then(data =>
        data.map((data) => {
            token.value = data.Token
        })
    )
})

document.getElementById("trackEvents").addEventListener("click", async() => {
    await fetch(`${url}event`, {
    }).then(response => response.json()).then(event =>
    document.getElementById("allEvents").innerHTML = event.reduce((accumulator, event) => {
        const data = new Date(Date.parse(event.data))
        let day = data.getDate()
        let month = data.getMonth()
        const year = data.getFullYear()
        day < 10 ? day = `0${day}` : false	
        month < 10 ? month = `0${month}` : false
        accumulator += `<tr>
                        <td>${event.id}</td>
                        <td>${event.name}</td>
                        <td>${day}/${month}/${year}</td>
                        <td>${event.description}</td>
                        <td>${event.image}</td>
                        <td>${event.place}</td>
                        <td>${event.coordinates}</td>
                        <td>${event.important_info}</td>
                        <td>${event.map}</td>
                        </tr>`
        return accumulator
    },""))
})

document.getElementById("trackEvent").addEventListener("click", async() => {
    const trackEventId = document.getElementById("trackEventId")
    await fetch(`${url}event/${trackEventId.value}`, {
    }).then(response => response.json()).then(event =>
    document.getElementById("eventById").innerHTML = event.reduce((accumulator, event) => {
        const data = new Date(Date.parse(event.data))
        let day = data.getDate()
        let month = data.getMonth()
        const year = data.getFullYear()
        day < 10 ? day = `0${day}` : false	
        month < 10 ? month = `0${month}` : false
        accumulator += `<tr>
                        <td>${event.id}</td>
                        <td>${event.name}</td>
                        <td>${day}/${month}/${year}</td>
                        <td>${event.description}</td>
                        <td>${event.image}</td>
                        <td>${event.place}</td>
                        <td>${event.coordinates}</td>
                        <td>${event.important_info}</td>
                        <td>${event.map}</td>
                        </tr>`
        return accumulator
    },""))
}) 