var posts=["2025/08/12/数据库/","2025/08/12/hello-world/","2025/08/12/数据结构/","2025/08/18/math/","2025/08/12/深入Linux内核/","2025/08/12/线段树/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };