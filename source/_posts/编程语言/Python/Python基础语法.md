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

## 1.4 字符串
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
s2 = ",".join(s1)
print(s2)

# 元素是否存在
if 'a' in s:
```
## 1.5 字典
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

## 1.6 集合set
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

## 1.7 栈stack
```python
stack=[]

stack.append(1)

stack.pop()

stack[-1]
```

## 1.8 双向队列deque
```python
from collections import deque

q=deque()

q.append(1)

q.popleft()

q.appendleft(2)

q.pop()

print(q)
```

## 1.9 堆（优先队列）heap
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

## 1.10 类和函数
Python 使用 `def` 定义函数，使用 `class` 定义类。`self` 代表实例本身，必须显式写在参数列表中。
```python
# 函数定义
def add(a, b):
    return a + b

# 带默认参数的函数
def greet(name, msg="Hello"):
    return f"{msg}, {name}"

# 类定义
class Person:
    # 类属性（所有实例共享）
    species = "Human"

    # 构造方法
    def __init__(self, name, age):
        self.name = name  # 实例属性
        self.age = age

    # 实例方法
    def introduce(self):
        return f"I am {self.name}, {self.age} years old."

    # 字符串表示（面向开发者）
    def __repr__(self):
        return f"Person(name={self.name!r}, age={self.age!r})"

    # 字符串表示（面向用户）
    def __str__(self):
        return f"{self.name}, {self.age}"

    # 静态方法：不需要 self，与类逻辑相关但不操作实例
    @staticmethod
    def is_adult(age):
        return age >= 18

    # 类方法：第一个参数是类本身 cls
    @classmethod
    def from_birth_year(cls, name, birth_year):
        return cls(name, 2026 - birth_year)

# 继承
class Student(Person):
    def __init__(self, name, age, school):
        super().__init__(name, age)  # 调用父类构造
        self.school = school

    # 重写父类方法
    def introduce(self):
        return f"{super().introduce()} I study at {self.school}."

p = Person("Alice", 25)
print(p.introduce())          # I am Alice, 25 years old.
print(p)                      # Alice, 25（调用 __str__）
print(repr(p))                # Person(name='Alice', age=25)
print(Person.is_adult(20))    # True
```

## 1.11 二维数组
二维数组通常用嵌套列表表示。**注意初始化时的浅拷贝陷阱**。
```python
# 正确初始化 m 行 n 列的二维数组
m, n = 3, 4
matrix = [[0] * n for _ in range(m)]

# 错误写法 —— 每一行都是同一对象的引用！
# matrix = [[0] * n] * m   # matrix[0][0] = 1 会让所有行的第 0 列都变成 1

# 访问元素
matrix[0][1] = 5

# 遍历二维数组
for i in range(len(matrix)):
    for j in range(len(matrix[0])):
        print(matrix[i][j], end=" ")
    print()

# 使用 for 遍历
for row in matrix:
    for val in row:
        print(val, end=" ")
```

## 1.12 排序
`list.sort()` 原地排序，`sorted()` 返回新列表。使用 `key` 参数指定排序依据，`reverse=True` 降序。
```python
nums = [3, 1, 4, 1, 5, 9]

# 原地排序
nums.sort()
print(nums)  # [1, 1, 3, 4, 5, 9]

# 返回新列表
sorted_nums = sorted(nums, reverse=True)
print(sorted_nums)  # [9, 5, 4, 3, 1, 1]

# 按 key 排序
pairs = [(1, 3), (2, 1), (3, 2)]
pairs.sort(key=lambda x: x[1])  # 按第二个元素排序
print(pairs)  # [(2, 1), (3, 2), (1, 3)]

# 多级排序：先按第一个元素，再按第二个
pairs.sort(key=lambda x: (x[0], x[1]))

# 字符串按长度排序
words = ["apple", "kiwi", "banana", "pear"]
words.sort(key=len)
print(words)  # ['kiwi', 'pear', 'apple', 'banana']

