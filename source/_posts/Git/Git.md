---
title: Git
date: 2026-01-06 11:25:06
tags:
categories:
---
# Git 使用简介

Git 是目前业界最主流的分布式版本控制系统（Distributed Version Control System, DVCS），广泛用于源代码管理。与传统的中心化版本控制系统（如 SVN、CVS）相比，Git 的最大特点是**分布式架构**，即每个开发者本地都拥有完整的代码仓库和版本历史，无须始终依赖中心服务器。

**分布式 VS 中心化：**
- **中心化（如 SVN）**：
  - 所有操作都依赖中央服务器，开发者提交和获取代码都要连接服务器。
  - 版本加锁机制明显，当某人编辑（加锁）时，其他人不能并行修改，大幅影响协作效率。
- **分布式（Git）**：
  - 每位开发者本地均有完整仓库，可以离线提交、回滚、查看历史。
  - 通过分支、合并机制，实现多人协同和最终主干一致性，重点解决分布式系统的“短暂不一致”和“最终一致性”问题（即大家可以并行开发，最终可将各自的工作合并至主干，实现一致）。

## Git 安装

- **Windows**：推荐用 [Git for Windows](https://gitforwindows.org/)，安装完成自动集成 Git Bash。
- **macOS**：可用 Homebrew，一行命令即可安装：  
  ```
  brew install git
  ```
- **Linux/Unix**：使用系统自带包管理器安装，例如 Ubuntu：
  ```
  sudo apt-get update
  sudo apt-get install git
  ```
- 查看本地 Git 版本：
  ```
  git --version
  ```

## Git 教学与资料推荐

- [官方文档 – Git SCM](https://git-scm.com/book/zh/v2)
- [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)
- [Pro Git 电子书（中文）](https://git-scm.com/book/zh/v2)
- [GitHub Learning Lab](https://lab.github.com/)

## Git 数据结构

Git 的核心是一种有向无环图（DAG, Directed Acyclic Graph）结构，用于记录项目文件的版本变更历史。每一个节点代表一次提交（commit），每条边指向该提交的父节点。由于版本历史只能向前推进，所以整个结构无法形成环。

### 核心名词解释

- **Commit（提交）**：  
  一个 commit 节点包含了本次提交的所有内容快照（Tree 对象）、作者信息、时间戳，以及指向上一个提交（父节点）的哈希值。一个提交可能有多个父节点（如 merge 提交）。
- **Tree（目录树）**：  
  每次提交保存的是完整的项目目录树（Tree），树下有 blob（文件内容对象）和子目录树，实现全量快照和高效去重。
- **Blob（文件对象）**：  
  记录单个文件的内容，通过哈希唯一标识，多个 commit/Trees 可以引用相同的 blob 节点。
- **Branch（分支）**：  
  本质是指向某个提交节点（commit）的可变指针。分支只是 `.git/refs/heads/[branch-name]` 下的一个普通文件，内容仅为当前分支最后一个提交的 40 位哈希值。每次提交时，当前分支指针会自动移动到最新提交。
- **HEAD**：  
  代表“当前工作指向”。HEAD 是一个特殊指针，通常指向当前分支（如 main），间接指向具体 commit。即：HEAD → main (branch) → a1b2c3 (commit)。  
  若用 detached HEAD 模式，则会直接指向某个 commit。
- **三大区域（工作区、暂存区、版本库）**：
  - **工作区（Working Directory）**：用户实际编辑、查看文件的区域，如 main.c、README.md等。
  - **暂存区（Stage/Index）**：介于工作区和本地仓库之间的缓存区域，实际是 `.git/index` 文件。`git add` 命令将文件变更放入暂存区，待提交的快照存于此。
  - **本地仓库（Repository）**：通过 `git commit` 命令把暂存区的内容正式存入仓库，成为一个新的 commit 节点，持久保存项目历史。

### 工作区与暂存区关系举例

- 修改 main.c → 仅在工作区
- git add main.c → 暂存区记录了 main.c 的此次变更快照
- git commit → 把暂存区快照变为新的提交，加入本地仓库，分支指针及 HEAD 自动前移

---

## 常用 Git 命令与解释

1. `git init`  
   初始化一个本地空仓库，创建 Git 的元数据（.git 目录），零节点起步。
2. `git clone [url]`  
   克隆（复制）整个远程仓库的所有历史、分支到本地，建立完整 DAG 结构。
3. `git add [file]`  
   将工作区中已修改/新增的文件快照加入暂存区（Index），准备下次提交。
4. `git rm [file]`  
   删除指定文件，同时从暂存区中移除该文件的快照，准备提交删除操作。
5. `git commit -m "msg"`  
   把暂存区所有文件快照打包生成一个新 commit 节点，并自动移动分支指针。
6. `git reset [--soft|--mixed|--hard] <commit>`  
   让分支（branch）指针回退/前进到指定 commit。
   - soft：仅移动分支指针，暂存区和工作区不变
   - mixed（默认）：移动指针并重置暂存区，工作区不变
   - hard：分支、暂存区和工作区均重置到指定状态
7. `git checkout <commit/branch>`  
   让 HEAD（当前操作指针）指向指定 commit 或分支，切换分支或回溯历史。  
   与 reset 区别：checkout 只是移动 HEAD，reset 会移动分支指针并更改历史。
8. `git switch <branch>`  
   Git 2.23+ 新增的切换分支命令，更安全易用，用于替代部分 checkout 场景。
9. `git push`  
   将本地分支更新推送到远程仓库。让远程分支指向本地分支当前 commit。
10. `git pull`  
    拉取远程分支，并与当前分支尝试合并（默认执行 fetch + merge）。即让本地分支跟上远程最新。
11. `git fetch`  
    从远程仓库拉取最新对象，但不自动与本地分支合并，适用于仅同步远程历史。
12. `git merge <branch>`  
    把指定分支的历史合并到当前分支。如果两个分支在合并路径上有冲突，需要先手动解决再 commit 合并。
13. `git rebase <branch>`  
    把当前分支历史“剪切”下来，重新基于目标分支的最新提交拼接，即将当前分支（HEAD 所在分支）的独有提交，"移植"到 <branch> 的顶端，实现“线性历史”；适合整理提交，避免多分支交错。
14. `git log`  
    查看所有提交历史，可加 oneline, graph 等参数优化可视化。
15. `git stash`  
    临时保存当前工作区/暂存区的所有修改，便于切换分支后再恢复，开发中常用。
16. `git diff`  
    对比工作区、暂存区、本地库各自文件的差异内容。
17. `git status`  
    显示当前分支下，工作区与暂存区的状态，提示新增、修改、已提交文件等。

### 典型冲突场景说明

- **合并（merge）冲突**：当不同分支对相同区域代码有更改，且 Git 无法自动解决时，会报冲突（conflict）。需要开发者手动修改冲突文件，再 add/commit 完成合并。
- **冲突解决流程**：  
  1. Git 提示冲突，查看并手动处理冲突文件
  2. `git add` 解决后的文件
  3. `git commit` 完成最终合并

---

## Git 使用技巧

- 善用分支（branch），多人协作开发/feature 隔离可大幅提升效率。
- 推送前多用 `git pull --rebase`，保持本地提交线性，减少 merge commit 污染主干。
- 利用 `git log --graph --oneline --decorate --all` 一眼看懂全分支结构。
- 使用 `.gitignore` 文件过滤不需要纳入版本控制的文件，如编译产物、环境配置等。
- 代码丢失或误删，可通过 `git reflog` 找回之前操作记录，救急常用。
- 远程协作时慎用 `git push --force`，避免覆盖别人历史，多与团队成员沟通。

## 在线实验结合实战横扫

- 推荐使用 [learninggitbranching](https://learngitbranching.js.org/?locale=zh_CN) 这个在线模拟器，可以可视化地练习分支、合并、rebase、reset 等多种 Git 操作。
- 利用该平台可以“横扫”各种典型 Git 场景，比如：
  - 新建 feature 分支/合并回主干
  - 体验 merge 与 rebase 的区别
  - 模拟冲突并手动解决
  - 玩转 reset/checkout/switch 等回溯和切换命令
- 建议先熟悉主线任务（如基础 commit/branch/merge），再挑战更高级的操作，例如变基和历史修剪。
- 配合实际代码仓库动手实践，理论+模拟器横扫完整流程，能极大提升 Git 操作理解与实战水平。