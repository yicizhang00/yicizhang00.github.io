---
title: Rust基础语法
date: 2026-03-26 00:00:00
tags:
categories: 
  - Rust
---

# Rust 基础语法

## 1. 变量和可变性

### 变量声明

Rust 中变量默认是**不可变的**。使用 `let` 声明变量，使用 `mut` 修饰符使其可变。

```rust
let x = 5;           // 不可变变量
let mut y = 5;       // 可变变量
y = 6;               // 可以重新赋值

let z: i32 = 10;     // 显式指定类型
```

### 常量

常量使用 `const` 声明，必须指定类型，且不能使用 `mut`。

```rust
const MAX_POINTS: u32 = 100_000;
```

### 变量遮蔽（Shadowing）

可以用同名变量遮蔽前一个变量，这与 `mut` 修饰不同。

```rust
let x = 5;
let x = x + 1;       // x 现在是 6
let x = x * 2;       // x 现在是 12

let spaces = "   ";
let spaces = spaces.len();  // 类型可以改变
```

## 2. 数据类型

### 标量类型

#### 整数类型

| 长度    | 有符号 | 无符号 |
| :------ | :----- | :----- |
| 8-bit   | i8     | u8     |
| 16-bit  | i16    | u16    |
| 32-bit  | i32    | u32    |
| 64-bit  | i64    | u64    |
| 128-bit | i128   | u128   |
| arch    | isize  | usize  |

```rust
let x: i32 = 98_222;        // 十进制
let x: i32 = 0xff;          // 十六进制
let x: i32 = 0o77;          // 八进制
let x: i32 = 0b1111_0000;   // 二进制
let x: u8 = b'A';           // 字节
```

#### 浮点类型

```rust
let x = 2.0;        // f64（默认）
let y: f32 = 3.0;   // f32
```

#### 布尔类型

```rust
let t = true;
let f: bool = false;
```

#### 字符类型

```rust
let c = 'z';
let z: char = 'ℤ';
let heart_eyed_cat = '😻';
```

### 复合类型

#### 元组（Tuple）

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;        // 解构
let first = tup.0;          // 访问第一个元素
```

#### 数组（Array）

```rust
let a = [1, 2, 3, 4, 5];
let a: [i32; 5] = [1, 2, 3, 4, 5];  // 显式声明类型和长度
let a = [3; 5];             // [3, 3, 3, 3, 3]
let first = a[0];           // 访问元素
```

## 3. 函数

### 函数声明

```rust
fn add_one(x: i32) -> i32 {
    x + 1
}

fn print_number(x: i32) {
    println!("The number is: {}", x);
}

fn main() {
    let x = 5;
    let y = add_one(x);
    println!("The value of y is: {}", y);  // 输出 6
}
```

### 语句与表达式

**语句**：执行操作但不返回值，以分号结尾。
**表达式**：计算并返回结果，不以分号结尾。

```rust
fn example() {
    let x = 5 + 6;              // 表达式返回 11
    let y = {
        let x = 3;
        x + 1                   // 无分号，表达式
    };
    println!("{}", y);          // 输出 4
}
```

## 4. 所有权系统（Ownership）

所有权是 Rust 最独特的特性，它在编译时保证内存安全。

### 所有权规则

1. Rust 中每个值都有一个所有权者。
2. 一个值在同一时刻只能有一个所有权者。
3. 当所有权者离开作用域时，值被释放。

```rust
let s1 = String::from("hello");
let s2 = s1;            // 所有权转移，s1 不再有效

println!("{}", s1);     // 错误！s1 的所有权已转移给 s2
println!("{}", s2);     // 正确
```

### 克隆（Clone）

```rust
let s1 = String::from("hello");
let s2 = s1.clone();    // 深拷贝
println!("s1 = {}, s2 = {}", s1, s2);  // 都输出
```

## 5. 借用（References）

使用引用 `&` 借用值，而非转移所有权。

### 不可变借用

```rust
let s1 = String::from("hello");
let len = calculate_length(&s1);
println!("The length of '{}' is {}.", s1, len);  // s1 仍有效

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