# 自定义比较器（Python 3 使用 functools.cmp_to_key）
from functools import cmp_to_key

def compare(a, b):
    # 返回 -1 表示 a < b，返回 1 表示 a > b
    return (a > b) - (a < b)

nums.sort(key=cmp_to_key(compare))
```

## 1.13 Lambda
Lambda 是匿名函数，语法为 `lambda 参数: 表达式`。常用于 `map`、`filter`、`sorted` 等需要简短回调的场景。
```python
# 基本语法
add = lambda a, b: a + b
print(add(1, 2))  # 3

# 配合 map：对每个元素应用函数
nums = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, nums))
print(squared)  # [1, 4, 9, 16, 25]

# 配合 filter：筛选符合条件的元素
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4]

# 配合 sorted 自定义排序
pairs = [(1, 3), (2, 1), (3, 2)]
pairs.sort(key=lambda x: x[1])
```

## 1.14 切片 Slice
切片语法 `[start:stop:step]`，start 默认 0，stop 默认末尾，step 默认 1。切片返回**新对象**（浅拷贝）。
```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 基本切片 —— 左闭右开
print(nums[2:5])   # [2, 3, 4]

# 省略边界
print(nums[:5])    # [0, 1, 2, 3, 4]   —— 前 5 个
print(nums[5:])    # [5, 6, 7, 8, 9]   —— 从 index 5 到末尾
print(nums[:])     # 完整浅拷贝

# 步长
print(nums[::2])   # [0, 2, 4, 6, 8]   —— 每两个取一个
print(nums[1::2])  # [1, 3, 5, 7, 9]   —— 从 index 1 开始，每两个取一个

# 反向切片
print(nums[::-1])  # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] —— 反转列表
print(nums[::-2])  # [9, 7, 5, 3, 1]  —— 从右往左，每两个取一个

# 字符串同样支持切片
s = "Hello, World!"
print(s[::-1])     # "!dlroW ,olleH" —— 反转字符串

