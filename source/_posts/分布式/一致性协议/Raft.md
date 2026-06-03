---
title: Raft
date: 2025-08-12 01:55:16
tags:
categories: 
  - 分布式
  - 一致性协议
---

#  背景
Raft开篇就提出一个问题，Paxos的所有节点都能成为Proposer的算法理解和实现起来非常困难，那么能不能提出一个一个易于理解和实现的一致性算法，并且和Multi-Paxos是等价的。

## Paxos的问题
1. Paoxs理解困难
2. Paxos没有具体实现，并且Multi-Paxos的细节太少。



## Raft
分离了 
1. Leader Election
2. Log Replication
3. Safety
4. Membership Change
