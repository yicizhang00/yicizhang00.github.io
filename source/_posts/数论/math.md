---
title: math
date: 2025-08-18 19:16:53
tags:
categories: 数学
---
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
---

## GCD(最大公约数)
### 1.交换律
$$
\begin{equation}
gcd(a,b)=gcd(b,a)
\end{equation}
$$

**证明**
$gcd(\cdot)$定义为两个数的最大公约数，显然交换位置不能改变最大公约数的值。


### 2.结合律
$$
\begin{equation}
gcd(a,gcd(b,c)) = gcd(gcd(a,b),c)
\end{equation}
$$
**证明**  
设 \( d_1 = \gcd(a, \gcd(b, c)) \)，\( d_2 = \gcd(\gcd(a, b), c) \)：
1. \( d_1 \mid a \) 且 \( d_1 \mid \gcd(b, c) \Rightarrow d_1 \mid a,b,c \)
2. \( d_2 \mid \gcd(a, b) \) 且 \( d_2 \mid c \Rightarrow d_2 \mid a,b,c \)  
由最大性得 \( d_1 = d_2 \)。


## 3. 贝祖定理（线性组合性质）
\[ \gcd(a, b) = \min\{ ax + by > 0 \mid x,y \in \mathbb{Z} \} \]

**证明**  
设 \( S = \{ ax + by > 0 \mid x,y \in \mathbb{Z} \} \)，取最小元 \( d = ax_0 + by_0 \)：
1. **整除性**：  
   对任意 \( a = qd + r \)（\( 0 \leq r < d \)），若 \( r > 0 \) 则 \( r = a-qd = a - q(ax_0+by_0) = a(1-qx_0) + b(-qy_0)\), \( r \in S \)，与 \( d \) 最小矛盾，故 \( d \mid a \)。同理 \( d \mid b \)。
2. **最大性**：  
   若 \( c \mid a,b \)，则 \( c \mid ax_0 + by_0 = d \)，故 \( c \leq d \)。


## 4. GCD(最大公约数)-LCM(最小公倍数) 恒等式
\[ \gcd(a, b) \times \text{lcm}(a, b) = |ab| \]

**证明**  
设 \( d = \gcd(a, b) \)，分解 \( a = da' \)，\( b = db' \)（\( \gcd(a', b') = 1 \)）：
\[
\text{lcm}(a, b) = \text{lcm}(da', db') = da'b' \implies d \times da'b' = d^2 a' b' = (da') (db') = ab
\]

## 5.计算gcd
### 5.1 欧几里得算法
\[ \gcd(a, b) = \gcd(b, a \bmod b) \quad (b \neq 0) \]

**证明**  
设 \( a = qb + r \)（\( 0 \leq r < b \)）：
- 则 \( r = a\mod{b} \)
- 若 \( d \mid a \) 且 \( d \mid b \)，则\( r/d = a/d + kb/d\)， \( d \mid r = a - qb \)。
- 假设存在一个更大的\(d' > d\)，使得\(d' | b\) 且 \(d' | r\)，所以\(d' | a = qb + r\)，\( d' \) 是 \(a\)和\(b\)的公约数而\(d = gcd(a,b)\)产生矛盾，因此\(d\)是\(b\)和\(r\)的最大公约数。

- 递归
```java
long gcd(long a, long b){
    if(b == 0) return a;
    return gcd(b, a%b);
}

```

- 迭代
```java
long gcd(long a, long b) {
    while (b != 0) {
        long temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}
```



## 6. 乘法性质
\[ \gcd(ka, kb) = k \cdot \gcd(a, b) \quad (k > 0) \]

**证明**  
由 GCD 定义：
\[
\begin{align*}
\gcd(ka, kb) &= \max\{ d \mid d \text{ 整除 } ka \text{ 和 } kb \} \\
&= k \cdot \max\{ d/k \mid (d/k) \text{ 整除 } a \text{ 和 } b \} \\
&= k \cdot \gcd(a, b)
\end{align*}
\]

## 7. 同余不变性
若 \( a \equiv b \pmod{m} \)，则 \( \gcd(a, m) = \gcd(b, m) \)。

**证明**  
由 \( a = b + km \)，利用欧几里得算法：
\[ \gcd(a, m) = \gcd(b + km, m) = \gcd(b, m) \]

## 8. 质数性质
对质数 \( p \)：
\[
\gcd(p, a) = 
\begin{cases}
p & \text{若 } p \mid a, \\
1 & \text{若 } p \nmid a.
\end{cases}
\]

**证明**  
- 当 \( p \mid a \)：\( p \) 是 \( p \) 和 \( a \) 的最大公约数。
- 当 \( p \nmid a \)：\( p \) 的约数只有 \( 1 \) 和 \( p \)，故 \( \gcd(p, a) = 1 \)。

## 9. 扩展欧几里得算法
存在整数 \( x, y \) 使得：
\[ ax + by = \gcd(a, b) \]

**证明**  
通过欧几里得算法逆向递推：
1. 终止步：\( \gcd(d, 0) = d = d \cdot 1 + 0 \cdot 0 \)
2. 递推步：若 \( bx' + (a \bmod b)y' = \gcd(a, b) \)，则：
   \[
   \gcd(a, b) = bx' + (a - b\lfloor a/b \rfloor)y' = ay' + b(x' - \lfloor a/b \rfloor y')
   \]
   令 \( x = y' \)，\( y = x' - \lfloor a/b \rfloor y' \) 即得解。


## 10. 分配律（与 LCM 的关系）
\[
\begin{align*}
\gcd(a, \text{lcm}(b, c)) &= \text{lcm}(\gcd(a, b), \gcd(a, c)), \\
\text{lcm}(a, \gcd(b, c)) &= \gcd(\text{lcm}(a, b), \text{lcm}(a, c)).
\end{align*}
\]

**证明**（以第一式为例）  
对质因数分解中的每个指数取极值：
\[
\min(\alpha_p, \max(\beta_p, \gamma_p)) = \max(\min(\alpha_p, \beta_p), \min(\alpha_p, \gamma_p))
\]

## 11.多元素交换律
$$
gcd(a,b,c) = gcd(gcd(a,b),c) = gcd(gcd(b,a),c) = gcd(b,a,c)
$$
