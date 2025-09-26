---
title: JavaIO模型
date: 2025-09-27 03:29:29
tags:
---

# Unix IO模型

Unix IO 模型有5种模型

## 同步阻塞IO

**调用方式**：`read()` 等用户发起系统调用会 **阻塞**当前线程，直到有数据到达并拷贝到用户缓冲区。

**特点**：简单易用，但一个线程只能处理一个连接。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201121163321.jpg)

## 同步非阻塞IO
