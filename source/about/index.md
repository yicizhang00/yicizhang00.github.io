---
title: 关于我
layout: about
pretty_urls:
  trailing_index: false
  trailing_html: false
---

<div align="center">

# 张义辞 · Yici Zhang

<p align="center">
  <strong>System · Distributed Systems · AI Systems · Financial Backend</strong>
</p>

<p align="center" style="color: #666; max-width: 600px; margin: 0 auto; line-height: 1.6;">
现任金融交易所技术中台后端工程师。<br>
  拒绝浮于框架表面的 CRUD，热衷于从系统底层原理、分布式共识与时序状态机出发，探寻高并发与高可用系统的本质解法。
</p>

</div>

---

# 👋 个人简介

你好，我是张义辞（Yici Zhang）。

我是一个重度的**底层技术与分布式系统爱好者**。在工程实践中，我更倾向于：
> **从系统原理出发，理解技术设计背后的本质逻辑与数学对称美。**

目前我的研究与工作焦点主要收敛于以下三个核心领域：
* **分布式共识与强一致性存储**：深入推导 Paxos、Raft 及其成员变更理论（Joint Consensus），利用 TLA+ 进行形式化验证，关注 RocksDB、Redis 等 KV 引擎的底层存储优化（如 HotRing 拓扑、并发控制）。
* **金融级高并发后端架构**：专注债券市场（Bond Market）、多级发行募集说明书（Tranche Offering Memorandum）结构化解析、固定收益投资 ROI 逻辑，以及证券/债券发行上市的多级审核流与低延迟流水线改造。
* **AI 系统与工程落地**：探索多模态视觉语言模型（VLM）与大语言模型（LLM）在医疗、金融垂域的微调（Finetune）与高性能工程化部署。

---

# 🔬 深度研究与技术栈

### 💻 系统与分布式底层
* **共识算法**：熟练掌握 **Raft / Paxos / Multi-Paxos** 协议本质，理解单节点变更与联合共识（Joint Consensus）的边界条件与状态机实现。
* **存储引擎与并发**：深入理解 MySQL InnoDB 索引机制、MVCC 及锁流转；精通 Redis 高性能架构与其作为分布式全局锁（如 Seata 模式）的底座设计；研究 **RocksDB / LSM-Tree** 与高性能哈希（HotRing）的底层演进。
* **工程底蕴**：精通 Java 核心（JVM 内存模型、JUC 线程池、类加载机制），对 Spring Cloud / Nacos 插件扩展及底层网络通信（Netty/RPC）有深入源码级理解。

### 🤖 AI 与深度学习
* **工程框架**：PyTorch / Python / Hugging Face 生态。
* **模型技术**：Transformer 架构演进、LLM 词表扩充、高效微调（LoRA / QLoRA）、多模态视觉语言模型（VLM）交叉对齐。

---

# 💼 工作经历

## 中证股转科技有限公司（北京证券交易所技术中台）
**后端开发工程师 ｜ 2025.07 - 至今**

作为核心架构与开发人员，负责**北交所/全国股转公司**发行上市与债券审核系统的架构升级。
* **债券业务中台建设**：深入参与私募债券审核系统的核心逻辑重构，设计并优化多级申购、分期偿还（Tranche）发行文件的自动化解析流水线。
* **高并发流处理优化**：解决复杂审核流中的分布式锁竞争与长事务问题，基于 Redis 维护全局分布式会话与状态机幂等控制。

---

## 上交所技术有限责任公司
**后端开发工程师 ｜ 2022.07 - 2023.07**

参与**上海证券交易所**内部审核相关系统的分布式改造与数据合规迁移。
* **异构数据库迁移**：主导核心业务数据从 MySQL 向 PostgreSQL 的平滑迁移，重构深度分页与复杂 SQL 算子，使历史审核数据查询性能提升 **40%**。
* **金融级 DevOps 落地**：基于 Jenkins、Docker、Kubernetes 搭建多集群环境下的自动化部署与持续集成（CI/CD）流水线，实现交易前置审核系统的单元化隔离与快速回滚。

---

# 🎓 教育经历

## 中国人民大学 ｜ 大数据技术与工程（硕士）
<div class="note note-info">2023.09 - 2025.06</div>

* **研究方向**：医疗大模型（LLM Finetune）、多模态视觉语言模型（VLM）、眼科智能医疗 AI、高并发医患问答系统。
* **学术输出**：探索大模型在特定垂直领域的语义对齐与微调加速，研究高性能 AI 系统的吞吐优化。

## 哈尔滨工业大学 ｜ 计算机科学与技术（本科）
<div class="note note-success">2018.09 - 2022.06</div>

* **核心功底**：计算机系统（CSAPP）、编译原理、操作系统设计与实现、硬件模拟（Verilog）。
* **技术沉淀**：在校期间完成了完整的类 Unix 操作系统内核原型设计、定制编译器实现，建立起极其扎实的“软硬件协同”系统思维。

---

# 🧠 我的技术理念

<div class="note note-warning">

<div align="center">始终保持好奇并频繁思考</div>

</div>

---

# ✍️ 博客关于什么

这个博客（基于 Hexo 构建，采用轻量化 **PrismJS** 代码高亮与优雅的 **Pretty URLs** 无后缀路由）是我思维的延伸。我在这里记录：
* **分布式理论**：从 Paxos/Raft 论文到 TLA+ 形式化验证。
* **底层底层再底层**：JVM 源码、LSM-Tree 锁机制、高性能网络模型的拆解。
* **AI 落地思考**：模型微调的工程细节与 AI 系统架构。
* **金融技术思考**：宏观信用市场、债券业务逻辑在计算机系统中的具象化实现。

---

# 📫 保持联系

* **Email**：[19845178026@163.com](mailto:19845178026@163.com)
* **GitHub**：[@yicizhang00](https://github.com/yicizhang00)

---