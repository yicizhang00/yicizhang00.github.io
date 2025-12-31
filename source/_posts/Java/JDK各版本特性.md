---
title: JDK各个版本特性总结
date: 2025-08-12 01:55:16
tags:
categories: 
  - java
---


<!-- TOC -->
- [JDK8](#jdk8)
  - [接口默认方法（非抽象方法）](#接口默认方法非抽象方法)
  - [Lambda表达式](#lambda表达式)
  - [StreamAPI](#streamapi)
  - [默认方法](#默认方法)
  - [Optional类](#optional类)
- [JDK9](#jdk9)
  - [模块化系统（Project Jigsaw）](#模块化系统project-jigsaw)
  - [G1 成为默认垃圾回收器（GC）](#g1-成为默认垃圾回收器gc)
  - [JShell（交互式 REPL 工具）](#jshell交互式-repl-工具)
  - [其他新特性](#其他新特性)
- [JDK10](#jdk10)
  - [局部变量类型推断（var）](#局部变量类型推断var)
- [JDK11](#jdk11)
  - [新特性介绍](#新特性介绍)
  - [局部类型推断Var](#局部类型推断var)
  - [字符串API增强](#字符串api增强)
  - [标准化HttpClient](#标准化httpclient)
  - [模块化](#模块化)
- [JDK14](#jdk14)
  - [Switch表达式](#switch表达式)
- [JDK15](#jdk15)
  - [文本块](#文本块)
- [JDK16](#jdk16)
  - [record类](#record类)
  - [Instance of 匹配](#instance-of-匹配)
- [JDK17](#jdk17)
  - [Spring和SpringBoot](#spring和springboot)
  - [增强的伪随机数生成器](#增强的伪随机数生成器)
  - [Sealed Class 密封类](#sealed-class-密封类)
- [JDK21](#jdk21)
  - [Record Patterns](#record-patterns)
  - [Switch类型匹配](#switch类型匹配)
  - [虚拟线程](#虚拟线程)
  - [分代ZGC](#分代zgc)
- [JDK22](#jdk22)
  - [未命名变量](#未命名变量)
<!-- /TOC -->

# JDK8
## 接口默认方法（非抽象方法）
JDK8允许在接口中定义默认方法（使用default关键字），这样接口可以包含实现代码，但实现类可以选择是否覆盖它。

**示例：**
```java
interface MyInterface {
    void abstractMethod();

    default void defaultMethod() {
        System.out.println("这是接口的默认方法实现");
    }
}

class MyClass implements MyInterface {
    @Override
    public void abstractMethod() {
        System.out.println("实现抽象方法");
    }

    // 可以选择覆盖默认方法，也可以不覆盖，直接使用接口提供的实现
    // @Override
    // public void defaultMethod() {
    //     System.out.println("自定义实现");
    // }
}

public class Demo {
    public static void main(String[] args) {
        MyClass obj = new MyClass();
        obj.abstractMethod(); // 输出: 实现抽象方法
        obj.defaultMethod();  // 输出: 这是接口的默认方法实现
    }
}
```
**意义：**
- 接口添加新方法时不会破坏已有实现类（向后兼容）
- 便于接口功能进化

## Lambda表达式

## StreamAPI

## 默认方法

## Optional类
# JDK9
## 模块化系统（Project Jigsaw）

JDK9 最大的变化之一是引入了模块系统——Project Jigsaw，这意味着 Java 平台本身，以及开发者自定义的代码，都可以被组织到模块中。

### 主要变化
- 原有的大型 JDK 被拆分为 90 多个模块
- 开发者可以根据应用需求只引入需要的模块，减小体积
- 模块化提高了安全性，易于维护

### 关键语法
- 新增 `module-info.java` 文件来定义模块

**示例：**
```java
// module-info.java
module com.example.myapp {
    requires java.sql;
    exports com.example.myapp.api;
}
```
- `requires` 指定依赖的模块
- `exports` 导出本模块中的包

### 启动模块化应用
```sh
java --module-path mods -m com.example.myapp/com.example.myapp.Main
```
## G1 成为默认垃圾回收器（GC）

JDK9 开始，G1（Garbage-First）垃圾回收器正式取代 Parallel GC，成为 Java 虚拟机的默认垃圾回收器。G1 优先满足低延迟、高吞吐的服务端场景，适合大内存、多核处理器的现代应用。

### 主要特性
- 支持多核并发、低暂停 GC
- 可以通过 `-XX:MaxGCPauseMillis` 控制最大暂停时间
- 按“分区”内存区域，灵活高效地并行/并发收集
- 不再需要手动指定 `-XX:+UseG1GC`，移除后默认采用 G1

### 代码体验
一般不需要更改代码，仅 VM 参数会切换。如需观察，启动参数可加：

```
-XX:+PrintGCDetails -XX:+PrintGCDateStamps
```

### 手动指定使用其它 GC
如需切换回旧的 Parallel GC，可加参数：

```
-XX:+UseParallelGC
```

**小结**：  
G1 适用于绝大多数服务端应用，并且易于配置、更加智能，自动平衡吞吐与延迟。

更多参考：  
- [Java 官方文档](https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector.htm)
- [JEP 248: Make G1 the Default Garbage Collector](https://openjdk.org/jeps/248)


## JShell（交互式 REPL 工具）

JDK9 新增了 Java 的 REPL 工具——JShell，可以直接输入 Java 代码片段并立刻执行，便于学习、测试和调试。

**常用命令：**
- 输入表达式/语句后直接回车即可查看运行结果。
- `/exit` 退出 JShell

**示例：**
```sh
jshell
jshell> int x = 10;
jshell> System.out.println(x * 2);
20
```

-------

## 其他新特性

### 私有接口方法
接口中允许添加 private 方法，用于接口内部的代码复用。例如：
```java
interface MyInterface {
    default void foo() {
        bar();
    }
    private void bar() {
        System.out.println("私有接口方法");
    }
}
```

### 集合工厂方法
可以用更简洁的语法创建不可变集合：
```java
List<String> list = List.of("a", "b", "c");
Set<Integer> set = Set.of(1, 2, 3);
Map<String, Integer> map = Map.of("a", 1, "b", 2);
```

### try-with-resources 改进
资源变量可以在 try 外部声明并在 try 内部使用：
```java
Resource resource = new Resource();
try (resource) {
    // 使用 resource
}
```

### Stream API 增强

- 新增 `takeWhile`, `dropWhile`, `ofNullable` 方法提升流处理能力

**示例：**
```java
List<Integer> list = List.of(1, 2, 3, 4, 5, 0, 6, 7);
list.stream().takeWhile(n -> n > 0).forEach(System.out::println); // 输出: 1 2 3 4 5
```

-------

# JDK11

### 新特性介绍

#### 1. 新的字符串方法

JDK11 为 `String` 类增加了大量实用方法：

- `isBlank()`：判断字符串是否为空白。
- `lines()`：按行拆分字符串为流。
- `strip()`, `stripLeading()`, `stripTrailing()`：去除空白符（更全面支持 Unicode 空白，不同于 `trim()`）。
- `repeat(int count)`：重复字符串。

**示例：**
```java
String str = "  Hello Java  \nwelcome  ";
System.out.println(str.isBlank()); // false
str.lines().forEach(System.out::println); // 按行输出
System.out.println(str.strip()); // 去除所有前后空白
System.out.println("abc".repeat(3)); // abcabcabc
```

#### 2. 本地变量类型推断支持 lambda 参数（升级）

允许在 lambda 表达式参数类型前使用 `var` 关键字，可以增强代码一致性和可读性：

```java
BiFunction<Integer, Integer, Integer> add = (var a, var b) -> a + b;
```

#### 3. 文件 I/O 增强

##### a) `Files.readString` 和 `Files.writeString`  
简化字符串与文件之间的读写操作：

```java
Path path = Paths.get("demo.txt");
Files.writeString(path, "Hello JDK11!");
String content = Files.readString(path);
System.out.println(content);
```

##### b) `InputStream.transferTo(OutputStream)`
简化流传输：

```java
try (InputStream in = Files.newInputStream(Paths.get("input.txt"));
     OutputStream out = Files.newOutputStream(Paths.get("output.txt"))) {
    in.transferTo(out); // 直接将输入流内容写入输出流
}
```

#### 4. 集合工厂方法增强

`var` 结合集合工厂方法，使集合构建更加简洁：

```java
var immutableList = List.of("a", "b", "c");
```

#### 5. 新的 Http Client API 标准

JDK11 标准引入了异步/同步型 Http Client：

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com"))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

#### 6. 垃圾回收器变化

- 默认移除了 CMS，支持 ZGC(实验性)。
- `-XX:+UseZGC` 启动参数可使用低延迟垃圾回收器。

#### 7. 新的类库和API移除

- 移除了 Java EE 和 CORBA 模块。

#### 8. 其他

- 支持运行单文件源代码，如 `java Hello.java` 可直接运行。
- Flight Recorder 商业特性开源。



## 局部类型推断Var

### 1.初始化定义局部变量

```java
var list = new ArrayList<String>();    // infers ArrayList<String>
var stream = list.stream();            // infers Stream<String>
var path = Paths.get(fileName);        // infers Path
var bytes = Files.readAllBytes(path);  // infers bytes[]
```

### 2.增强for循环

```java
List<String> myList = Arrays.asList("a", "b", "c");
for (var element : myList) {...}  // infers String
```

### 3.传统for循环的index定义

```java
for (var counter = 0; counter < 10; counter++)  {...}   // infers int
```

### 4.try包裹的变量

```
try (var input = 
     new FileInputStream("validation.txt")) {...}   // infers FileInputStream

```

### 5.lambda中隐含的var推断

```java
BiFunction<Integer, Integer, Integer> sumFunction = (Integer a, Integer b) -> a + b;
```

可以不用明确表达出`Integer`，等价于：

```java
BiFunction<Integer, Integer, Integer> sumFunction = (var a, var b) -> a + b;
```

其中`var`可以省略，等价于：

```java
BiFunction<Integer, Integer, Integer> sumFunction = (a, b) -> a + b;
```

> 要注意不能使用混合语法：

禁止：

```java
(Integer a, var b) -> a + b;
```

和

```java
(var a, b) -> a + b;
```

## 字符串API增强

新增了`isBlank()`、`strip()`、`repeat()`等方法，方便对字符串进行处理。

```java
String str = "  Hello  ";
System.out.println(str.isBlank()); //false
System.out.println(str.strip()); // Hello
System.out.println(str.repeat(3)); //  Hello    Hello    Hello  
```

## 标准化HttpClient

标准化了新的HttpClient的API

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://example.com"))
        .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

## 模块化

# JDK14

## Switch表达式

# JDK15

## 文本块

将多行文本中的`换行符`和`转义符`去除，使其变得更易于阅读。

一个普通的SQL从使用单行文本和文本块的区别：

```java
Using "one-dimensional" string literals

String query = "SELECT \"EMP_ID\", \"LAST_NAME\" FROM \"EMPLOYEE_TB\"\n" +
               "WHERE \"CITY\" = 'INDIANAPOLIS'\n" +
               "ORDER BY \"EMP_ID\", \"LAST_NAME\";\n";
Using a "two-dimensional" block of text

String query = """
               SELECT "EMP_ID", "LAST_NAME" FROM "EMPLOYEE_TB"
               WHERE "CITY" = 'INDIANAPOLIS'
               ORDER BY "EMP_ID", "LAST_NAME";
               """;
```

空字符串如下，文本块必须以`"""`和换行符开始。

```java
String empty = """
""";
```

以`"""`结尾，文本结尾是否换行，代表最后一行是否有换行符。

```java
结尾没有换行符\n
"""
line 1
line 2
line 3"""
```

```java
结尾有换行符\n
"""
line 1
line 2
line 3
"""
```

默认情况下，Java **会去掉公共缩进空格**。也就是说，所有行最小的缩进会被当作“基准”去掉。所有的缩进为最小的缩进，如果想要加前导空格，需要将比结尾 `"""` 的缩进更多的空格，才能保留下来：

```java
String s = """
        hello
""";
// 输出：        hello\n
```

但是这样会带来hello末尾强制加上了`\n`，如果不想要换行符，可以使用续航符`\`

```java
String s = """
        hello\
""";
//输出：：        hello
```

# JDK16

## record类

可以定义`record`类，会自动生成`构造函数`,`equals`,`hashcode`,`toString`方法，`record`类是语法糖

```java
record Rectangle(double length, double width) { }
```

等价于

```java
public final class Rectangle {
    private final double length;
    private final double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    double length() { return this.length; }
    double width()  { return this.width; }

    // Implementation of equals() and hashCode(), which specify
    // that two record objects are equal if they
    // are of the same type and contain equal field values.
    public boolean equals...
    public int hashCode...

    // An implementation of toString() that returns a string
    // representation of all the record class's fields,
    // including their names.
    public String toString() {...}
}
```

会自动生成`private final`的成员变量，以及和成员变量同名的取值方法`witdth()`和`length()`。

### 定义标准构造函数

虽然record会自动生成一个构造函数，但是也可以定义一个构造函数。

```java
record Rectangle(double length, double width) {
    public Rectangle(double length, double width) {
        if (length <= 0 || width <= 0) {
            throw new java.lang.IllegalArgumentException(
                String.format("Invalid dimensions: %f, %f", length, width));
        }
        this.length = length;
        this.width = width;
    }
}
```

### 隐式构造函数参数

由于构造函数中的参数签名是同名的，因此可以使用隐式的参数构造。

```java
record Rectangle(double length, double width) {
    public Rectangle {
        if (length <= 0 || width <= 0) {
            throw new java.lang.IllegalArgumentException(
                String.format("Invalid dimensions: %f, %f", length, width));
        }
    }
}
```

### 定义非标准构造函数

相比起显式声明标准构造函数，我们也可以声明非标准构造函数，其传入的可以是自定义的参数，但是其必须调用标准的构造函数，在这种情况下，两种构造函数都是合法的，相当于构造函数重载。

```java
record RectanglePair(double length, double width) {
    public RectanglePair(Pair<Double> corner) {
        this(corner.x(), corner.y());
    }
}
RectanglePair  rectanglePair = new RectanglePair(5.0,2.0); //合法
RectanglePair  rectanglePair2 = new RectanglePair(new Pair<>(6.0, 3.0)); //合法
```



### 显式声明公共访问器

`record`类会自动生成一个和成员变量同名的访问器方法，我们可以显式地声明他以代替自动生成的方法。

```java
record Rectangle(double length, double width) {
 
    // Public accessor method
    public double length() {
        System.out.println("Length is " + length);
        return length;
    }
}
```



**可以声明**静态变量、静态初始化块、静态方法，这些是类级别的，不影响record的不可变特性，其行为和普通类中定义是一样的。

```java
record Rectangle(double length, double width) {

    static double goldenRatio;

    static {
        goldenRatio = (1 + Math.sqrt(5)) / 2;
    }

    static Rectangle createGoldenRectangle(double width) {
        return new Rectangle(width, width * goldenRatio);
    }
}

```



**不能声明**额外的实例变量和实例初始化代码块，这会破坏`record`不可变特性。

```java
record Rectangle(double length, double width) {
    BiFunction<Double, Double, Double> diagonal; // ❌ 不允许新的实例字段

    { // ❌ 实例初始化块也不允许
        diagonal = (x, y) -> Math.sqrt(x*x + y*y);
    }
}

```

**可以声明**额外的实例方法，嵌套类，嵌套record

```java
record Rectangle(double length, double width) {

    // 普通实例方法
    public double area() {
        return length * width;
    }

    // 嵌套 record（自动是 static 的）
    record RotationAngle(double angle) {
        public RotationAngle {
            angle = Math.toRadians(angle);
        }
    }

    // 使用嵌套 record 的实例方法
    public Rectangle getRotatedRectangleBoundingBox(double angle) {
        RotationAngle ra = new RotationAngle(angle);
        double x = Math.abs(length * Math.cos(ra.angle())) +
                   Math.abs(width  * Math.sin(ra.angle()));
        double y = Math.abs(length * Math.sin(ra.angle())) +
                   Math.abs(width  * Math.cos(ra.angle()));
        return new Rectangle(x, y);
    }
}

```

**不能声明**native方法，native方法可能会修改record内部状态。

```java
record BadRecord(int x) {
    native void doSomething(); // ❌ 编译错误
}

```

### record特性

> **⚠️ TODO**
>
> 当前章节尚未完成，内容正在施工中……
>
> 参考 [Record Classes](https://docs.oracle.com/en/java/javase/24/language/records.html#GUID-4D67C7AF-67A2-4B31-8EA7-F1E913F54BE6)



## Instance of 匹配

可以直接在`instance of`中进行类型转换

原先需要

```java
public interface Shape {
    public static double getPerimeter(Shape s) throws IllegalArgumentException {
        if (s instanceof Rectangle) {
            Rectangle r = (Rectangle) s;
            return 2 * r.length() + 2 * r.width();
        } else if (s instanceof Circle) {
            Circle c = (Circle) s;
            return 2 * c.radius() * Math.PI;
        } else {
            throw new IllegalArgumentException("Unrecognized shape");
        }
    }
```

可以省略`Rectangle r = (Rectangle) s`

```java
public static double getPerimeter(Shape shape) throws IllegalArgumentException {
    if (s instanceof Rectangle r) {
        return 2 * r.length() + 2 * r.width();
    } else if (s instanceof Circle c) {
        return 2 * c.radius() * Math.PI;
    } else {
        throw new IllegalArgumentException("Unrecognized shape");
    }
}
```

要注意其局部变量`instance of Object o`有范围限制

```java
public static double getPerimeter(Shape shape) throws IllegalArgumentException {
    if (shape instanceof Rectangle s) {
        // You can use the pattern variable s (of type Rectangle) here.
    } else if (shape instanceof Circle s) {
        // You can use the pattern variable s of type Circle here
        // but not the pattern variable s of type Rectangle.
    } else {
        // You cannot use either pattern variable here.
    }
}
```

局部变量可以超过`if`的范围

```java
public static boolean bigEnoughRect(Shape s) {
    if (!(s instanceof Rectangle r)) {
        // You cannot use the pattern variable r here because
        // the predicate s instanceof Rectangle is false.
        return false;
    }
    // You can use r here.
    return r.length() > 5; 
}
```

在`if`的`&&`表达式中使用时，要注意前后顺序

```java
if (shape instanceof Rectangle r && r.length() > 5) {
    // ...
}
```

无法在`||`表达式中使用

```java
if (shape instanceof Rectangle r || r.length() > 0) { // error
    // ...
}
```



# JDK17

## Spring和SpringBoot

Spring Framework6和SpringBoot 3默认采用最低JDK17。
## 增强的伪随机数生成器
JDK17 增加了新的伪随机数生成器（RandomGenerator）接口，并提供了多种现代高质量的实现。它相比老的 java.util.Random 更易于使用，支持可插拔算法和流式 API 操作，适合对可重复性和性能有更高要求的场景。

### 新API举例：

```java
import java.util.random.RandomGenerator;
import java.util.random.RandomGeneratorFactory;

// 获取系统默认高质量生成器
RandomGenerator generator = RandomGenerator.getDefault();
int r = generator.nextInt(); // 生成随机整数

// 也可以指定算法，比如 "L64X128MixRandom"
RandomGenerator l64x128 = RandomGeneratorFactory.of("L64X128MixRandom").create();
System.out.println(l64x128.nextDouble());

// 支持流式生成
generator.ints(5, 1, 10).forEach(System.out::println); // 输出5个1~9的随机整数
```

### 已内置的实现包括：
- L32X64MixRandom
- L64X128MixRandom
- Xoroshiro128PlusPlus
- SplittableRandom（JDK8已有，被统一管理）
- 以及传统的 Random、SecureRandom 等


## Sealed Class 密封类

sealed 让父类显式声明可以继承其的子类，限制继承类型。

```
public sealed class Shape permits Circle, Rectangle {
    // ...
}

public final class Circle extends Shape {
    // ...
}

public non-sealed class Rectangle extends Shape {
    // ...
}

```

`sealed`：声明 `Shape` 的继承是受限制的；

`permits`：列出**允许的子类**；

子类必须显式声明继承策略：

- `final` → 不能再被继承；
- `sealed` → 继续限制下一层继承；
- `non-sealed` → 解封，允许任何类再继承。

# JDK21

## Record Patterns

## Switch类型匹配

JDK21 增强了 `switch`，可用于类型判断和模式匹配，使代码更简洁、类型安全。

### 基本语法：

```java
static String formatter(Object obj) {
    return switch (obj) {
        case Integer i -> "整数: " + i;
        case String s -> "字符串: " + s;
        case null     -> "null";
        default       -> "其他类型";
    };
}
```

- `case Integer i`：如果是`Integer`类型，自动解包为变量`i`
- `case String s`：如果是`String`类型，自动解包为变量`s`
- 可以直接匹配`null`
- `default`为兜底分支

### 结合守卫（when）进一步增强：

```java
static String kind(Number number) {
    return switch (number) {
        case Integer i when i > 0 -> "正整数";
        case Integer i -> "非正整数";
        case Double d when d.isNaN() -> "NaN";
        case Double d -> "浮点数";
        default -> "其他数字类型或null";
    };
}
```

- `when`后跟条件，只有条件满足时才匹配该分支

### 使用示例：

```java
public static void main(String[] args) {
    System.out.println(formatter(123));      // 输出: 整数: 123
    System.out.println(formatter("hi"));     // 输出: 字符串: hi
    System.out.println(formatter(null));     // 输出: null
    System.out.println(formatter(3.14));     // 输出: 其他类型

    System.out.println(kind(5));             // 输出: 正整数
    System.out.println(kind(-10));           // 输出: 非正整数
    System.out.println(kind(Double.NaN));    // 输出: NaN
    System.out.println(kind(2.5));           // 输出: 浮点数
}
```
- 类型安全，避免频繁的`instanceof`+强转
- 代码逻辑更清晰、简洁

## 虚拟线程
JDK21 正式引入虚拟线程（virtual threads），这是 Java 并发模型的一次重要革新。虚拟线程是一种轻量级线程，由 Java 虚拟机（JVM）调度，可以大幅提升高并发场景下的吞吐与资源利用率，极大简化高并发服务器编写难度。

### 主要特性
- 虚拟线程是 `Thread` 的一种实现（`java.lang.Thread`），与平台线程拥有基本一致的 API。
- 创建和销毁虚拟线程的代价极低，通常能轻松创建数万甚至百万级的虚拟线程。
- 让阻塞型代码（如 I/O、sleep 等）与异步编程一样高效，但代码风格仍为同步方式，易读易维护。
- 线程调度交由 JVM，背后通常与平台线程池绑定，但用户无需关心。

### 基本用法示例

```java
public class VirtualThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        // 创建单个虚拟线程并启动
        Thread vThread = Thread.startVirtualThread(() -> {
            System.out.println("Hello from virtual thread! 当前线程: " + Thread.currentThread());
        });

        // 等待线程结束
        vThread.join();

        // 同时启动一万个虚拟线程，每个线程 sleep 一下
        int count = 10_000;
        Thread[] threads = new Thread[count];
        for (int i = 0; i < count; i++) {
            threads[i] = Thread.startVirtualThread(() -> {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {}
            });
        }
        // 等待所有虚拟线程结束
        for (Thread t : threads) {
            t.join();
        }
        System.out.println("所有虚拟线程已结束");
    }
}
```

### 使用 Executors 新 API 批量提交任务

```java
var executor = Executors.newVirtualThreadPerTaskExecutor();
try (executor) {
    IntStream.range(0, 10_000).forEach(i ->
        executor.submit(() -> {
            Thread.sleep(100);
        })
    );
}
System.out.println("全部任务提交结束");
```

### 主要意义

- 能用“看起来阻塞、实则调度高效”的方式编写高并发网络应用程序（如 Web 服务器）。
- 大幅减少复杂“回调地狱”或异步代码需求。
- 提高应用的可维护性、扩展性和吞吐能力。

> 虚拟线程的提出标志着 Java 在并发编程领域迈向 Go 之类“百万协程”时代的能力，同时保留了严谨的类型系统和现有生态的兼容性。

## 分代ZGC
### JDK21 引入的分代ZGC（Generational ZGC）

**分代ZGC**（Generational ZGC）是在原有 ZGC 垃圾回收器基础上实现的分代（Generational）功能，进一步提升了低延迟垃圾回收的效率，特别是在大对象、新生代对象生命周期频繁变动的应用场景。

#### 主要特性

- 支持将堆划分为新生代（Young Generation）和老年代（Old Generation）
- 对大多数短命对象进行更高效的内存回收，减少 Full GC 发生频率
- 保持 ZGC 本身的低暂停（亚毫秒级）和可扩展性
- 提升了吞吐量，降低了应用延迟

#### 启用分代ZGC

启动参数示例（JDK21+）：
```
-XX:+UseZGC -XX:+ZGenerational
```

#### 代码体验（无需代码改动，参数可用即生效）

```java
// 启动 JVM 时加如下参数：
// -XX:+UseZGC -XX:+ZGenerational

public class ZGCDemo {
    public static void main(String[] args) throws Exception {
        for (int i = 0; i < 100_000; i++) {
            byte[] arr = new byte[1024 * 1024]; // 分配 1MB
            Thread.sleep(10);
        }
    }
}
```

日志示例（可以添加 -Xlog:gc* 观察）：

```
[0.123s][info][gc,start     ] GC(0) Pause Young (Normal) (G1 Evacuation Pause)
[0.126s][info][gc,stats     ] GC(0) Pause Young (Normal) 2M->0.5M(32M)
...
```

#### 小结

- 分代ZGC 结合了分代回收的高效性和 ZGC 的低延迟能力，非常适用于服务端、大型数据应用和需要低暂停的系统。
- 若使用 ZGC，推荐在 JDK21+ 加启 `-XX:+ZGenerational` 以充分发挥优势。

更多参考：  
https://openjdk.org/jeps/439  
https://wiki.openjdk.org/display/zgc/Main



# JDK22

## 未命名变量

