class Post {
  post_id = ''
  user_id = ''
  post_content = ''
  likes = ''
  api_url='https://62d063e8d9bf9f170588d61a.mockapi.io'

  async  create_Post() {
    let session = new Session()
    session_id = session.getSession()
    let data = {
        user_id: session_id,
        content: this.post_content,
        likes: 0
    }
    data = JSON.stringify(data)

    let response = await fetch(this.api_url + '/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: data
    })
    data =  response.json()
    return data
  }

  async getPosts() {
   let response = await fetch(this.api_url + '/posts/')
   let data = await response.json()
   return data
  }

  removePost(post_id) {
fetch(this.api_url + '/posts/' + post_id, {
    method: 'DELETE'
}).then(response=> response.json()).then(data => {

})
this.fja(post_id)
}

async fja(post_id) {
    let comments = new Comments()
comments = await comments.getAllComments(post_id)
console.log(comments)
comments.forEach(comment => {
    if(comment.post_id == post_id) {
        let comments2 = new Comments()
      comments2.DeleteComment(comment.id)
    }
})
}

changeLikes(post_id, likes) {
    let data = {
        likes: likes
    }
    data = JSON.stringify(data)
fetch(this.api_url + '/posts/' + post_id, {
    method: 'PUT',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: data 
}).then(response => response.json()).then(data => {console.log(data)})
alert('keke')
}
  
}