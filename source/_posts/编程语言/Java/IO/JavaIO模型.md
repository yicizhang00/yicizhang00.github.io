---
title: JavaIO模型
date: 2025-09-27 03:29:29
tags:
---

# 同步/异步/阻塞/非阻塞

在介绍IO前，首先需要了解同步/异步/阻塞/非阻塞的区别。

同步与异步是事件的调用方式，而阻塞与非阻塞是线程的执行方式。

### 同步

- 发起调用后，**必须主动轮询**获取返回结果。
- 执行流程是 **调用方主动等待结果**。

### 异步

- 发起调用后，**不用等结果，立刻返回**。
- 结果准备好后，系统会通过 **回调/事件/通知** 告诉你。

### 阻塞

- 调用时，如果没结果，**线程会停在那里，不能干别的**。
- 一直等到有结果才能返回。

### 非阻塞

- 调用时，如果没结果，**立刻返回错误码/状态**，不会卡住线程。
- 应用程序可以 **再次尝试** 或 **去干别的事**。



| 类型       | 同步/异步 | 阻塞/非阻塞 | 特点                       |
| ---------- | --------- | ----------- | -------------------------- |
| 同步阻塞   | 同步      | 阻塞        | 最传统，简单，但性能差     |
| 同步非阻塞 | 同步      | 非阻塞      | 需要轮询，多次调用，效率低 |
| 异步阻塞   | 异步      | 阻塞        | 等待通知时线程挂起         |
| 异步非阻塞 | 异步      | 非阻塞      | 最优，事件驱动模型         |

# Unix IO模型

Unix IO 模型有5种模型

## 同步阻塞IO

**调用方式**：`read()` 等用户发起系统调用会 **阻塞**当前线程，直到有数据到达并拷贝到用户缓冲区。

**特点**：简单易用，但一个线程只能处理一个连接。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201121163321.jpg)

## 同步非阻塞IO

**调用方式**：把 socket 设置为 **O_NONBLOCK**，系统调用立即返回：

- 如果没有数据，立刻返回 `EWOULDBLOCK` 错误码，并且不断调用`read()`轮询；
- 如果有数据，拷贝到用户空间后返回。
- 直到数据到了内核空间，这一次 read 调用后，在等待数据从内核空间拷贝到用户空间这段时间里，线程还是阻塞的，等数据到了用户空间再把线程叫醒。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201121163344.jpg)

非阻塞IO一般配合轮询使用，如果没有数据返回，线程可以先去干别的事，但是需要轮询保证下一轮可以继续获取数据。

```c
while (1) {
    int n = read(fd, buf, sizeof(buf));
    if (n < 0) {
        if (errno == EAGAIN) {
            // 没数据，继续轮询（CPU 忙等）
            continue;
        } else {
            perror("read error");
            break;
        }
    } else if (n == 0) {
        // 对方关闭连接
        break;
    } else {
        // 读到数据
        handle(buf, n);
    }
}

```



## IO多路复用

- **代表**：`select`、`poll`、`epoll`（Linux）、`kqueue`（BSD、macOS）。

- **原理**：把多个 socket 注册到一个多路复用器，内核帮你监听，哪个 socket 可读/可写再通知你。

- **特点**：

  - 一个线程就能管理成千上万个连接；
  - 常用于高并发服务器（Redis、Nginx、Netty）。

- **典型 API**：

  - `select`：FD 数量有限（通常 1024）。
  - `poll`：用链表存储 FD，数量无限制，但性能随连接数线性下降。
  - `epoll`：Linux 特有，事件驱动，性能好。

  ![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201121163408.jpg)

```c
while (true) {
    ssize_t n = read(fd, buf, size);
    if (n > 0) {
        process(buf, n);
    } else if (errno == EAGAIN) {
        // 没有数据，继续下一轮
        continue;
    }
}
```

## 信号驱动IO

**调用方式**：进程给 socket 注册一个信号处理函数，内核数据就绪时，发送 `SIGIO` 信号通知进程，再调用 `recvfrom()` 读取。

**特点**：比较少用，代码复杂。

