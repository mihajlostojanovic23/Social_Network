class Comments {
user_id = ''
post_id = ''
content = ''
api_url='https://62d063e8d9bf9f170588d61a.mockapi.io'
createComments() {
let data = {
    user_id: this.user_id,
    post_id: this.post_id,
    content:this.content
}
data = JSON.stringify(data)

fetch(this.api_url + '/comments', {
    method: 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body: data}).then(response => response.json()).then(data=> {
        console.log(data)})
}

async getAllComments(post_id) {
let response = await fetch(this.api_url + '/comments/' )
let data = await response.json()
let post_comments = []
let i = 0
data.forEach(item => {
if(item.post_id == post_id) {
    post_comments[i] = item
    i++
}
})
return post_comments
}

DeleteComment(id) {
    fetch(this.api_url + '/comments/'+ id, {
        method: 'DELETE'
    }).then(response => response.json()).then (data => {
        console.log('mama')
    })
   
}
}