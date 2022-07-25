let session = new Session()
session = session.getSession()

if (session !== "") {
    window.location.href='globalc.html'
}


var reg_btn = document.querySelector('.register_btn')
reg_btn.addEventListener('click', ()=> {
    let register_form = document.querySelector('.register_form')
    let login_form = document.querySelector('.main_wrapper')
    login_form.style.display='none'
    register_form.style.display='flex'
})


var login_btn = document.querySelector('.yes_acc_login button')
login_btn.addEventListener('click', () => {
    let register_form = document.querySelector('.register_form')
    let login_form = document.querySelector('.main_wrapper')
    login_form.style.display='flex'
    register_form.style.display='none'
})


let config = {
 "korisnicko_ime" : {
    required: true,
    minlength: 5,
    maxlength: 50
 } ,  
 "register_email" : {
    required: true,
    email:true,
    minlength: 5,
    maxlength: 50
 } ,
 "register_lozinka" : {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: 'ponovi_lozinku'
 },
 
 "ponovi_lozinku" : {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: 'register_lozinka'
 }      

}

let validator = new Validator(config, '#registration_form')

document.querySelector('#registration_form').addEventListener('submit', (e)=> {
e.preventDefault()
if(document.querySelector('#korisnicko_ime').value !='') {
if(validator.validationPassed()) {
    
    let user = new User()
    user.username = document.querySelector('#korisnicko_ime').value
    user.email= document.querySelector('#email').value
    user.password= document.querySelector('#lozinka').value
    user.create_user()
}}
else{
    alert('nece pasuje')
}
})


document.querySelector('#login_form').addEventListener('submit', (e)=> {
e.preventDefault()
let email =  document.querySelector('#login_email').value
let password = document.querySelector('#login_password').value
if(email != '') {
let user = new User()
user.email = email
user.password = password
user.login_user()}
else{
    alert('popuni')
}
})