---
title: LRU的Java简易实现
date: 2025-08-12 01:55:16
tags:
categories: 
  - Java
  - LRU
---
# 要点
1. 使用双向链表
2. 使用头尾哨兵节点简化边界条件
   
```Java
import java.util.HashMap;
import java.util.Map;

public class LRUCache {
    class Node {
        int key;
        int val;
        Node prev;
        Node next;

        public Node(int key, int val) {
            this.key = key;
            this.val = val;
        }

        public Node() {

        }
    }

    private Node head, tail;
    private int size;
    private int capacity;
    private Map<Integer, Node> cache = new HashMap<>();

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        head = new Node();
        tail = new Node();
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) {
            return -1;
        }
        moveToHead(node);
        return node.val;
    }

    public void put(int key, int val) {
        Node node = cache.get(key);
        if (node == null) {
            Node newNode = new Node(key, val);
            cache.put(key, newNode);
            addToHead(newNode);
            size++;
            if (size > capacity) {
                Node res = removeTail();
                cache.remove(res.key);
                size--;
            }
        } else {
            node.val = val;
            moveToHead(node);
        }
    }

    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private Node removeTail() {
        Node tmp = tail.prev;
        removeNode(tmp);
        return tmp;
    }
}

```