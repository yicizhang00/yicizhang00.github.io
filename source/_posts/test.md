---
title: 数据结构
date: 2025-08-12 01:55:16
tags:
categories: 
  - 数据结构 
---
# 基本数据结构
## 1.数组
特点

<div style="border: 2px solid #150404ff; border-radius: 10px; padding: 10px; background: #f8f9fa;">
☆如何创建一个动态扩容数组：
</div>


## 链表

## 栈

## 队列

## 哈希表


# 进阶数据结构

## 堆

## 优先队列

## TreeMap

## Deque 双端队列

## TreeSet

## 图

## 并查集DSU

# 高级数据结构

## 跳表

## 线段树

## 前缀树

## AVL

## 红黑树

## 布隆过滤器
布隆过滤器是一种空间效率极高的概率型数据结构，用于判断一个元素是否在集合中。它通过多个哈希函数将元素映射到位数组的不同位置，插入时将对应位设为1，查询时只要有一个位为0则一定不在集合中，否则可能在集合中（存在误判）。

**优点：**
- 占用空间小，插入和查询速度快。
- 适合大数据场景下的快速去重和存在性判断。

**缺点：**
- 存在一定的误判率（假阳性），无法删除元素（标准实现）。
- 不支持元素的遍历。

**应用场景：**
- 数据库缓存过滤（如Redis缓存穿透防护）
- 网络黑名单检测
- 大规模去重（如爬虫URL判重）

**时间复杂度：**
- 插入操作(Add): O(K)
- 查询操作(Check): O(K)
k是哈希函数的数量
<div style="border: 2px solid #150404ff; border-radius: 10px; padding: 10px; background: #f8f9fa;">
☆★布隆过滤器的原理是用 k 个哈希函数将元素映射到位数组的 k 个位置。插入时，需要对元素进行 k 次哈希并设置 k 个位；查询时，需要对元素进行 k 次哈希并检查 k 个位。因此，时间复杂度与哈希函数数量 k 成线性关系，通常 k 是常数，所以实际操作接近 O(1)。
</div>

### Java实现
```java
public class SimpleBloomFilter {
    private int size;
    private boolean[] bits;
    private int[] seeds = {7, 11, 13, 31, 37, 61};

    public SimpleBloomFilter(int capacity) {
        this.size = capacity;
        this.bits = new boolean[size];
    }

    private int hash(String value, int seed) {
        int result = 0;
        for (int i = 0; i < value.length(); i++) {
            result = seed * result + value.charAt(i);
        }
        return (size - 1) & result;
    }

    public void add(String value) {
        for (int seed : seeds) {
            bits[hash(value, seed)] = true;
        }
    }

    public boolean contains(String value) {
        for (int seed : seeds) {
            if (!bits[hash(value, seed)]) {
                return false;
            }
        }
        return true;
    }
}
```

### 第三方库
```java
BloomFilter<String> bloomFilter = BloomFilter.create(
    Funnels.stringFunnel(Charset.defaultCharset()), 
    1000, // 预期元素数量
    0.01  // 误报率
);
bloomFilter.put("item1");
System.out.println(bloomFilter.mightContain("item1")); // true
```

## 有序哈希表LinkedHashMap

## WeakHashMap

## EnumSet

## EnumMap

## 地址哈希表IdentityHashMap

## CopyOnWriteArrayList

## ConcurrentHashMap

## 时间轮Time Wheel

## 位集 BitSet

