---
title: Paxos
date: 2025-08-12 01:55:16
tags:
categories: 
  - 分布式
  - 理论基础
---

# Paxos协议

Paxos 是一种面向崩溃故障（Crash Fault）模型的分布式一致性协议，用于在存在节点失效、网络分区、消息延迟、消息重复以及消息乱序等故障条件下，使一组分布式进程就某个值达成一致。

Paxos不考虑拜占庭故障，即协议假设节点不会恶意篡改消息或伪造协议状态。

---

## 核心问题

Paxos协议针对分布式一致性问题的本质进行抽象，需满足以下三个关键约束：

1. **值约束**：系统仅能选择已被提议的值。
2. **唯一性约束**：系统必须且仅能就单一值达成共识。
3. **知识约束**：仅当值被选定后，进程才可获知该值已达成共识。

该协议通过构建容错机制，确保在部分节点故障或网络分区情况下，系统仍能收敛至唯一确定的状态。

---

## 角色定义

协议参与者分为三类角色，实际系统中节点可兼任多种角色：

1. **提议者（Proposer）**：负责发起提案（Proposal），包含唯一递增的提案编号与提议值。
2. **接受者（Acceptor）**：通过投票机制决定提案是否被接受，需满足法定多数（quorum）原则。
3. **学习者（Learner）**：被动接收已被选定的共识值，不参与决策过程。

系统拓扑示例：

```text
Node1
 ├─ Proposer
 ├─ Acceptor
 └─ Learner

Node2
 ├─ Acceptor
 └─ Learner

Node3
 ├─ Acceptor
 └─ Learner
```

---

## 基础概念

### 提案（Proposal）

提案由二元组构成：

```text
(proposal_number, value)
```

示例：

```text
(#1, 1)
(#2, 2)
(#100, 1)
```

其中：

- `proposal_number`：全局单调递增的唯一编号，用于解决冲突。
- `value`：待共识的决策值。

### 法定多数（Quorum）

设系统包含 $N$ 个 Acceptor，则 Quorum 定义为：

$$
\left\lfloor \frac{N}{2} \right\rfloor + 1
$$

例如：

| Acceptor数量 | Quorum |
|------------|---------|
| 3 | 2 |
| 5 | 3 |
| 7 | 4 |

Paxos安全性的数学基础在于：

> 任意两个 Quorum 必然存在非空交集。

即：

$$
Q_1 \cap Q_2 \neq \emptyset
$$

其中：

$$
|Q_1| > \frac{N}{2}
$$

且：

$$
|Q_2| > \frac{N}{2}
$$

该性质保证任何已经被多数派接受的提案信息，最终必然能够传播到后续成功提案中。

---

## 协议流程

Paxos采用两阶段共识协议（Two-Phase Consensus Protocol），通过消息交换达成共识：

### 阶段一：预备阶段（Prepare）

