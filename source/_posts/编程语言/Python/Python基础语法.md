---
title: Python基础语法
date: 2025-12-31 09:52:52
tags:
    - 编程语言
    - Python
categories: 
    - 编程语言
    - Python
---
# 1. 类型
## 1.1 基础类型 
Python中基础类型包含整数、浮点数、布尔值、字符串、元组。
```python
a = 10
b = 10000000000
c = 1.5
flag = True
s = "abc"
print(s)
```
Python中的整数不同于C/Java，Python的整数没有溢出，底层被视为动态长度的 C 语言结构体。
```python
# 合法
x = 10**100
print(x)
```
Python使用变量时无需声明类型，但其也是强类型语言，进行跨类型操作时，如果不显式转换，会提示TypeError。
```python
# TypeError
a = '1' + 2
```

## 1.2 列表
```python
# 初始化语法糖
nums = [1,2,3] 
# 列表推导式
nums = [i for i in range(10)]
nums = [0] * 10

# 取固定index方法的语法糖
nums[0]

# 取长度
len(nums)

# 列表末尾增加
nums.append(4)

# 列表按index删除
nums.pop(0)

# 列表按值删除
nums.remove(0)

# 判断元素是否存在
if n in nums:
    pass

# 
```

## 1.3 for循环
```python
# 在 0 到 n - 1遍历
for i in range(n):
    print(i)

# 取集合元素遍历
for n in nums:
    print(n)

# 取下标遍历
for i, n in enumerate(nums):
    print(i,num)

# 同时遍历两个集合
for a, b in zip(nums1, nums2):
    print(a ,b)

```

# 1.4 字符串
```python
# 初始化
s="abc"

# 取值
s[0]

# 取长度
len(s)

# 遍历
for c in s:

# 拼接字符串列表
s1 = []
s1.append("b")
s1.append("a")
s2",".join(s1)
print(s2)

# 元素是否存在
if 'a' in s:
```
# 1.5 字典
```python
# 初始化
map={}

# 赋值
map[1]=100

# 取值
map[1]

# 元素是否存在
1 in map

# 取值并默认赋值
c = s.setdefault(1,2)
```

# 1.6 集合set
```python
# 初始化
set=set()

# 增加元素
set.add(1)

# 元素是否存在
1 in set

# 移除元素
set.remove(1)
```

# 1.7 栈stack
```python
stack=[]

stack.append(1)

stack.pop()

stack[-1]
```

# 1.8 双向队列deque
```python
from collections import deque

q=deque()

q.append(1)

q.popleft()

q.appendleft(2)

q.pop()

print(q)
```

# 1.9 堆（优先队列）heap
默认小根堆
```python
import heapq

heap=[]

heapq.heappush(heap,3)

heapq.heappop(heap)
```

使用大根堆
```python
heapq.heappush(heap,-x)
```


# 2. 对象类型
## 2.1 不可变对象

## 2.2 可变对象