# 使用 slice 对象（可复用）
take_every_two = slice(None, None, 2)
print(nums[take_every_two])  # [0, 2, 4, 6, 8]
```

## 1.15 列表推导式
`[表达式 for 变量 in 可迭代对象 if 条件]`。比 for 循环更简洁高效。
```python
# 基础：生成 0~9 的平方
squares = [i ** 2 for i in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件过滤
evens = [i for i in range(20) if i % 2 == 0]
print(evens)    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# if-else 三元表达式（写在 for 前面）
labels = ["even" if x % 2 == 0 else "odd" for x in range(6)]
print(labels)   # ['even', 'odd', 'even', 'odd', 'even', 'odd']

# 嵌套循环（等价于双重 for 循环）
pairs = [(i, j) for i in range(3) for j in range(2)]
print(pairs)    # [(0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1)]

# 嵌套列表推导
matrix = [[i + j for j in range(3)] for i in range(3)]
print(matrix)   # [[0, 1, 2], [1, 2, 3], [2, 3, 4]]

# 展平二维列表
flat = [x for row in matrix for x in row]
print(flat)     # [0, 1, 2, 1, 2, 3, 2, 3, 4]

# 生成器表达式（用 () 而不是 []，惰性求值）
gen = (i ** 2 for i in range(10 ** 6))  # 不占内存
print(next(gen))  # 0
```

## 1.16 字典推导式
`{key: value for 变量 in 可迭代对象 if 条件}`。快速构建或转换字典。
```python
# 基础：生成数字 -> 平方的映射
square_map = {i: i ** 2 for i in range(6)}
print(square_map)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 带条件过滤
even_squares = {i: i ** 2 for i in range(10) if i % 2 == 0}
print(even_squares)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# key 和 value 互换
d = {"a": 1, "b": 2, "c": 3}
reversed_d = {v: k for k, v in d.items()}
print(reversed_d)  # {1: 'a', 2: 'b', 3: 'c'}

# 从两个列表构建字典
keys = ["name", "age", "city"]
values = ["Bob", 30, "NYC"]
d = {k: v for k, v in zip(keys, values)}
print(d)  # {'name': 'Bob', 'age': 30, 'city': 'NYC'}

# 统计字符频率
s = "hello world"
freq = {c: s.count(c) for c in set(s) if c != ' '}
print(freq)  # {'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}
```

## 1.17 元组
元组是不可变序列。创建后不能修改元素，但可以包含可变对象。
```python
# 创建元组
t = (1, 2, 3)
t = 1, 2, 3       # 括号可省略
t = tuple([1, 2, 3])  # 从可迭代对象转换

# 单元素元组 —— 必须加逗号
single = (1,)     # 正确
not_a_tuple = (1) # 错误！这是 int

# 空元组
empty = ()
empty = tuple()

# 取值、切片（和列表相同）
t = (1, 2, 3, 4, 5)
print(t[0])       # 1
print(t[1:3])     # (2, 3)

# 不可变性 —— 不能修改元素
# t[0] = 10       # TypeError

# 但元组内的可变对象可以修改
t = ([1, 2], 3)
t[0].append(3)
print(t)          # ([1, 2, 3], 3)

# namedtuple —— 有名字的元组
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
# 或 Point = namedtuple("Point", "x y")
p = Point(1, 2)
print(p.x, p.y)   # 1 2
print(p[0], p[1]) # 1 2（仍支持下标访问）
```

## 1.18 多变量交换
利用元组打包/解包机制，一行交换两个变量的值，无需临时变量。
```python
a, b = 1, 2
a, b = b, a
print(a, b)  # 2 1

# 原理：右边先打包成元组 (b, a)，然后解包赋值给左边
# a, b = b, a  →  a, b = (2, 1)  →  a=2, b=1

# 多变量同时交换
x, y, z = 1, 2, 3
x, y, z = z, y, x
print(x, y, z)  # 3 2 1
```

## 1.19 解包
将可迭代对象的元素分别赋值给多个变量。`*` 可以收集剩余元素。
```python
# 基础解包
a, b, c = [1, 2, 3]
print(a, b, c)  # 1 2 3

# 使用 * 收集剩余元素
first, *rest = [1, 2, 3, 4, 5]
print(first)    # 1
print(rest)     # [2, 3, 4, 5]

*beginning, last = [1, 2, 3, 4, 5]
print(last)     # 5
print(beginning) # [1, 2, 3, 4]

first, *middle, last = [1, 2, 3, 4, 5]
print(middle)   # [2, 3, 4]

# 用 _ 忽略不需要的值
_, _, third, *rest = [1, 2, 3, 4, 5]
print(third)    # 3

# 函数参数解包
def func(a, b, c):
    return a + b + c

args = [1, 2, 3]
print(func(*args))  # 6 —— * 解包列表/元组

kwargs = {"a": 1, "b": 2, "c": 3}
print(func(**kwargs))  # 6 —— ** 解包字典

# 函数定义中的 *args 和 **kwargs
def log(*args, **kwargs):
    print("args:", args)
    print("kwargs:", kwargs)

log(1, 2, name="alice", age=25)
# args: (1, 2)
# kwargs: {'name': 'alice', 'age': 25}
```

## 1.20 any/all
`any(iterable)` 任一元素为真则返回 True。`all(iterable)` 所有元素为真才返回 True。都支持短路求值。
```python
# any：任意为 True 则返回 True
print(any([False, False, True]))   # True
print(any([False, False, False]))  # False
print(any([]))                     # False —— 空迭代器

# all：全部为 True 才返回 True
print(all([True, True, False]))    # False
print(all([True, True, True]))     # True
print(all([]))                     # True —— 空迭代器（vacuously true）

# 实用场景：检查列表是否全部满足条件
nums = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nums))  # True —— 是否全为偶数

