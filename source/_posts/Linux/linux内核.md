# 系统调用

## Linux多路复用

### poll & select & epoll

| 特性             | select           | poll               | epoll                            |
| ---------------- | ---------------- | ------------------ | -------------------------------- |
| 出现时间         | 最早（BSD）      | 后来（POSIX 标准） | Linux 2.6（现代）                |
| 监听方式         | 位图（fd_set）   | 数组（pollfd）     | 内核事件表（epoll实例）          |
| fd 上限          | 1024（默认）     | 无限制             | 无限制                           |
| 事件通知机制     | 轮询（O(n)）     | 轮询（O(n)）       | 回调 + 事件驱动（O(1)）          |
| 返回事件方式     | 遍历全部 fd      | 遍历全部 fd        | 直接返回活跃 fd                  |
| 内核拷贝         | 每次都拷贝 fd 集 | 每次都拷贝         | 注册一次，共享内核态             |
| 性能随连接数变化 | 严重下降         | 严重下降           | 基本恒定                         |
| 使用复杂度       | 简单             | 中等               | 稍复杂（epoll_ctl / epoll_wait） |
| 是否支持边缘触发 | 否               | 否                 | ✅ 支持（EPOLLET）                |

#### select 

最早的多路复用机制，

```c
int select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout);
```

传入fd集合，最多1024个，select返回fd可以读写的，调用返回后需要遍历检查fd中是否有事件

缺点：1.最多1024个链接；2.需要全量复制fd集合；3.需要遍历fd；4.返回后的集合会被修改。



#### poll

```c
int poll(struct pollfd *fds, nfds_t nfds, int timeout);
```

去除了fd集合数量的上限，改用stuct pollfd数组代替位图。

缺点：1.仍然需要复制全量fd数组进内核；2.仍要遍历全量fd

#### epoll

```c
int epoll_create(int size);//创建epoll实例，事件表
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);//向内核注册修改删除fd
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);//等待事件发生

```

异步回调，把fd注册进内核，只在事件发生时通知应用程序。

- 当某个 fd 可读/可写时，内核会把它放入就绪队列；
- 调用 `epoll_wait` 时，直接返回就绪 fd 列表；
- 不需要像 `select/poll` 那样遍历所有 fd。

💡 所以 epoll 的性能是 **O(1)**：无论监听几万个 fd，



#### 触发模式

| 模式                              | 含义                     | 使用场景                 |
| --------------------------------- | ------------------------ | ------------------------ |
| **水平触发（Level Trigger，LT）** | 只要缓冲区有数据就会通知 | 默认模式，兼容性好       |
| **边缘触发（Edge Trigger，ET）**  | 只在状态变化时通知一次   | 性能更高，必须非阻塞 I/O |