**典型场景**：需要中断通知的特殊应用。



## 异步IO

**调用方式**：进程发起 `aio_read()` 后立即返回，内核在数据准备好并拷贝到用户缓冲区后，通知进程（回调/事件）。

**特点**：

- 真正的 **异步**，应用层不需要关心拷贝过程。
- 但在 Linux 中 AIO 支持有限，很多库用线程池模拟。

**典型场景**：Windows IOCP，Linux libaio。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201121163428.jpg)

# Java IO模型

## BIO

BIO是blocking IO，主要在`java.io`包中，采用流模型实现。

`java.io`包提供了我们最熟知的一些 IO 功能，比如 File 抽象、输入输出流等。交互方式是同步、阻塞的方式，也就是说，在读取输入流或者写入输出流时，在读、写动作完成之前，线程会一直阻塞在那里，它们之间的调用是可靠的线性顺序。

采用 BIO 的服务端，通常由一个独立的 Acceptor 线程负责监听客户端连接。服务端一般在`while(true)` 循环中调用 `accept()` 方法等待客户端的连接请求，一旦接收到一个连接请求，就可以建立 Socket，并基于这个 Socket 进行读写操作。此时，不能再接收其他客户端连接请求，只能等待当前连接的操作执行完成。

### BIO缺陷	

如果要让 **BIO 通信模型** 能够同时处理多个客户端请求，就必须使用多线程（主要原因是`socket.accept()`、`socket.read()`、`socket.write()` 涉及的三个主要函数都是同步阻塞的），但会造成不必要的线程开销。不过可以通过 **线程池机制** 改善，线程池还可以让线程的创建和回收成本相对较低。

**即使可以用线程池略微优化，但是会消耗宝贵的线程资源，并且在百万级并发场景下也撑不住**。如果并发访问量增加会导致线程数急剧膨胀可能会导致线程堆栈溢出、创建新线程失败等问题，最终导致进程宕机或者僵死，不能对外提供服务。

### BIO+多线程

```java
import java.io.*;
import java.net.*;

public class BioMultiThreadServer {
    public static void main(String[] args) throws Exception {
        ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("BIO 多线程服务器启动，端口 8080");

        while (true) {
            // 阻塞等待客户端连接
            Socket socket = serverSocket.accept();
            System.out.println("客户端连接：" + socket.getRemoteSocketAddress());

            // 每来一个连接，就开一个新线程去处理
            new Thread(new ClientHandler(socket)).start();
        }
    }

    static class ClientHandler implements Runnable {
        private Socket socket;

        public ClientHandler(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                 PrintWriter writer = new PrintWriter(socket.getOutputStream(), true)) {

                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("收到消息：" + line);
                    writer.println("Echo: " + line); // 回显
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

```

**多线程 BIO**：简单粗暴，但线程数不受控，适合小规模并发。



### BIO+线程池

```java
import java.io.*;
import java.net.*;
import java.util.concurrent.*;

public class BioThreadPoolServer {
    public static void main(String[] args) throws Exception {
        ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("BIO 线程池服务器启动，端口 8080");

        // 固定大小的线程池，避免无限创建线程
        ExecutorService threadPool = Executors.newFixedThreadPool(10);

        while (true) {
            Socket socket = serverSocket.accept();
            System.out.println("客户端连接：" + socket.getRemoteSocketAddress());

            // 把任务交给线程池执行
            threadPool.execute(new ClientHandler(socket));
        }
    }

    static class ClientHandler implements Runnable {
        private Socket socket;

        public ClientHandler(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                 PrintWriter writer = new PrintWriter(socket.getOutputStream(), true)) {

                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("收到消息：" + line);
                    writer.println("Echo: " + line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

```

**线程池 BIO**：线程数可控，性能更稳，但依旧受限于阻塞 IO 的效率瓶颈。

## NIO

NIO即Non-blocking IO，在jdk1.4中引入`java.nio`包中。

`java.nio` 包提供了 `Channel`、`Selector`、`Buffer` 等新的抽象，可以构建多路复用的、同步非阻塞 IO 程序，同时提供了更接近操作系统底层的高性能数据操作方式。

