const fs = window.require('fs')

export function loadPosts() {
  return fs.readdirSync('/Users/wayne/_posts')
}

export function load(title) {
  return fs.readFileSync(`/Users/wayne/_posts/${title}`, 'utf-8')
}

export function save(title, content) {
  fs.writeFile(`/Users/wayne/_posts/${title}`, content, err => {
    if (err) {
      alert('An error ocurred updating the file' + err.message)
      return
    }

    alert('The file has been succesfully saved')
  })
}