# 检查是否存在满足条件的元素
nums = [1, 3, 5, 7, 8]
print(any(n % 2 == 0 for n in nums))  # True —— 是否存在偶数

# 配合生成器表达式，短路求值（不会遍历全部）
# all 遇到第一个 False 就停止，any 遇到第一个 True 就停止
```

## 1.21 字符串高级操作
Python 字符串提供了丰富的内置方法，常用于文本处理和算法题中。
```python
s = "  Hello, World!  "

# 去空白
print(s.strip())    # "Hello, World!" —— 去掉两端空白
print(s.lstrip())   # 去掉左端空白
print(s.rstrip())   # 去掉右端空白

# 分割与拼接
s = "a,b,c,d"
parts = s.split(",")           # ['a', 'b', 'c', 'd']
print(",".join(parts))         # "a,b,c,d"

s = "one two   three"
print(s.split())               # ['one', 'two', 'three'] —— 默认按空白分割

# 查找
s = "Hello, World!"
print(s.find("World"))         # 7 —— 返回首次出现的索引，未找到返回 -1
print(s.index("World"))        # 7 —— 未找到抛出 ValueError
print(s.rfind("o"))            # 8 —— 从右查找
print(s.count("l"))            # 3 —— 统计出现次数
print(s.startswith("Hello"))   # True
print(s.endswith("!"))         # True

# 替换
s = "apple, apple, orange"
print(s.replace("apple", "banana"))       # "banana, banana, orange"
print(s.replace("apple", "banana", 1))    # "banana, apple, orange" —— 只替换一次

# 大小写转换
s = "Hello World"
print(s.lower())       # "hello world"
print(s.upper())       # "HELLO WORLD"
print(s.title())       # "Hello World" —— 每个单词首字母大写
print(s.swapcase())    # "hELLO wORLD"

# 判断字符类型
print("123".isdigit())     # True
print("abc".isalpha())     # True
print("abc123".isalnum())  # True
print("   ".isspace())     # True

# f-string 格式化（Python 3.6+）
name, age = "Alice", 25
print(f"My name is {name}, I am {age} years old.")
print(f"Next year I will be {age + 1}.")
print(f"PI is approximately {3.14159:.2f}")  # 保留两位小数
print(f"{255:#x}")  # 0xff —— 十六进制
print(f"{1000:,}")  # 1,000 —— 千分位

# str.format()
print("{} + {} = {}".format(1, 2, 3))         # "1 + 2 = 3"
print("{1} + {0} = {2}".format(1, 2, 3))      # "2 + 1 = 3" —— 按索引
print("{a} + {b} = {c}".format(a=1, b=2, c=3)) # "1 + 2 = 3" —— 按名称
```

## 1.22 Counter统计
`collections.Counter` 是 dict 的子类，用于统计可哈希对象的出现次数。
```python
from collections import Counter

# 初始化
cnt = Counter("abracadabra")
print(cnt)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})

cnt = Counter([1, 2, 1, 3, 2, 1])
print(cnt)  # Counter({1: 3, 2: 2, 3: 1})

cnt = Counter(a=3, b=1, c=2)
print(cnt)  # Counter({'a': 3, 'c': 2, 'b': 1})

# 获取最高的 k 个元素
print(cnt.most_common(2))  # [('a', 3), ('c', 2)]

# Counter 运算 —— 加减交并
a = Counter(a=3, b=1)
b = Counter(a=1, b=2, c=1)
print(a + b)      # Counter({'a': 4, 'b': 3, 'c': 1}) —— 加法
print(a - b)      # Counter({'a': 2})               —— 减法（忽略负数）
print(a & b)      # Counter({'a': 1, 'b': 1})       —— 交集（取 min）
print(a | b)      # Counter({'a': 3, 'b': 2, 'c': 1}) —— 并集（取 max）

