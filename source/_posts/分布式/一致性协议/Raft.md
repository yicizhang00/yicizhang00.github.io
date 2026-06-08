---
title: Raft
date: 2025-08-12 01:55:16
tags:
  - 分布式
  - 一致性协议
  - Raft
categories: 
  - 分布式
  - 一致性协议
---

# Raft

## 背景
Raft 是由 Diego Ongaro 和 John Ousterhout 于 2014 年提出的一致性协议，其目标是在保证与 Multi-Paxos 等价安全性的前提下，设计一个更容易理解、更容易实现的分布式一致性算法。

Raft 开篇便指出：

> Paxos 虽然具有严格的数学正确性，但由于其角色抽象复杂、状态转移隐晦、工程细节缺失，导致其难以教学、理解与工业实现。

因此，Raft 的核心设计目标并不仅仅是“提出一种新的共识协议”，而是：

> **构建一个“可理解性优先（Understandability First）”的一致性算法。**

Raft 本质上仍然属于：

- Crash Fault Tolerance（CFT）
- Leader-based Replication
- Majority Quorum Consensus

其容错模型与 Multi-Paxos 等价，即：

- 不考虑拜占庭恶意节点；
- 允许节点宕机、网络分区、消息延迟与丢失；
- 通过多数派（Quorum）保证一致性。

---

# Paxos的问题

## 1. Paxos 理解困难

经典 Paxos 中：

- 所有节点都可能成为 Proposer；
- 多个 Proposal 可并发竞争；
- Prepare / Accept 阶段交织；
- 协议核心依赖复杂的不变量（P2、P2a、P2b）。

因此：

- 协议流程难以直观理解；
- 难以形成稳定的系统执行模型；
- 对初学者极不友好。

---

## 2. Paxos 缺乏完整工程实现

Lamport 的经典论文主要关注：

- Safety（安全性）
- 数学证明

而并未详细描述：

- Leader 选举；
- 日志复制；
- 成员变更；
- Log Compaction；
- Snapshot；
- 实际工程中的恢复与优化。

尤其是：

> Multi-Paxos 虽然事实上已经接近现代共识协议，但论文并未完整形式化描述其工程结构。

导致：

- 不同实现之间差异巨大；
- 工程师往往需要自行补充协议细节。

---

# Raft 的核心思想

Raft 的核心设计原则是：

> Strong Leader + Decomposition

即：

1. 通过强 Leader 简化状态流向；
2. 将复杂问题拆分为多个相互独立的子问题。

Raft 将一致性协议拆分为四个部分：

1. Leader Election（领导者选举）
2. Log Replication（日志复制）
3. Safety（安全性保证）
4. Membership Change（成员变更）

相比 Paxos：

- Paxos 更像“数学最小化证明”；
- Raft 更像“工程化状态机”。

---

# 基础概念

## Server State

Raft 中每个节点任意时刻只会处于以下三种状态之一：

```text
Follower
Candidate
Leader
```

---

### Follower

Follower 是默认状态。

其特点：

- 不主动发起请求；
- 仅响应 Leader 或 Candidate；
- 接收日志复制；
- 接收投票请求。

若在 Election Timeout 时间内未收到 Leader 心跳，则转为 Candidate。

---

### Candidate

当 Follower 超时后：

```text
Follower -> Candidate
```

Candidate 会：

1. currentTerm++
2. 给自己投票
3. 发起 RequestVote RPC
4. 尝试成为 Leader

若获得多数票，则成为 Leader。

若收到合法 Leader 的 AppendEntries RPC，则退回 Follower。

---

### Leader

Leader 是整个系统唯一的写入口。

其职责：

- 接收客户端请求；
- 追加日志；
- 复制日志；
- 推进 commitIndex；
- 管理集群状态。

Raft 的日志流向始终为：

```text
Leader -> Followers
```

Follower 之间不会互相同步日志。

---

# Term（任期）

Raft 使用 term 将整个系统划分为：

```text
Term1
Term2
Term3
...
```

每个 term：

- 至多存在一个 Leader；
- 对应一次独立选举周期。

term 类似于：

- Paxos 中的 Proposal Number；
- 分布式系统中的逻辑时代编号。

所有 RPC 都携带 term：

```text
RequestVote(term)
AppendEntries(term)
```

若节点发现：

```text
remoteTerm > currentTerm
```

则：

```text
currentTerm = remoteTerm
```

并立即退回 Follower。

---

# Leader Election

## Election Timeout

Follower 会随机生成：

```text
election timeout
```

例如：

```text
150ms ~ 300ms
```

若在超时时间内：

- 未收到 AppendEntries；
- 未收到合法 Leader 心跳；

则认为 Leader 失效。

---

## 发起选举

Follower 超时后：

```text
currentTerm++
state = Candidate
voteFor = self
```

然后向所有节点发送：

```text
RequestVote RPC
```

---

## RequestVote RPC

包含：

```text
term
candidateId
lastLogIndex
lastLogTerm
```

其中：

- lastLogIndex：Candidate 最后一条日志索引；
- lastLogTerm：最后日志对应的 term。

---

## 投票规则

一个节点在同一 term：

```text
只能投票一次
```

并且：

> 只有 Candidate 的日志至少和自己一样新（up-to-date）时才会投票。

日志新旧比较规则：

1. lastLogTerm 更大者更新；
2. 若 term 相同，则 lastLogIndex 更大者更新。

---

