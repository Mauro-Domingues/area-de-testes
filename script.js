let url = "http://localhost:3000/"

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

document.getElementById("trackUsers").addEventListener("click", async() => {
    await fetch(`${url}user`, {
    }).then(response => response.json()).then(user =>
    document.getElementById("allUsers").innerHTML = user.reduce((accumulator, user) => {
        accumulator += `<tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        </tr>`
        return accumulator
    },""))
})

document.getElementById("trackUserById").addEventListener("click", async() => {
    const trackUserId = document.getElementById("trackUserId")
    await fetch(`${url}user/${trackUserId.value}`, {
    }).then(response => response.json()).then(user =>
    document.getElementById("userById").innerHTML = user.reduce((accumulator, user) => {
        accumulator += `<tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        </tr>`
        return accumulator
    },""))
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

document.getElementById("trackAllTickets").addEventListener("click", async() => {
    await fetch(`${url}ticket`).then(response => response.json()).then(ticket =>
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
})

document.getElementById("trackTickets").addEventListener("click", async() => {
    const trackTicketId = document.getElementById("trackTicketId")
    await fetch(`${url}ticket/${trackTicketId.value}`, {
    }).then(response => response.json()).then(ticket =>
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
})

document.getElementById("trackTicketById-btn").addEventListener("click", async() => {
    const trackTicketById = document.getElementById("trackTicketById")
    await fetch(`${url}ticket/id/${trackTicketById.value}`, {
    }).then(response => response.json()).then(ticket =>
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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })
})

document.getElementById("updateEvent").addEventListener("click", async() => {
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
    await fetch(`${url}event`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(eventData)
    })
})

document.getElementById("updatedTicket").addEventListener("click", async() => {
    const getId = document.getElementById("getId")
    const newArea = document.getElementById("newArea")  
    let ticketData = {
        type: newArea.value
    }
    await fetch(`${url}ticket/id/${getId.value}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ticketData)
    })
})

// Deletar

document.getElementById("deleteUser").addEventListener("click", async() => {
    const deleteUserId = document.getElementById("deleteUserId")
    await fetch(`${url}user/${deleteUserId.value}`, {
        method: 'DELETE'
    })
})

document.getElementById("deleteEvent").addEventListener("click", async() => {
    const deleteEventId = document.getElementById("deleteEventId")
    await fetch(`${url}event/${deleteEventId.value}`, {
        method: 'DELETE'
    })
})

document.getElementById("deleteTicket").addEventListener("click", async() => {
    const deleteTicketId = document.getElementById("deleteTicketId")
    await fetch(`${url}ticket/id/${deleteTicketId.value}`, {
        method: 'DELETE'
    })
})