const btn = document.querySelector('#searchBtn')
btn.addEventListener('click', async (e) => {            
    const search = document.querySelector('#searchInput').value
    let orderBy = document.querySelector("#orderBy").value
    if(orderBy.trim() === "") {
        orderBy = "title"
    }
    if(search.trim() === '') {
        return
    }
    try {                
        const res = await fetch(`/search/${search}/${orderBy}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        const table = document.querySelector('table')                
        const message = document.querySelectorAll('.alert')[0]
        if(data.games !== null) {
            message.classList.add('d-none')
            table.innerHTML = '';
            let thead = table.insertRow()                    
            thead.insertCell().innerHTML = '<b><th>Title</th></b>'                    
            thead.insertCell().innerHTML = '<b><th>Year</th></b>'
            thead.insertCell().innerHTML = '<b><th>Multiplayer</th></b>'                    
            thead.insertCell().innerHTML = '<b><th>Platinum</th></b>'
            thead.insertCell().innerHTML = '<b><th>Actions</th></b>'
            data.games.forEach(game => {
                const row = table.insertRow()
                const cellTitle = row.insertCell()
                cellTitle.innerHTML = game.title
                const cellYear = row.insertCell()
                cellYear.innerHTML = game.year
                const cellMultiplayer = row.insertCell()
                cellMultiplayer.innerHTML = game.multiplayer
                const cellPlatinum = row.insertCell()
                cellPlatinum.innerHTML = game.platinum
                const cellActions = row.insertCell()
                const linkShow = document.createElement('a')
                linkShow.href = `/game/show/${game.id}`
                linkShow.classList.add('btn', 'btn-sm', 'btn-primary')
                linkShow.innerHTML = '<i class="bi bi-info-circle"></i> Show'
                cellActions.appendChild(linkShow)
                const linkEdit = document.createElement('a')
                linkEdit.href = `/game/${game.id}`
                linkEdit.classList.add('btn', 'btn-sm', 'btn-warning', 'ms-1')
                linkEdit.innerHTML = '<i class="bi bi-pencil"></i> Edit'
                cellActions.appendChild(linkEdit)
                const linkDelete = document.createElement('a')
                linkDelete.href = `/destroy/${game.id}`
                linkDelete.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-1')
                linkDelete.innerHTML = '<i class="bi bi-trash"></i> Delete'
                cellActions.appendChild(linkDelete)
            })
        }
        else {                    
            message.classList.remove('d-none')
            table.innerHTML = ''
        }               
    }
    catch(error) {
    }
})