## 多个 Candidate 同时出现

若多个节点同时 timeout：

```text
A -> Candidate
B -> Candidate
```

则可能出现：

```text
split vote
```

即：

```text
A获得2票
B获得2票
```

无人获得多数派。

Raft 通过：

```text
随机 Election Timeout
```

降低冲突概率。

最终：

总会有一个节点先发起选举并获得多数票。

---

# Log Replication

## 日志结构

Raft 日志由：

```text
(index, term, command)
```

组成。

例如：

```text
(10, 5, SET X=100)
```

表示：

- index = 10
- 由 term5 Leader 创建
- command = SET X=100

---

## AppendEntries RPC

Leader 使用：

```text
AppendEntries RPC
```

实现：

1. 心跳（Heartbeat）
2. 日志复制（Replication）

RPC 包含：

```text
term
leaderId
prevLogIndex
prevLogTerm
entries[]
leaderCommit
```

---

## prevLogIndex / prevLogTerm

Raft 不仅检查：

```text
index 是否存在
```

更检查：

```text
(prevLogIndex, prevLogTerm)
```

是否匹配。

因为：

```text
相同 index
可能对应不同历史
```

例如：

```text
Leader:
index4 -> term4

Follower:
index4 -> term2
```

虽然 index 相同。

但日志已发生分叉。

---

## 日志冲突修复

若：

```text
prevLogIndex
prevLogTerm
```

不匹配。

Follower 返回失败。

Leader：

```text
nextIndex--
```

不断回退。

直到找到共同日志点。

随后：

1. 删除 Follower 冲突后缀；
2. 强制覆盖为 Leader 日志。

本质上：

> Raft 日志同步就是寻找最近公共祖先（LCA）并覆盖分叉历史。

---

# Commit 机制

## 日志复制 ≠ Commit

Follower 收到日志后：

```text
仅 append
```

并不立即 apply。

真正 commit 的条件是：

> 日志已复制到多数派节点。

例如：

```text
A B C D E
```

Leader A 的日志已进入：

```text
A B C
```

则：

```text
3/5
```

达到 Quorum。

此时日志 committed。

---

## commitIndex

Leader 维护：

```text
commitIndex
```

表示：

```text
已提交日志位置
```

只有：

```text
index <= commitIndex
```

的日志才能 apply 到状态机。

---

## leaderCommit

Leader 后续 AppendEntries 会携带：

```text
leaderCommit
```

Follower 收到后：

```text
commitIndex = leaderCommit
```

然后 apply 日志。

---

# Safety

Raft 的核心目标：

> 永远不会出现两个不同值在同一 index 被 committed。

---

# Election Safety

每个 term：

```text
最多一个 Leader
```

因为：

- 每节点每 term 仅投票一次；
- Leader 必须获得多数票；
- 任意两个多数派必然相交。

---

# Log Matching Property

若：

```text
(index, term)
```

相同。

则：

```text
此前所有日志完全相同
```

这是：

```text
prevLogIndex + prevLogTerm
```

检查保证的。

---

# Leader Completeness

若某日志在 term T 已 committed。

则：

> 所有未来 term 的 Leader 必然包含该日志。

原因：

- committed log 必进入多数派；
- 新 Leader 必获得多数派投票；
- 多数派必有交集；
- 拥有 committed log 的节点只会投票给日志不落后的 Candidate。

因此：

```text
committed log 永不丢失
```

---

# State Machine Safety

Raft 保证：

> 不同节点不会在同一 index apply 不同 command。

即：

```text
applied logs 一定一致
```

---

# 未提交日志（Uncommitted Logs）

Raft 允许删除：

```text
未 commit 的日志
```

即使：

- 这些日志由旧 Leader 创建；
- 这些日志曾真实存在。

因为：

> “成为 Leader” ≠ “日志已 committed”。

只有：

```text
进入多数派
```

的日志才属于真正历史。

少数派日志可能被未来 Leader 覆盖。

---

# Membership Change

Raft 使用：

```text
Joint Consensus
```

实现成员变更。

其核心思想：

> 配置变更期间同时使用：
>
> old configuration
> +
> new configuration

并要求：

```text
双多数派
```

即：

- 同时获得旧配置多数；
- 同时获得新配置多数。

从而避免：

```text
两个配置分别选出不同 Leader
```

的问题。

---

# Raft 与 Paxos 对比

| 对比项 | Paxos | Raft |
|---|---|---|
| 核心思想 | 多 Proposer 竞争 | 强 Leader |
| 理解难度 | 高 | 较低 |
| 工程实现 | 不完整 | 完整 |
| 日志流向 | 分散 | Leader 单向复制 |
| Leader | 可弱化 | 强 Leader |
| Membership Change | 复杂 | Joint Consensus |
| 可读性 | 数学化 | 状态机化 |

---

# 总结

Raft 的本质是：

> 使用：
>
> 强 Leader
> +
> 多数派 Quorum
> +
> 单调 term
> +
> 日志匹配
>
> 来构建一个可理解、可工程实现的分布式一致性协议。

其核心安全性来自：

1. 多数派交集；
2. term 单调递增；
3. 日志新旧检查；
4. Leader Completeness；
5. Log Matching Property。

Raft 并不是“比 Paxos 更强”的协议。

实际上：

> Raft 与 Multi-Paxos 在理论能力上等价。

Raft 的真正贡献在于：

> 将复杂一致性协议工程化、模块化与可理解化。
