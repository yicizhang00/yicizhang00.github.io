var posts=["2025/08/12/hello-world/","2025/08/12/test2/","2025/08/12/test/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };