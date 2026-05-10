---
title: Tier
date: 2026-05-09 01:44:36
tags:
  - KV数据库
---
# Tier




# HotRing
## 背景
在秒杀、热搜等高并发的场景下，绝大多数访问量都集中于部分热点数据，传统的内存数据库索引采用哈希索引时，查找位于链表末端的热点数据需要进行多次内存跳转，会导致效率降低。

## 核心
HotRing将数据结构修改为有序冲突环，将热点数据移动到离访问入口最近的位置，从而大幅降低链表内部的跳转路径，为了适应高并发，HotRing运用了RCU和CAS机制，实现了无锁的数据结构。

## 论文《HotRing:A HotSpot-Aware in-Memory Key-Value Store》