### 可变借用

```rust
let mut s = String::from("hello");
change(&mut s);

fn change(s: &mut String) {
    s.push_str(" world");
}
```

### 借用规则

- 在任何时候，你要么拥有一个可变引用，要么拥有任意数量的不可变引用。
- 引用必须总是有效的。

## 6. 字符串

### String vs &str

```rust
let s1 = String::from("hello");         // 可变、拥有所有权
let s2: &str = "hello";                 // 字符串字面量
let s3: &str = &s1;                     // 借用 String 作为 &str
```

### 字符串操作

```rust
let mut s = String::from("Hello");
s.push_str(" World");
s.push('!');

for c in s.chars() {
    println!("{}", c);
}
```

## 7. 控制流

### if 表达式

```rust
let x = 5;
if x > 0 {
    println!("x is positive");
} else if x < 0 {
    println!("x is negative");
} else {
    println!("x is zero");
}

let number = if condition { 5 } else { 6 };
```

### 循环

#### loop 无限循环

```rust
let mut count = 0;
loop {
    count += 1;
    if count == 3 {
        break;
    }
    println!("{}", count);
}

let result = loop {
    count += 1;
    if count == 10 {
        break count * 2;  // 返回循环值
    }
};
```

#### while 条件循环

```rust
let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}
```

#### for 遍历

```rust
let a = [1, 2, 3, 4, 5];
for element in a.iter() {
    println!("the value is: {}", element);
}

for number in (1..4).rev() {
    println!("{}!", number);
}
```

## 8. 模式匹配

### match 表达式

```rust
enum Color {
    Red,
    Green,
    Blue,
}

let color = Color::Red;
match color {
    Color::Red => println!("Red"),
    Color::Green => println!("Green"),
    Color::Blue => println!("Blue"),
}
```

### 绑定值的模式

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

let msg = Message::ChangeColor(160, 255, 0);
match msg {
    Message::Quit => println!("Quit"),
    Message::Move { x, y } => println!("Move to {}, {}", x, y),
    Message::Write(text) => println!("Text: {}", text),
    Message::ChangeColor(r, g, b) => println!("RGB: {}, {}, {}", r, g, b),
}
```

## 9. 枚举（Enum）

```rust
enum IpAddrKind {
    V4,
    V6,
}

enum IpAddr {
    V4(String),
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));
```

## 10. 结构体（Struct）

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

let user1 = User {
    email: String::from("user@example.com"),
    username: String::from("user123"),
    sign_in_count: 1,
    active: true,
};

let user2 = User {
    email: String::from("user2@example.com"),
    ..user1
};
```

### 元组结构体

```rust
struct Color(i32, i32, i32);
let black = Color(0, 0, 0);
```

## 11. impl 块与方法

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

let rect = Rectangle { width: 30, height: 50 };
println!("Area: {}", rect.area());
```

## 12. 错误处理

### panic! 宏

```rust
panic!("crash and burn");  // 程序立即崩溃
```

### Result 类型

```rust
use std::fs::File;

let f: Result<File, std::io::Error> = File::open("hello.txt");
match f {
    Ok(file) => println!("File opened successfully"),
    Err(error) => println!("Error: {:?}", error),
}
```

### unwrap 和 expect

```rust
let f = File::open("hello.txt").unwrap();  // 失败时 panic
let f = File::open("hello.txt").expect("Failed to open file");
```

## 13. 泛型

```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}

struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
```

## 14. Trait（特征）

```rust
trait Drawable {
    fn draw(&self);
}

struct Circle {
    radius: i32,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing circle with radius {}", self.radius);
    }
}

let circle = Circle { radius: 5 };
circle.draw();
```

## 15. 生命周期

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

let s1 = String::from("hello");
let s2 = String::from("world");
let result = longest(&s1, &s2);
println!("The longest string is {}", result);
```
