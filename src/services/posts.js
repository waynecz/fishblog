const fs = window.require('fs');

export function loadPosts() {
  return fs.readdirSync('/Users/huangyan/WebstormProjects/myblog/source/_posts');
}

export function load(title) {
  return fs.readFileSync(`/Users/huangyan/WebstormProjects/myblog/source/_posts/${title}`, 'utf-8');
}

export function save(title, content) {
  fs.writeFile(`/Users/huangyan/WebstormProjects/myblog/source/_posts/${title}`, content, (err) => {
    if (err) {
      alert('An error ocurred updating the file' + err.message);
      return;
    }

    alert('The file has been succesfully saved');
  });
}