# 更新计数
cnt.update("aaa")
print(cnt["a"])   # 6

# 转换为普通 dict
print(dict(cnt))  # {'a': 6, 'b': 1, 'c': 2}
```

## 1.23 defaultdict
`collections.defaultdict` 在访问不存在的 key 时自动生成默认值，避免 KeyError。
```python
from collections import defaultdict

# defaultdict(int) —— 默认值 0，适合计数
cnt = defaultdict(int)
words = ["apple", "banana", "apple", "cherry"]
for w in words:
    cnt[w] += 1         # 无需检查 key 是否存在
print(dict(cnt))        # {'apple': 2, 'banana': 1, 'cherry': 1}

# defaultdict(list) —— 默认值 []，适合分组
groups = defaultdict(list)
items = [("a", 1), ("b", 2), ("a", 3), ("b", 4), ("a", 5)]
for key, val in items:
    groups[key].append(val)
print(dict(groups))     # {'a': [1, 3, 5], 'b': [2, 4]}

# defaultdict(set) —— 默认值 set()，适合去重收集
seen = defaultdict(set)
pairs = [(1, "a"), (1, "b"), (1, "a"), (2, "c")]
for k, v in pairs:
    seen[k].add(v)
print(dict(seen))       # {1: {'a', 'b'}, 2: {'c'}}

# 自定义默认工厂函数
tree = defaultdict(lambda: None)
```

## 1.24 双端队列（进阶）
在 1.8 节基础上，deque 还支持限制长度和旋转操作。
```python
from collections import deque

# maxlen —— 固定长度队列（自动丢弃旧元素）
dq = deque(maxlen=3)
dq.append(1)
dq.append(2)
dq.append(3)
dq.append(4)      # 自动从左侧丢弃 1
print(dq)         # deque([2, 3, 4], maxlen=3)

# rotate —— 旋转队列
dq = deque([1, 2, 3, 4, 5])
dq.rotate(1)      # 右移 1 位
print(dq)         # deque([5, 1, 2, 3, 4])
dq.rotate(-2)     # 左移 2 位
print(dq)         # deque([2, 3, 4, 5, 1])

# extend / extendleft —— 批量添加
dq = deque([1, 2])
dq.extend([3, 4])
print(dq)         # deque([1, 2, 3, 4])
dq.extendleft([0, -1])   # 逐个左侧添加，[-1, 0, 1, 2, 3, 4]
print(dq)

# 随机访问（O(n)）
print(dq[0], dq[-1])

# count / clear / reverse
dq = deque([1, 2, 1, 3, 1])
print(dq.count(1))  # 3
```

## 1.25 链表定义
算法题中链表的常用定义和操作模板。
```python
# 单链表节点定义
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 构建链表 [1, 2, 3, 4, 5]
def build_list(values):
    dummy = ListNode()
    cur = dummy
    for v in values:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

head = build_list([1, 2, 3, 4, 5])

# 遍历链表
def traverse(head):
    cur = head
    while cur:
        print(cur.val, end=" -> ")
        cur = cur.next
    print("None")

# 反转链表（迭代）
def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev

# 反转链表（递归）
def reverse_list_recursive(head):
    if not head or not head.next:
        return head
    new_head = reverse_list_recursive(head.next)
    head.next.next = head
    head.next = None
    return new_head

# 快慢指针 —— 找中点
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# 快慢指针 —— 检测环
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

## 1.26 二叉树定义
算法题中二叉树的常用定义和遍历模板。
```python
# 二叉树节点定义
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 前序遍历：根 -> 左 -> 右（递归）
def preorder(root):
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

# 中序遍历：左 -> 根 -> 右（递归）
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# 后序遍历：左 -> 右 -> 根（递归）
def postorder(root):
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]

# 中序遍历（迭代 —— 使用栈）
def inorder_iter(root):
    res, stack = [], []
    cur = root
    while cur or stack:
        while cur:              # 一直往左走
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()       # 弹出并访问
        res.append(cur.val)
        cur = cur.right         # 转向右子树
    return res

# 层序遍历（BFS）
from collections import deque
def level_order(root):
    if not root:
        return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)
    return res
```