1. Proposer生成新的提案编号 $n$，向全体Acceptor发送 `Prepare(n)` 请求。
2. Acceptor收到请求后：
    - 若 $n > \max\{\text{承诺的编号}\}$ ，则承诺不再接受编号小于 $n$ 的提案，并返回已接受的最高编号提案 $(n', v)$（若无则返回空）。

### 阶段二：接受阶段（Accept）

1. Proposer收到Quorum的 `Promise(n)` 响应后：
    - 从收到的 `Promise` 中选择 accepted proposal number 最大的提案对应的值。
    - 若历史为空，则自由选择值 $v$。
2. Proposer向Acceptor发送 `Accept(n, v)` 请求。
3. Acceptor收到请求后：
    - 若未对更高编号提案做出承诺，则接受 $(n, v)$ 并返回 `Accepted(n, v)`。

**共识达成条件**：若Quorum接受 $(n, v)$，则称 $v$ 被**选定（Chosen）**。

---

## 核心机制解析

### 值选择原则

协议规定：Proposer必须选取收到的历史提案中**最大编号对应的值**。例如：

```text
V1 → (#1, 1)
V2 → (#5, 3)
V3 → (#2, 2)
```

应选择(#5, 3)，而非出现频率更高的值（如1）。此举确保：

- 新提案继承历史链中**最可能已被选定**的值，避免违背不可撤销性。

### Quorum必要性

若允许低于Quorum的响应即可进入Accept阶段（如5节点系统中仅2票通过），将导致：

```text
{V1, V2} 接受 (n1, 1)
{V4, V5} 接受 (n2, 2)   # 两集合无交集 → 历史断裂
```

最终可能同时选定 $1$ 和 $2$，违反一致性。Quorum交集特性保证了**任意两个选定值必然等价**，即：
**若 **$(n_1, v_1)$** 和 **$(n_2, v_2)$** 均被选定，则 **$v_1 = v_2$。

### 安全性不变量

Paxos的核心安全性保证为：

**不可撤销性（Irrevocability）**：一旦值 $v$ 被选定，则所有后续成功提案的 $v'$ 必然满足 $v' = v$。

证明基于以下事实：

- 新Proposer的Prepare请求必覆盖旧Quorum（由法定多数交集保证）。
- 新Proposer将继承历史最大编号提案的值，从而延续选定值。

---

## Paxos安全性证明

### P1

最初，Paxos要求：

> P1：Acceptor必须接受它收到的第一个提案。

原因很简单：

如果所有Acceptor都拒绝第一个提案，那么系统将永远无法取得进展。

例如：

```text
Proposer A
    ↓
Accept(#1,1)

V1 V2 V3
全部拒绝
```

### P2
为了保证一致性，Lamport进一步提出：

>P2：如果某个值v已经被选择，那么任何被选择的更高编号提案，其值也必须为v。

即：

如果：
```
(#1,1)
```
已经被Chosen。

那么未来：
```
(#2,?)
(#3,?)
(#100,?)
```
如果被Chosen。

其值必须仍然是：
```
1
```
不能变成：
```
2
```
否则会出现：
```
Chosen(1)
Chosen(2)
```
同时成立。

破坏一致性。

但是P2存在的问题是：
>Proposer无法知道某个提案是否已经被Chosen

因为：
```
消息可能延迟；
消息可能丢失；
网络可能分区。
```
因此：
`Chosen`这个条件对于Proposer来说不可观察。

### P2a
Acceptor 的局部状态不足以判断某个值是否已经被 `chosen`，因此Acceptor只能通过`accepted`仅仅知道自己接受的值，而不知道其他Acceptor接受的值，因此P2的条件被增强为：
>P2a：如果某个值v已经被选择，那么任何更高编号且被Acceptor接受的提案，其值也必须为v。

但是P2a仍然不够，
考虑如下场景：
```
V1 accepted (#1,1)
V2 accepted (#1,1)
V3 accepted (#1,1)
```
已经形成多数派。

因此：
```
Chosen(1)
```
成立。

随后：
```
Prepare(#2)
```
与：
```
V1
V2
V3
```
发生网络分区。

只能联系：
```
V4
V5
```
如果允许Proposer自由提出：
```
Accept(#2,2)
```
则：
```
V4 accepted (#2,2)
V5 accepted (#2,2)
```
可能出现新的值。

因此仅限制Acceptor是不够的。

还必须限制Proposer。

### P2b

为了保证安全性，Lamport进一步提出：

> P2b：如果某个值 $v$ 已经被选定，则任何更高编号的提案在被提出时，其值也必须为 $v$。

与 P2a 不同，P2b 的约束对象已经从 Acceptor 转移到了 Proposer。

P2b 实际上要求：

> 在提案产生阶段，就必须保证不会引入与历史选定值冲突的新 value。

因此，新的 Proposer 不能自由选择 value，而必须首先收集历史状态，并继承其中可能已经被选定的 value。

Paxos 的 Prepare/Promise 机制正是为了实现这一约束而设计。

### 如何实现P2b

核心思想：

> 新的Proposer必须继承历史。

假设：
```
V1 accepted (#1,1)
V2 accepted (#1,1)
V3 accepted (#1,1)
```
已经形成：
```
Chosen(1)
```
现在新的Proposer发起：
```
Prepare(#10)
```
收到：
```
V1 -> accepted (#1,1)
V2 -> accepted (#1,1)
V3 -> accepted (#1,1)
```
根据Paxos规则：
```
选择回复中
accepted proposal number最大的记录
```
即：
```
(#1,1)
```
对应：
```
value = 1
```
因此必须发送：
```
Accept(#10,1)
```
而不能发送：
```
Accept(#10,2)
```
如果收到：
```
V1 -> (#1,1)
V2 -> (#5,3)
V3 -> (#2,2)
```
则：
```
#5
```
最大。

因此：
```
Accept(#10,3)
```

如果只有5个节点，而新的Proposer和三个节点发生分区，这三个节点此前
```
V1 -> (#1,1)
V2 -> (#1,1)
V3 -> (#1,1)
```

那么这个Proposer没有收到多数派的Promise，则不能发起Proposal。

---

## 总结

Paxos通过以下四个关键机制保证一致性：

- Proposal Number 的全序关系；
- Quorum 的交集性质；
- Prepare/Promise 阶段对历史状态的收集；
- 最大 Accepted Proposal 的继承规则。

其核心安全性不变量可以概括为：

> 一旦某个 value 被 Chosen，则未来任何成功提案最终选择的 value 必然与之相同。

基于这一不变量，Paxos证明了在崩溃故障模型下，即使存在节点失效、网络分区以及消息延迟等问题，系统仍能够保证不会出现两个不同的 Chosen Value。

Paxos 奠定了现代分布式一致性理论的基础，并直接影响了 Multi-Paxos、Chubby、Spanner、Zab 以及 Raft 等后续协议的设计。

---

**参考资料**：

1. Lamport, L. (1998). *The Part-Time Parliament*.
2. Chubby Lock Service Design (Google).
3. *Paxos Made Simple*.

---