**Channel**：可读写的双向通道，如 `SocketChannel`、`ServerSocketChannel`、`FileChannel`。

**ByteBuffer**：数据容器，带 `position/limit/capacity`。操作前后要调用 `flip()`、`clear()`、`compact()` 等方法正确转换读写状态。

- 在 **Java NIO** 里，所有的 I/O（无论是 `SocketChannel` 还是 `FileChannel`）都必须通过 **Buffer** 作为中转站。
- **Channel 并不会直接返回原始字节数组**，而是把数据写入你提供的 `ByteBuffer`；同样，写数据时你要先把数据放进 `ByteBuffer`，再由 `Channel.write()` 把 buffer 里的数据送到内核/网络。

- 所以，**ByteBuffer 就是线程和 Channel 之间的数据暂存区**。

**Selector**：事件复用器，线程调用 `select()` 阻塞等待多个 Channel 的就绪（可读、可写、可接受连接等），返回一组 `SelectionKey`。

**非阻塞模式**：`channel.configureBlocking(false)` 后，`read()`/`write()` 等不会阻塞，若无法完成会返回特定值（读：0/-1，写：写入字节数可能为 0）。

**注册/兴趣集合**：通过 `channel.register(selector, SelectionKey.OP_READ|OP_WRITE, attachment)` 把 channel 注册到 selector，并可附带 `attachment`（比如缓冲区或连接上下文）。

### 使用ByteBuffer

NIO 与传统 I/O 不同，它是基于块（Block）的，它以块为基本单位处理数据。在 NIO 中，最为重要的两个组件是缓冲区（`Buffer`）和通道（`Channel`）。

`Buffer` 是一块连续的内存块，是 NIO 读写数据的缓冲。`Buffer` 可以将文件一次性读入内存再做后续处理，而传统的方式是边读文件边处理数据。`Channel` 表示缓冲数据的源头或者目的地，它用于读取缓冲或者写入数据，是访问缓冲的接口。



### 使用直接内存

NIO 还提供了一个可以直接访问物理内存的类 `DirectBuffer`。普通的 `Buffer` 分配的是 JVM 堆内存，而 `DirectBuffer` 是直接分配物理内存。

数据要输出到外部设备，必须先从用户空间复制到内核空间，再复制到输出设备，而 `DirectBuffer` 则是直接将步骤简化为从内核空间复制到外部设备，减少了数据拷贝。

这里拓展一点，由于 `DirectBuffer` 申请的是非 JVM 的物理内存，所以创建和销毁的代价很高。`DirectBuffer` 申请的内存并不是直接由 JVM 负责垃圾回收，但在 `DirectBuffer` 包装类被回收时，会通过 Java 引用机制来释放该内存块。

### 传统 IO

- 通过 `InputStream` / `OutputStream` 进行读写。
- **单向流**：只能读或只能写。
- 每次调用 `read()` 或 `write()` 都会触发 **用户空间 ↔ 内核空间的数据复制**。
- 是阻塞的：比如 `read()` 时，如果没有数据，线程就会挂起。

### NIO Channel

- `Channel` 是 **双向的**：同一个对象既能读也能写。
- 底层依赖操作系统的 **文件描述符（fd）**。
- 与 `ByteBuffer` 搭配使用，可以做到 **非阻塞 I/O**。
- 支持 **零拷贝** 技术，避免多次用户态/内核态数据复制，提高性能。

## AIO

AIO即NIO2，在JDK1.7中引入：

Java 7+ 引入 `AsynchronousSocketChannel`、`AsynchronousServerSocketChannel`，基于回调或 Future：

- `AsynchronousSocketChannel.read(ByteBuffer, attachment, CompletionHandler)`：IO 完成后回调 `CompletionHandler`。
- 异步模型让操作更贴近 OS 的真正异步（在 Windows 是 IOCP，在 Linux 早期可能用线程池做模拟，现代内核可借助 io_uring 更高效）。
- 与 Selector 模型相比：异步模型更易写出“事件回调”风格代码，但也要处理并发回调、资源竞争。

# 传统IO流

