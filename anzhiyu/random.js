var posts=["2025/08/12/hello-world/","2025/08/12/test/","2025/08/12/test3/","2025/08/12/test2/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };