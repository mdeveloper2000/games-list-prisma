const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault()            
    const title = form.title.value.toUpperCase().trim()
    const year = form.year.value.trim()
    const multiplayer = form.multiplayer.value.trim()
    const platinum = form.platinum.value.trim()
    const details = form.details.value.trim()
    const alert = document.querySelectorAll('.alert')[0]
    const message = document.querySelector('.message')
    if(title === '' || year === '') {            
        alert.classList.remove('d-none')
        return
    }
    if(parseInt(year) < 2011) {
        alert.classList.remove("d-none")
        message.innerHTML = "Year of release cannot be prior to 2011"
        return
    }
    try {            
        const res = await fetch('/store', {
            method: 'POST',
            body: JSON.stringify({ title, year, multiplayer, platinum, details }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()            
        if(data.errors === 0) {                                    
            location.assign('/')
        }
        else {
            alert.classList.remove("d-none")
            message.innerHTML = "This title was already registered"
        }
    } 
    catch(error) {            
    }
})