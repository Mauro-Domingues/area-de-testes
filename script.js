let url = "https://teste-backend-node.herokuapp.com/"
const setUrl = document.getElementById("url")
const token = document.getElementById("token")  
const hidden = document.getElementById("hidden")  
const hiddenAlert = document.querySelector(".hidden-alert")  
let message = document.getElementById("message")

setUrl.addEventListener("change", () => {
    url = setUrl.value
    if(url === "https://teste-backend-node.herokuapp.com/"){
        hiddenAlert.style.display = "none"
    }else{hiddenAlert.style.display = "block"}
})

function pop(){
    hidden.style.display = "grid"
    setTimeout(() => {
        hidden.style.display = "none"
    }, 2500)
}

// Autenticar

document.getElementById("authUser").addEventListener("click", async() => {
    const emailLogin = document.getElementById("emailLogin")
    const passwordLogin = document.getElementById("passwordLogin")
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
    message.innerHTML = "autenticar usuário"
    pop()
})

// Criar

document.getElementById("sendUser").addEventListener("click", async() => {
    const email = document.getElementById("email")
    const password = document.getElementById("password")  
    let userData = {
        email: email.value,
        password: password.value
    }
    await fetch(`${url}user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `${token.value}`},
        body: JSON.stringify(userData)
    })
    message.innerHTML = "criar usuário"
    pop()
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
        headers: {'Content-Type': 'application/json', 'Authorization': `${token.value}`},
        body: JSON.stringify(eventData)
    })
    message.innerHTML = "criar evento"
    pop()
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
        headers: {'Content-Type': 'application/json', 'Authorization': `${token.value}`},
        body: JSON.stringify(ticketData)
    })
    message.innerHTML = "gerar bilhete"
    pop()
})

// Buscar

document.getElementById("trackUsers").addEventListener("click", async() => {
    await fetch(`${url}user`, {headers: {'Authorization': `${token.value}`}})
    .then(response => response.json()).then(user =>
    document.getElementById("allUsers").innerHTML = user.reduce((accumulator, user) => {
        accumulator += `<tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td><details><summary>Exibir senha</summary>${user.password}</details></td>
                        </tr>`
        return accumulator
    },""))
    message.innerHTML = "buscar todos os usuários"
    pop()
})

document.getElementById("trackUserById").addEventListener("click", async() => {
    const trackUserId = document.getElementById("trackUserId")
    await fetch(`${url}user/${trackUserId.value}`, {headers: {'Authorization': `${token.value}`}})
    .then(response => response.json()).then(user =>
    document.getElementById("userById").innerHTML = user.reduce((accumulator, user) => {
        accumulator += `<tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td><details><summary>Exibir senha</summary>${user.password}</details></td>
                        </tr>`
        return accumulator
    },""))
    message.innerHTML = `buscar usuário com o id ${trackUserId.value}`
    pop()
})

document.getElementById("trackEvents").addEventListener("click", async() => {
    await fetch(`${url}event`, {headers: {'Authorization': `${token.value}`}})
    .then(response => response.json()).then(event =>
    document.getElementById("allEvents").innerHTML = event.reduce((accumulator, event) => {
        const data = new Date(event.data).toLocaleDateString()
        accumulator += `<tr>
                        <td>${event.id}</td>
                        <td>${event.name}</td>
                        <td>${data}</td>
                        <td>${event.description}</td>
                        <td>${event.image}</td>
                        <td>${event.place}</td>
                        <td>${event.coordinates}</td>
                        <td>${event.important_info}</td>
                        <td>${event.map}</td>
                        </tr>`
        return accumulator
    },""))
    message.innerHTML = "buscar todos os eventos"
    pop()
})

document.getElementById("trackEvent").addEventListener("click", async() => {
    const trackEventId = document.getElementById("trackEventId")
    await fetch(`${url}event/${trackEventId.value}`, {headers: {'Authorization': `${token.value}`}})
    .then(response => response.json()).then(event =>
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
    message.innerHTML = `buscar evento com o id ${trackEventId.value}`
    pop()
}) 

document.getElementById("trackAllTickets").addEventListener("click", async() => {
    await fetch(`${url}ticket`, {headers: {'Authorization': `${token.value}`}}).then(response => response.json()).then(ticket =>
    document.getElementById("allTickets").innerHTML = ticket.reduce((accumulator, ticket) => {
        accumulator += `<tr>
                        <th>${ticket.id}</th>
                        <th>${ticket.ticket_id}</th>
                        <th>${ticket.bar_code}</th>
                        <th>${ticket.qr_code}</th>
                        <th>R$${ticket.price}</th>
                        <th>${ticket.type}</th>
                        <th>${ticket.lot}</th>
                        </tr>`
        return accumulator
    },""))
    message.innerHTML = "buscar todos os ingressos"
    pop()
})

document.getElementById("trackTickets").addEventListener("click", async() => {
    const trackTicketId = document.getElementById("trackTicketId")
    await fetch(`${url}ticket/${trackTicketId.value}`, {headers: {'Authorization': `${token.value}`}})
    .then(response => response.json()).then(ticket =>
    document.getElementById("allTicketsEvent").innerHTML = ticket.reduce((accumulator, ticket) => {
        accumulator += `<tr>
                        <th>${ticket.id}</th>
                        <th>${ticket.ticket_id}</th>
                        <th>${ticket.bar_code}</th>
                        <th>${ticket.qr_code}</th>
                        <th>R$${ticket.price}</th>
                        <th>${ticket.type}</th>
                        <th>${ticket.lot}</th>
                        </tr>`
        return accumulator
    },""))
    message.innerHTML = `buscar ingresso do evento com id ${trackTicketId.value}`
    pop()
})

document.getElementById("trackTicketById-btn").addEventListener("click", async() => {
    const trackTicketById = document.getElementById("trackTicketById")
    await fetch(`${url}ticket/id/${trackTicketById.value}`, {headers: {'Authorization': `${token.value}`}})
    .then(response => response.json()).then(ticket =>
    document.getElementById("tableTicketByid").innerHTML = ticket.reduce((accumulator, ticket) => {
        accumulator += `<tr>
                        <th>${ticket.id}</th>
                        <th>${ticket.ticket_id}</th>
                        <th>${ticket.bar_code}</th>
                        <th>${ticket.qr_code}</th>
                        <th>R$${ticket.price}</th>
                        <th>${ticket.type}</th>
                        <th>${ticket.lot}</th>
                        </tr>`
        return accumulator
    },""))
    message.innerHTML = `buscar ingresso com o id ${trackTicketById.value}`
    pop()
})

// Editar

document.getElementById("updateUser").addEventListener("click", async() => {
    const putUserId = document.getElementById("putUserId")
    const newPass = document.getElementById("newPass")  
    let userData = {
        password: newPass.value
    }
    await fetch(`${url}user/${putUserId.value}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `${token.value}`},
        body: JSON.stringify(userData)
    })
    message.innerHTML = "alterar a senha"
    pop()
})