## 1.27 图结构
图通常用邻接表（dict + list）或邻接矩阵表示。
```python
from collections import deque, defaultdict

# 邻接表表示
graph = {
    0: [1, 2],
    1: [0, 2, 3],
    2: [0, 1],
    3: [1]
}

# 从边列表构建邻接表
edges = [(0, 1), (0, 2), (1, 2), (1, 3)]
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)  # 无向图需要双向

# DFS（递归 + visited）
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node, end=" ")
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# BFS（使用 deque）
def bfs(graph, start):
    visited = set([start])
    q = deque([start])
    while q:
        node = q.popleft()
        print(node, end=" ")
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                q.append(neighbor)

# 拓扑排序（Kahn 算法 —— BFS + 入度表）
def topological_sort(n, edges):
    # n 为节点数，edges 为有向边列表 [(u, v), ...] 表示 u -> v
    graph = defaultdict(list)
    indegree = [0] * n
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    q = deque([i for i in range(n) if indegree[i] == 0])
    res = []
    while q:
        u = q.popleft()
        res.append(u)
        for v in graph[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)

    return res if len(res) == n else []  # 空列表表示有环
```

## 1.28 位运算
Python 位运算符：`&`（与）、`|`（或）、`^`（异或）、`~`（取反）、`<<`（左移）、`>>`（右移）。
```python
a, b = 5, 3  # 5 = 0b101, 3 = 0b011

print(a & b)   # 1   (0b001) —— 与
print(a | b)   # 7   (0b111) —— 或
print(a ^ b)   # 6   (0b110) —— 异或（相同为 0，不同为 1）
print(~a)      # -6  —— 取反（补码表示）
print(a << 1)  # 10  (0b1010) —— 左移 1 位 = 乘以 2
print(a >> 1)  # 2   (0b10) —— 右移 1 位 = 整除 2

# 常见技巧
n = 42

# 判断奇偶
print(n & 1)           # 0 为偶数，1 为奇数

# 获取最低位的 1（lowbit）
print(n & -n)          # 2 —— 最低位的 1 及其右边所有 0

# 消去最低位的 1
print(n & (n - 1))     # 40 —— 将 n 的最低位的 1 变为 0

# 判断是否为 2 的幂
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

# 统计二进制中 1 的个数（Brian Kernighan 算法）
def count_ones(n):
    cnt = 0
    while n:
        n &= n - 1  # 每次消去最低位的 1
        cnt += 1
    return cnt

# 异或交换（不推荐 —— 仅作了解）
x, y = 1, 2
x ^= y
y ^= x
x ^= y
print(x, y)  # 2 1

# 遍历子集掩码
mask = 0b1101  # 13
sub = mask
while sub:
    print(bin(sub))
    sub = (sub - 1) & mask  # 下一个子集
```

