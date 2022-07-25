class User {
user_id = ''
username = ''
email = ''
password=''
api_url='https://62d063e8d9bf9f170588d61a.mockapi.io'

create_user(){
let data = {
    username: this.username,
    email: this.email,
    password: this.password,
    
}
data = JSON.stringify(data)
fetch(this.api_url + '/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: data
})
.then(response => response.json())
.then(data =>{
    console.log ('Korisnik je kreiran')
    let session = new Session()
   session.user_id = data.id
   session.startSession()
    window.location.href='globalc.html'
})
}

async get(user_id) {
let api = this.api_url + '/users/' + user_id
let response = await fetch(api)
let data = response.json()
return data
}

edit() {
    let data = {
        username : this.username,
        email: this.email,
        password: this.password
    }

    data=JSON.stringify(data)
    let session = new Session()
    session_id = session.getSession()
    fetch(this.api_url+'/users/'+ session_id, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'},
        body: data
    }).then(resposne => resposne.json()).then(data => {
        console.log(data)
        window.location.href='globalc.html'
    })
    
}

delete() {
    let session = new Session()
    session_id=session.getSession()

    fetch(this.api_url + '/users/' + session_id, {
        method: 'DELETE'})
        .then(response => response.json())
        .then(data => {
            let session = new Session()
            session.DestroySession()
            window.location.href='/'
        })
}

login_user() {
fetch(this.api_url + '/users')
.then(resposne => resposne.json())
.then(data => { console.log(data)
    let login_succesfull=0
    data.forEach(db => {
        if (db.email == this.email && db.password == this.password) {
          let session = new Session()
          session.user_id = db.id
          session.startSession()
           login_succesfull= 1
           window.location.href='globalc.html'
        }
    }) 
    if(login_succesfull === 0) {
        alert('Pogresna e-mail adresa ili lozinka')
    }

})

}

}