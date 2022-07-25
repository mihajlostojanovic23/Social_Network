
let session = new Session()
session_id = session.getSession()

if (session_id !== "") {

  async function PozivAsyncFje () {   //Poziv asinhrone funkcije iz klase User i vracanje rezultata(data od fetchovanje)
    let user = new User()
    user = await user.get(session_id)
    document.querySelector('.user_name').innerText = `Name: ${user.username}`
    document.querySelector('.user_email').innerText = `Email: ${user.email}`
    document.querySelector('.user_image p').innerText=`Welcome, ${user.username}`
  }

  PozivAsyncFje()
}
else{
    window.location.href='/'
}


document.querySelector('.logout').addEventListener('click', () => {
    let session = new Session()
    session.DestroySession()
    window.location.href='/'
})

document.querySelector('.change_profile').addEventListener('click', async () => {
    document.querySelector('.info_modal').style.display='flex'
    let user = new User()
    user = await user.get(session_id)
    document.getElementById('korisnicko_ime').value=`${user.username}`
    document.getElementById('email_change').value=`${user.email}`
    document.getElementById('password_change').value=`${user.password}`
})

document.querySelector('.close_modal').addEventListener('click',()=> {
    document.querySelector('.info_modal').style.display='none'
})


document.querySelector('#info_change').addEventListener('submit', (e)=> {
e.preventDefault()
let user = new User()
user.username = document.getElementById('korisnicko_ime').value
user.email =document.getElementById('email_change').value
user.password =document.getElementById('password_change').value
user.edit()
})


document.querySelector('.btn_delete').addEventListener('click', () => {
  let text = 'Da li ste sigurni da zelite da obriste profil?'
  if(confirm(text)=== true) {
    let user = new User()
    user.delete()
  }
  
})

document.querySelector('#form_post').addEventListener('submit', (e) => {
  e.preventDefault()
  async function post_create() {
    let content = document.querySelector('#post_area').value
    let post = new Post()
    post.post_content = content
    post = await post.create_Post()
    console.log(post)
    document.querySelector('#post_area').value=''
    let current_user= new User()
    current_user = await current_user.get(session_id)
    console.log(current_user)
    let delete_post = '';
    if(session_id== post.user_id){
      delete_post="<button class='remove-btn' onclick='RemoveComent(this)'>Delete</button>"
    }
    document.querySelector('.posts_items').innerHTML += `
    <div class='post_item' data-post_id =${post.id}>
      <div class='post_content'> 
      ${post.content} 
      </div>
      <hr class='comment_line'>
      <p>Author: ${current_user.username} </p>
      <div class='post_info'>
      <button onclick=likePost(this)><span> ${post.likes} </span>Likes</button>
      <button onclick='CommentPost(this)'>Comments</button>
      ${delete_post}
      </div>
      <div class='post_comments'>
    <form> 
    <input type='text' placeholder='Unesi komentar'>
    <button onclick='CommentPostSubmit(event)' >Send</button>
    </form> </div>
    </div>
    
    `
  }
  post_create()
});

async function getAllPosts() {
  let all_posts = new Post()
 all_posts = await all_posts.getPosts()
 console.log(all_posts)

 all_posts.forEach(post => {

  async function GetPost() {
    let user = new User()
    user = await user.get(post.user_id)

    let comments = new Comments() 
    comments = await comments.getAllComments(post.id)
    console.log(comments)
    let comment_html = ''
    if(comments.length > 0){
      comments.forEach(comment => {
        comment_html += `<div class='comment'>${comment.content} </div>`
        
      })
    }

    let delete_post = '';
    if(session_id== post.user_id){
      delete_post="<button class='remove-btn' onclick='RemoveComent(this)'>Delete</button>"
    }
    document.querySelector('.posts_items').innerHTML += `
  <div class='post_item' data-post_id = ${post.id}>
    <div class='post_content'> 
    ${post.content} 
   
    </div>
    <hr class='comment_line'>
    <p class='author'>Author: ${user.username} </p>
    <div class='post_info'>
    <button onclick=likePost(this)><span> ${post.likes} </span> Likes</button>
    <button onclick='CommentPost(this)'>Comments</button>
    ${delete_post}
    </div>
    <div class='post_comments'>
  <form> 
  <input type='text' placeholder='Unesi komentar'>
  <button onclick='CommentPostSubmit(event)' >Send</button>
  
  </form> ${comment_html}</div>
  </div>`}
  GetPost()
 })
}

getAllPosts()
let i = true
const CommentPost = btn => {
  let main_post = btn.closest('.post_item')
  let post_Id = main_post.getAttribute('data-post_id')

  main_post.querySelector('.post_comments').style.display='block'

}

const likePost = btn => {
let main_btn = btn.closest('.post_item')
let post_id = main_btn.getAttribute('data-post_id')
let button = btn.setAttribute('disabled', 'true')
let numbers_of_like = parseInt(btn.querySelector('span').innerText)
btn.querySelector('span').innerText = numbers_of_like + 1
let number = btn.querySelector('span').innerText = numbers_of_like + 1
let post = new Post()
post.likes = number
post.changeLikes(post_id, number)
}


const CommentPostSubmit = e => {
e.preventDefault()

let btn = e.target
btn.setAttribute('disabled', 'true')

let main_post = btn.closest('.post_item')
let post_Id = main_post.getAttribute('data-post_id')
let html = main_post.querySelector('.post_comments').innerHTML
let comment_value = main_post.querySelector('input').value
console.log(comment_value)
main_post.querySelector('.post_comments').innerHTML += `<div class='comment'> ${comment_value}</div>`

let comment = new Comments()
comment.content = comment_value
comment.post_id = post_Id
comment.user_id = session_id
comment.createComments()
comment_value = main_post.querySelector('input').value=''
}

const RemoveComent = el => {
let main_post = el.closest('.post_item')
let post_id = main_post.getAttribute('data-post_id')

async function removeCom() {
let post = new Post()
post = await post.removePost(post_id)

el.closest('.post_item').remove()

console.log(post_id)
}
removeCom()
}