## 1.29 math库
Python 的 `math` 模块提供了常用的数学函数和常量。
```python
import math

# 常量
print(math.pi)       # 3.141592653589793
print(math.e)        # 2.718281828459045
print(math.inf)      # inf —— 正无穷
print(-math.inf)     # -inf —— 负无穷
print(math.nan)      # nan —— 非数字

# 取整
print(math.ceil(3.2))    # 4 —— 向上取整
print(math.floor(3.8))   # 3 —— 向下取整
print(math.trunc(-3.8))  # -3 —— 截断小数部分

# 幂与根
print(math.pow(2, 10))   # 1024.0
print(math.sqrt(16))     # 4.0
print(math.isqrt(10))    # 3 —— 整数平方根（向下取整）

# 最大公约数 / 最小公倍数（Python 3.9+）
print(math.gcd(12, 18))  # 6
print(math.lcm(12, 18))  # 36

# 组合数 / 排列数（Python 3.8+）
print(math.comb(5, 2))   # 10 —— C(5, 2)
print(math.perm(5, 2))   # 20 —— P(5, 2)

# 阶乘
print(math.factorial(5)) # 120

# 对数
print(math.log(8, 2))    # 3.0 —— log2(8)
print(math.log2(8))      # 3.0
print(math.log10(100))   # 2.0

# 三角函数
print(math.sin(math.pi / 2))  # 1.0
print(math.cos(math.pi))      # -1.0

# 角度弧度转换
print(math.degrees(math.pi))  # 180.0
print(math.radians(180))      # 3.14159...

# 判断
print(math.isclose(0.1 + 0.2, 0.3))  # True —— 浮点数近似比较
print(math.isinf(math.inf))           # True
print(math.isnan(math.nan))           # True
```

## 1.30 输入输出
算法竞赛和脚本中常用的输入输出方式。
```python
import sys

### 普通输入输出
name = input("Enter your name: ")       # 阻塞等待一行输入
print("Hello,", name)                   # 自动换行
print("No", "newline", end="")          # 不换行

### 一行多个输入（空格分隔）
# 输入: 1 2 3
a, b, c = map(int, input().split())
# 或读取为列表
nums = list(map(int, input().split()))
print(nums)  # [1, 2, 3]

### 数组输入（多行）
# 输入: 第一行是 n，接下来 n 行每行一个数
n = int(input())
arr = [int(input()) for _ in range(n)]

# 输入: 第一行是 n，接下来一行是 n 个数
n = int(input())
arr = list(map(int, input().split()))

### 大量输入 —— 使用 sys.stdin 更快
# 一次性读取全部
data = sys.stdin.read().split()
# 或逐行读取
for line in sys.stdin:
    line = line.strip()
    if not line:
        break
    # 处理每行...

# sys.stdin.readline() —— 比 input() 快
import sys
n = int(sys.stdin.readline())
arr = list(map(int, sys.stdin.readline().split()))

# 输出数组（空格分隔）
print(*arr)

# 大量输出 —— 使用 sys.stdout.write 更快
sys.stdout.write(" ".join(map(str, arr)) + "\n")
```

## 1.31 深拷贝
`copy.copy` 做浅拷贝（只复制一层），`copy.deepcopy` 做深拷贝（递归复制所有层）。
```python
import copy

# 一维列表：浅拷贝和深拷贝效果相同（元素不可变时）
a = [1, 2, 3]
b = copy.copy(a)
c = copy.deepcopy(a)
b[0] = 99
print(a)  # [1, 2, 3] —— a 不受影响

# 嵌套列表：浅拷贝只复制外层，内层仍是引用
a = [[1, 2], [3, 4]]
b = copy.copy(a)
b[0][0] = 99
print(a)  # [[99, 2], [3, 4]] —— a 被修改了！

# 深拷贝：递归复制所有层
a = [[1, 2], [3, 4]]
c = copy.deepcopy(a)
c[0][0] = 99
print(a)  # [[1, 2], [3, 4]] —— a 不受影响

# 常见替代方案（一维列表不需要 copy 模块）
b = a[:]         # 浅拷贝
b = a.copy()     # 浅拷贝
b = list(a)      # 浅拷贝
```

## 1.32 常见坑
Python 中几个容易踩的陷阱。

### 列表乘法（浅拷贝问题）
```python
# 错误：每行都是同一个子列表的引用
grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]] —— 所有行都被改了

# 正确：用列表推导式
grid = [[0] * 3 for _ in range(3)]
grid[0][0] = 1
print(grid)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
```