document.getElementById("updateEvent").addEventListener("click", async() => {
    const updateEventId = document.getElementById("updateEventId")
    const updateEventName = document.getElementById("updateEventName")
    const updateDescription = document.getElementById("updateDescription")
    const updateImage = document.getElementById("updateImage")
    const updateData = document.getElementById("updateData")
    const updatePlace = document.getElementById("updatePlace")    
    const updateCoordinates = document.getElementById("updateCoordinates")    
    const updateImportant_info = document.getElementById("updateImportant_info")    
    const updateMap = document.getElementById("updateMap")    
    let eventData = {
        name: updateEventName.value,
        description: updateDescription.value,
        image: updateImage.value,
        data: updateData.value,
        place: updatePlace.value,
        coordinates: updateCoordinates.value,
        important_info: updateImportant_info.value,
        map: updateMap.value
    }
    await fetch(`${url}event/${updateEventId.value}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `${token.value}`},
        body: JSON.stringify(eventData)
    })
    message.innerHTML = "editar evento"
    pop()
})

document.getElementById("updatedTicket").addEventListener("click", async() => {
    const getId = document.getElementById("getId")
    const newArea = document.getElementById("newArea")  
    let ticketData = {
        type: newArea.value
    }
    await fetch(`${url}ticket/id/${getId.value}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `${token.value}`},
        body: JSON.stringify(ticketData)
    })
    message.innerHTML = "editar área ingresso"
    pop()
})

// Deletar

document.getElementById("deleteUser").addEventListener("click", async() => {
    const deleteUserId = document.getElementById("deleteUserId")
    await fetch(`${url}user/${deleteUserId.value}`, {
        method: 'DELETE',
        headers: {'Authorization': `${token.value}`}
    })
    message.innerHTML = "deletar usuário"
    pop()
})

document.getElementById("deleteEvent").addEventListener("click", async() => {
    const deleteEventId = document.getElementById("deleteEventId")
    await fetch(`${url}event/${deleteEventId.value}`, {
        method: 'DELETE',
        headers: {'Authorization': `${token.value}`}
    })
    message.innerHTML = "deletar evento"
    pop()
})

document.getElementById("deleteTicket").addEventListener("click", async() => {
    const deleteTicketId = document.getElementById("deleteTicketId")
    await fetch(`${url}ticket/id/${deleteTicketId.value}`, {
        method: 'DELETE',
        headers: {'Authorization': `${token.value}`}
    })
    message.innerHTML = "deletar ingresso"
    pop()
})