### 默认参数（可变对象陷阱）
```python
# 错误：默认参数只在函数定义时求值一次
def append_to(element, lst=[]):
    lst.append(element)
    return lst

print(append_to(1))  # [1]
print(append_to(2))  # [1, 2] —— 预期是 [2]！

# 正确：使用 None 作为默认值
def append_to(element, lst=None):
    if lst is None:
        lst = []
    lst.append(element)
    return lst
```

### 列表内遍历删除
```python
# 错误：边遍历边删除会导致跳过元素
nums = [1, 2, 3, 4, 5]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)
print(nums)  # [1, 3, 5] —— 看起来对了，但列表稍长就会出 bug

# 正确：使用列表推导式创建新列表
nums = [1, 2, 3, 4, 5]
nums = [n for n in nums if n % 2 != 0]

# 或倒序遍历删除
nums = [1, 2, 3, 4, 5]
for i in range(len(nums) - 1, -1, -1):
    if nums[i] % 2 == 0:
        nums.pop(i)
```

# 2. 对象类型
## 2.1 不可变对象
不可变对象（int、float、str、tuple、frozenset、bool）创建后**值不能修改**。任何"修改"操作实际上是创建了新对象。
```python
# 不可变对象的"修改" = 创建新对象
a = 10
print(id(a))       # 例如 140736525977592
a += 1
print(id(a))       # id 变了！a 指向了新对象 11

s = "hello"
print(id(s))
s += " world"
print(id(s))       # id 变了！新字符串被创建

# == 比较值，is 比较对象身份
a = 256
b = 256
print(a == b)      # True —— 值相等
print(a is b)      # True —— 小整数被缓存，是同一对象

a = 257
b = 257
print(a == b)      # True
print(a is b)      # False —— 超出缓存范围，是不同的对象

# 字符串 intern 机制
s1 = "hello_world"
s2 = "hello_world"
print(s1 is s2)    # True —— 相同字面量字符串被 intern

# 元组的不可变性示例
t = (1, 2, [3, 4])
# t[0] = 10        # TypeError —— 不可变
t[2].append(5)      # 合法！元组内引用指向的可变对象可变
print(t)            # (1, 2, [3, 4, 5])

# += 对不可变对象的行为
a = 1
print(id(a))
a += 1             # 等价于 a = a + 1，创建新 int 对象
print(id(a))       # 不同
```

## 2.2 可变对象
可变对象（list、dict、set、bytearray）可以在原地修改值，`id()` 保持不变。
```python
# 可变对象的原地修改 —— id 不变
nums = [1, 2, 3]
print(id(nums))
nums.append(4)
nums[0] = 99
print(id(nums))    # 相同！原地修改

# += 对可变对象的行为
nums = [1, 2, 3]
print(id(nums))
nums += [4, 5]     # 等价于 nums.extend([4, 5])，在原地修改
print(id(nums))    # 相同！原地扩展

# Python 参数传递机制：传对象引用（pass by assignment）
def modify_list(lst):
    lst.append(4)             # 修改参数指向的可变对象 —— 外部受影响

def reassign_list(lst):
    lst = lst + [4]           # 重新赋值 —— 外部不受影响

def modify_int(n):
    n += 1                    # 重新赋值 —— 外部不受影响

a = [1, 2, 3]
modify_list(a)
print(a)                      # [1, 2, 3, 4] —— 被修改了

b = [1, 2, 3]
reassign_list(b)
print(b)                      # [1, 2, 3] —— 没变

c = 10
modify_int(c)
print(c)                      # 10 —— 没变

# 函数默认参数共享（极常见坑点）
def bad_append(item, target=[]):
    target.append(item)
    return target

print(bad_append(1))  # [1]
print(bad_append(2))  # [1, 2] —— 不是 [2]！因为 target 是同一个可变对象

# 可变对象作为集合元素/dict key 的问题
# s = {[1, 2], [3, 4]}    # TypeError —— list 不可哈希
s = {(1, 2), (3, 4)}       # OK —— tuple 可哈希
d = {(1, 2): "point"}      # OK
```