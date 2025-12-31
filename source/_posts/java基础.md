---
title: java基础
date: 2025-08-12 01:55:16
tags:
categories: 
  - 数据结构 
  - java
---

# Java基础知识

## 静态方法与非静态成员

静态方法是属于类的，而非静态成员属于实例对象，前者在类加载的时候就会分配内存，而后者只有在对象实例化之后才会加载，因此静态方法不能访问非静态成员。

## 可变长参数

在jdk5后引入，参数后会加上`...`以表示可变长参数，当一个可变长参数的函数重载另一个函数会后，调用会优先选择范围可定的函数。

```java
public void methodName(Type... parameterName) {
    // 方法体
}
```

1.可变长参数实际上是一个语法糖，编译器在底层会将其转换为数组。

2.例如 `String... args` 会被编译为 `String[] args`。

3.调用方法时，可以传递任意数量（包括零个）的参数。

4.可变长参数只能放在普通参数的最后。

## 面向对象OOP

三大特点：封装、继承、多态

封装：内部成员隐藏，仅暴露外部方法以供调用

继承：在已定义的类的基础上定义额外的类，提高代码的重用和可扩展性。

1.子类无法继承父类的私有属性和方法

2.子类可以重写父类的方法

多态：一个对象可以存在多种状态。

**编译时多态**：方法重载（Overload）。
**运行时多态**：方法重写（Override）—— 这是多态的核心和精髓。



## 接口和抽象类

- **实例化**：接口和抽象类都不能直接实例化，只能被实现（接口）或继承（抽象类）后才能创建具体的对象。
- **抽象方法**：接口和抽象类都可以包含抽象方法。抽象方法没有方法体，必须在子类或实现类中实现。

| 维度           | 接口 (Interface)             | 抽象类 (Abstract Class)    |
| :------------- | :--------------------------- | :------------------------- |
| **继承**       | 实现多个接口                 | 只能继承一个抽象类         |
| **方法**       | 抽象方法、默认方法、静态方法 | 抽象方法和具体方法         |
| **变量**       | 只能是常量                   | 可以是普通变量             |
| **构造器**     | 无                           | 有                         |
| **设计目标**   | 定义契约和能力               | 代码复用和部分实现         |
| **访问修饰符** | 默认public                   | 可以是protected、private等 |

## Final关键字

### Final修饰的类

**作用**：表示这个类**不能被继承**，即不能有子类。

**特点**：1.这个类所有方法都不能重写，因为没有子类；2.这个类中的变量不一定是final的

### Final修饰的方法

**作用**：表示这个方法**不能被子类重写**(Override)。

**特点**：1.可以用于修饰静态方法和实例方法；2.private是隐式final的，因为无法被继承，也就没有重写；3.final方法可以被Overload

### Final修饰的变量

#### 1. final修饰基本类型变量

**作用**：表示这个变量的值**一旦初始化就不能被修改**（即成为常量）。

#### 2. final修饰引用类型变量

**作用**：表示这个引用**不能再指向其他对象**，但对象本身的内容可以被修改。

#### 3. final修饰成员变量

**特点**：1.必须在声明时或构造方法中初始化；2.一旦初始化后就不能再修改。

### Final的内存特点

1.Final修饰的变量在初始化完成后对其他线程可见。

2.阻止内存重排。

3.用于实现线程安全不可变关键。

## 浅拷贝、深拷贝与引用拷贝

![shallow&deep-copy](https://oss.javaguide.cn/github/javaguide/java/basis/shallow&deep-copy.png)

### 浅拷贝

创建一个新对象，然后将原对象的**非静态字段**的值逐个复制到新对象。

- 如果字段是**基本类型**，则复制其值。

- 如果字段是**引用类型**，则复制其**内存地址**（即引用），而不是引用的对象本身。

### 深拷贝	

创建一个新对象，同时递归地创建原对象中所有引用类型字段所指向的对象的副本。结果是两个完全独立的对象，没有任何共享的内部状态。

### 引用拷贝

创建一个新的变量名，实际上指向的还是原来的对象引用地址。

## String，StringBuilder和StringBuffer

### String不可变

String是一个final修饰的对象，final关键字强调了该引用不可变。

在JDK的主要实现中，String底层是一个char[]。

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
/** String本质是个char数组. 而且用final关键字修饰.*/
private final char value[];
......
}
```

虽然final不可变，但是其引用不可变，我们依然可以去修改堆中的内存，但其使用了private修饰，并且没有暴露内部字段。

同时，String有字符串常量池属性，对于相同的字符串，它们都指向堆的同一个内存地址，如果String是可变的话，这就没有意义了。

```java
String a = "111";
String b = "111";
```

## Error 和 Exception

所有的异常都继承于`java.lang.Throwable`，其有两个子类

- Exception：程序本身可以处理的异常，可以通过`catch`进行捕获。Exception又分为Checked和Unchecked异常
- Error：属于程序无法处理的，不建议通过catch来捕获，因为捕获了后续也没法处理，例如无法恢复现场，不能保证系统能安全恢复，通常只是能打印日志或做一些清理工作。如`OutOfMemoryError`,`Virtual MachineError`,`NoClassDefFoundError`等

### Checked Exception和Unchecked Exception

**Checked Exception** 即 受检查异常 ，Java 代码在编译过程中，如果受检查异常没有被 `catch`或者`throws` 关键字处理的话，就没办法通过编译。最常见的如FileNotFoundException，强制要求在编译阶段就对其进行catch或者throws，否则编译无法通过。

除了`RuntimeException`及其子类以外，其他的`Exception`类及其子类都属于受检查异常 。常见的受检查异常有：IO 相关的异常、`ClassNotFoundException`、`SQLException`...。

**Unchecked Exception** 即 **不受检查异常** ，Java 代码在编译过程中 ，我们即使不处理不受检查异常也可以正常通过编译。

`RuntimeException` 及其子类都统称为非受检查异常，常见的有（建议记下来，日常开发中会经常用到）：

- `NullPointerException`(空指针错误)
- `IllegalArgumentException`(参数错误比如方法入参类型错误)
- `NumberFormatException`（字符串转换为数字格式错误，`IllegalArgumentException`的子类）
- `ArrayIndexOutOfBoundsException`（数组越界错误）
- `ClassCastException`（类型转换错误）
- `ArithmeticException`（算术错误）
- `SecurityException` （安全错误比如权限不够）
- `UnsupportedOperationException`(不支持的操作错误比如重复创建同一用户)

这些异常无法在编译阶段被感知到，因此只有在运行时才能捕获这些异常

### throwable-类常用方法有哪些

- `String getMessage()`: 返回异常发生时的详细信息
- `String toString()`: 返回异常发生时的简要描述
- `String getLocalizedMessage()`: 返回异常对象的本地化信息。使用 `Throwable` 的子类覆盖这个方法，可以生成本地化信息。如果子类没有覆盖该方法，则该方法返回的信息与 `getMessage()`返回的结果相同
- `void printStackTrace()`: 在控制台上打印 `Throwable` 对象封装的异常信息

### try-catch-finally-如何使用

- `try`块：用于捕获异常。其后可接零个或多个 `catch` 块，如果没有 `catch` 块，则必须跟一个 `finally` 块。
- `catch`块：用于处理 try 捕获到的异常。
- `finally` 块：无论是否捕获或处理异常，`finally` 块里的语句都会被执行。当在 `try` 块或 `catch` 块中遇到 `return` 语句时，`finally` 语句块将在方法返回之前被执行。

> 如果try语句里有return，返回的是try语句块中变量值。 
> 详细执行过程如下：
> a.如果有返回值，就把返回值保存到局部变量中；
> b.执行jsr指令跳到finally语句里执行；
> c.执行完finally语句后，返回之前保存在局部变量表里的值。
> **如果try，finally语句里均有return，忽略try的return，而使用finally的return.

### finally中的代码一定会被执行吗？

finally中的代码在虚拟机被终止时，finally中的代码就不会被执行。

### try-with-resources

`try-with-resources` 其实是一个语法糖，其目的是自动、安全地关闭实现了 `AutoCloseable`（或 `Closeable`）的资源，替代手写的 `try...finally` 关闭资源，避免资源泄漏并且正确处理关闭时抛出的异常。



#### 语法示例

```
try (InputStream in = new FileInputStream("file.txt")) {
    // 使用 in
} catch (IOException e) {
    // 处理读取异常
}
```

可以声明多个资源，用分号分隔：

```
try (
    InputStream in = new FileInputStream("a");
    OutputStream out = new FileOutputStream("b")
) {
    // body
}
```

#### 资源类型与可用性

- 资源类型必须实现 `java.lang.AutoCloseable`（`java.io.Closeable` 也可以，因为它继承自 `AutoCloseable`）。
- `AutoCloseable.close()` 声明为 `throws Exception`，而 `Closeable.close()` 声明为 `throws IOException`。因此如果资源的 `close()` 抛出受检异常，调用方法必须声明或捕获该异常。

#### Java 7 vs Java 9 的差别（重要）

- Java 7/8：资源必须在 `try(...)` 中声明（即在括号内创建变量）。

- Java 9+：允许把**已经存在的 final 或 \*effectively final\* 本地变量**放入 `try` 的括号中：

  ```
  BufferedReader br = new BufferedReader(...);
  // br 必须在此之后不再被修改（effectively final）
  try (br) {
      // use br
  }
  ```

#### 资源关闭的顺序

- 创建顺序：左到右。
- 关闭顺序：**反向**（右到左）。也就是最后创建的资源最先关闭。

#### 异常处理：主异常与 suppressed（关键点）

- 如果 try 块中抛出了异常 A，而在关闭资源时抛出了异常 B，那么：
  - 异常 A 是**主异常**（会被抛出）。
  - 关闭时抛出的异常 B 会被作为被抑制异常（suppressed）加入主异常：`A.addSuppressed(B)`。
- 如果 try 块没有异常，但关闭时抛出异常，则该关闭异常成为主异常并被抛出。
- 你可以通过 `Throwable[] t.getSuppressed()` 获取被抑制的异常；在打印栈跟踪时 JVM 也会显示 suppressed 列表。

示例（演示 suppressed）：

```
class R implements AutoCloseable {
    @Override
    public void close() throws Exception {
        throw new Exception("close failed");
    }
}

public static void main(String[] args) {
    try (R r = new R()) {
        throw new Exception("try failed");
    } catch (Exception e) {
        System.out.println("Primary: " + e.getMessage());
        for (Throwable s : e.getSuppressed()) {
            System.out.println("Suppressed: " + s.getMessage());
        }
    }
}
```

输出：

```
Primary: try failed
Suppressed: close failed
```

#### 编译器如何“糖化”为 try-finally（反糖化示例）

单资源的近似编译后形式（示意）：

```
MyResource r = new MyResource();
Throwable primaryExc = null;
try {
    // try-body
} catch (Throwable t) {
    primaryExc = t;
    throw t;
} finally {
    if (r != null) {
        if (primaryExc != null) {
            try {
                r.close();
            } catch (Throwable closeExc) {
                primaryExc.addSuppressed(closeExc);
            }
        } else {
            r.close();
        }
    }
}
```

- 注意重点：如果主异常存在，`close()` 抛出的异常不会覆盖它，而是被 `addSuppressed`；如果没有主异常，`close()` 抛出的异常会向上抛出。
- 对于多个资源，编译器会按资源个数生成嵌套的类似逻辑，最终达到“反向关闭并抑制”的效果。
- 编译器还会在调用 `close()` 前检查资源是否为 `null`（因此如果资源变量为 `null`，不会 NPE）。

#### 关于 null 资源

- 如果资源表达式结果是 `null`，编译器生成的代码会检查并跳过关闭（不会调用 `close()` 导致 NPE）。

#### 结合 catch / finally

- `try-with-resources` 支持 `catch` 和 `finally`：

```
try (R r = ...) {
   // body
} catch (SomeException e) {
   // 处理
} finally {
   // 最后仍然会在这里执行（close 已在 try 退出时调用）
}
```

- `finally` 中的代码在资源关闭之后执行（因为关闭是在隐式 finally 中完成的 —— 但语义上资源关闭是在 try 退出后、外层 finally 执行前完成）。

#### 常见误区与注意点（实务建议）

1. **不要在 close() 中做复杂的恢复逻辑**——close 应该尽量简洁、幂等；如果 close 失败会抑制真正的业务异常，排查会麻烦。
2. **处理 suppressed**：日志或错误处理时，最好记录主异常和 `getSuppressed()` 的内容，避免失去关键信息。
3. **不要捕获 `Error` 或 `Throwable`（除非框架层）**：业务代码应捕获可恢复的异常类型；框架/容器可能会用 `catch(Throwable)` 做最后兜底并记录日志。
4. **JDBC 的使用**：`Connection`, `Statement`, `ResultSet` 从 JDBC 4.1 起都实现了 `AutoCloseable`，推荐在 try-with-resources 中使用，确保按逆序关闭。
5. **方法签名注意**：如果资源的 `close()` 声明抛出受检异常，那么 enclosing 方法如果不捕获这些异常就需要声明相应的 throws。

#### **进阶示例**（多资源、Java9 语法、锁释放包装器）

多资源（关闭顺序：out -> in）：

```
try (InputStream in = new FileInputStream("a");
     OutputStream out = new FileOutputStream("b")) {
    // ...
}
```

Java 9+, 使用已声明变量：

```
BufferedReader br = new BufferedReader(new FileReader("f"));
try (br) { // br 必须是 effectively final
    System.out.println(br.readLine());
}
```

把 `ReentrantLock` 用作 try-with-resources（包装成 AutoCloseable）：

```
class LockWrapper implements AutoCloseable {
    private final ReentrantLock lock;
    LockWrapper(ReentrantLock lock) {
        this.lock = lock; lock.lock();
    }
    @Override
    public void close() { lock.unlock(); }
}

// 使用：
ReentrantLock lock = new ReentrantLock();
try (LockWrapper lw = new LockWrapper(lock)) {
    // 在这里持有 lock
}
```

#### 实践建议（短句）

- 优先使用 `try-with-resources` 来管理流、文件、数据库连接等资源。
- 在需要记录或转发异常时，注意同时查看 `getSuppressed()`。
- 实现 `AutoCloseable` 时让 `close()` 简单且幂等，尽量不抛出不可预期的异常；若必须抛出，文档清楚标注。

## 泛型

### 泛型的设计目的

在java1.5之前，没有泛型的设计，导致所有的集合容器存放的都是Object型，使用时必须进行强制类型转换。

```java
List list = new ArrayList();
list.add("hello");
String s = (String) list.get(0); // 需要强转

```

运行时容易出错，出现`ClassCastException`

因此引入了泛型，能够提供：

1. 编译时的类型检查
2. 消除类型强制转换
3. 可读性更好

### 泛型擦除

java的泛型本质是伪泛型，只会在编译时进行泛型的类型检查，而在运行时会进行泛型擦除，编译器在使用泛型的`get()`方法前，会插入`(<T>)`进行类型转换，意味JVM在运行时实际上无法获得泛型信息，`List<String>`和`List<Integer>`在JVM看来实际上都是都是`List`。

由于在运行时JVM没有泛型信息，我们不能在运行时进行类型判断

```java
List<String> list = new ArrayList<>();
if (list instanceof List<String>) {} // 编译错误

```

也不能创建泛型类型数组

```java
List<String>[] arr = new List<String>[10]; // 编译错误
```

### 泛型边界与通配符

#### 上界 extends

```java
class Box<T extends Number> {  // T 必须是 Number 或其子类
    T value;
}

```

上界的extends能够确定当前泛型T所继承的父类，也就是说T一定是其子类

#### 下界 super

```java
List<? super Integer> list; // 可以存放 Integer 及其子类，但取出时只保证是 Object

```

下界的super能够确定当前泛型T所拥有的子类，也就是说T一定是其父类

#### 无界通配符

```
void printList(List<?> list) {
    for (Object o : list) {
        System.out.println(o);
    }
}

```



#### PECS原则(Producer Extends, Consumer Super)

上界意味着你能确定当前泛型T，一定是某个类的子类，能够安全地读出，意味着可以用父类来接受它，例如<T extends Number>可以用Number这个父类来接受，但是不能安全地写入，因为无法判断其是什么具体类，是Integer还是Double。

而下界作为某个类的父类，能够安全的写入，因为至少能够写入Integer，最基础的类，而不能安全的读出，取出时只能保证其是超类Object自身或者其子类。

### 协变/逆变

java的泛型没有协变/逆变，因此不能写如下的代码：

```java
List<Number> list = new ArrayList<Integer>(); // 编译错误

```

必须使用通配符表达：

```java
List<? extends Number> list = new ArrayList<Integer>(); // 合法

```

### 泛型擦除

由于jvm在运行时会进行泛型擦除，因此想要获得具体的泛型信息，需要借助反射和`type`的API

```java
Field f = MyClass.class.getDeclaredField("list");
Type type = f.getGenericType();  // 可能是 ParameterizedType

```

### 最佳实践

**基本类型不能作为泛型参数**

- `List<int>` 不合法，必须用 `Integer`。

**静态变量不能使用类型参数**

- 因为泛型参数属于实例层面，不属于类层面。

**泛型类不能直接创建泛型数组**

**类型擦除导致的桥方法 (Bridge Method)**
 如果泛型方法在子类中被重写，编译器可能生成桥方法保证多态一致。

**在 API 设计中，用通配符表达灵活性（PECS 原则）。**

**在内部实现时，用确切的类型参数，减少歧义。**

**避免原生类型（raw type）`List list`，这样会失去泛型检查。**

**在必要时使用 `@SuppressWarnings("unchecked")`，但要小心**。

**写工具类时优先考虑泛型方法，而不是泛型类。**



## 反射

简单来说，Java 反射 (Reflection) 是一种**在程序运行时，动态地获取类的信息并操作类或对象（方法、属性）的能力**。

通常情况下，我们写的代码在编译时类型就已经确定了，要调用哪个方法、访问哪个字段都是明确的。但反射允许我们在**运行时**才去探知一个类有哪些方法、哪些属性、它的构造函数是怎样的，甚至可以动态地创建对象、调用方法或修改属性，哪怕这些方法或属性是私有的。

正是这种在运行时“反观自身”并进行操作的能力，使得反射成为许多**通用框架和库的基石**。它让代码更加灵活，能够处理在编译时未知的类型。

### 优点

**灵活性和动态性**：反射允许程序在运行时动态地加载类、创建对象、调用方法和访问字段。这样可以根据实际需求（如配置文件、用户输入、注解等）动态地适应和扩展程序的行为，显著提高了系统的灵活性和适应性。

**框架开发的基础**：许多现代 Java 框架（如 Spring、Hibernate、MyBatis）都大量使用反射来实现依赖注入（DI）、面向切面编程（AOP）、对象关系映射（ORM）、注解处理等核心功能。反射是实现这些“魔法”功能不可或缺的基础工具。

**解耦合和通用性**：通过反射，可以编写更通用、可重用和高度解耦的代码，降低模块之间的依赖。例如，可以通过反射实现通用的对象拷贝、序列化、Bean 工具等。

### 缺点：

**性能开销**：反射操作通常比直接代码调用要慢。因为涉及到动态类型解析、方法查找以及 JIT 编译器的优化受限等因素。不过，对于大多数框架场景，这种性能损耗通常是可以接受的，或者框架本身会做一些缓存优化。

**安全性问题**：反射可以绕过 Java 语言的访问控制机制（如访问 `private` 字段和方法），破坏了封装性，可能导致数据泄露或程序被恶意篡改。此外，还可以绕过泛型检查，带来类型安全隐患。

**代码可读性和维护性**：过度使用反射会使代码变得复杂、难以理解和调试。错误通常在运行时才会暴露，不像编译期错误那样容易发现。

### 应用场景 

1. DI和IOC：以 Spring/Spring Boot 为代表的 IoC 框架，会在启动时扫描带有特定注解（如 `@Component`, `@Service`, `@Repository`, `@Controller`）的类，利用反射实例化对象（Bean），并通过反射注入依赖（如 `@Autowired`、构造器注入等）。

2. 注解处理：框架通过反射检查类、方法、字段上有没有特定的注解，然后根据注解信息执行相应的逻辑。比如，看到 `@Value`，就用反射读取注解内容，去配置文件找对应的值，再用反射把值设置给字段。
3. 动态代理和AOP：JDK 自带的动态代理（Proxy 和 InvocationHandler）就离不开反射。代理对象在内部调用真实对象的方法时，就是通过反射的 `Method.invoke` 来完成的。
4. ORM关系对象映射：ORM通过反射获取 Java 类的属性列表，然后把查询结果按名字或配置对应起来，再用反射调用 setter 或直接修改字段值。反过来，保存对象到数据库时，也是用反射读取属性值来拼 SQL。

## 注解

`Annotation` （注解） 是 Java5 开始引入的新特性，可以看作是一种特殊的注释，主要用于修饰类、方法或者变量，提供某些信息供程序在编译或者运行时使用。

注解本质是一个继承了`Annotation` 的特殊接口：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {

}

public interface Override extends Annotation{

}
```

注解只有被解析之后才会生效，常见的解析方法有两种：

- **编译期直接扫描**：编译器在编译 Java 代码的时候扫描对应的注解并处理，比如某个方法使用`@Override` 注解，编译器在编译的时候就会检测当前的方法是否重写了父类对应的方法。
- **运行期通过反射处理**：像框架中自带的注解(比如 Spring 框架的 `@Value`、`@Component`)都是通过反射来进行处理的。



## SPI和API

当实现方提供了接口和实现，我们可以通过调用实现方的接口从而拥有实现方给我们提供的能力，这就是 **API**。这种情况下，接口和实现都是放在实现方的包中。调用方通过接口调用实现方的功能，而不需要关心具体的实现细节。

当接口存在于调用方这边时，这就是 **SPI** 。由接口调用方确定接口规则，然后由不同的厂商根据这个规则对这个接口进行实现，从而提供服务。

## 序列化和反序列化

- **序列化**：将数据结构或对象转换成可以存储或传输的形式，通常是二进制字节流，也可以是 JSON, XML 等文本格式，即对象->JSON。
- **反序列化**：将在序列化过程中所生成的数据转换为原始数据结构或者对象的过程，即JSON->对象。

## 语法糖

语法糖实际上不是一个真正的语法，只是为了简化某些语法表达而创建的，例如`for-each`就是一个语法糖，JVM并不能识别语法糖，语法糖只在编译器层面被看见，编译器编译代码为字节码时会调用`desugar()`来解码语法糖。



# Java重要知识

## 值传递与引用传递

Java只有值传递没有引用传递，对于传参，在 Java 方法调用时，**实参的值**会被复制一份，传递给形参。

- 如果参数是 **基本类型**，复制的是 **具体的数值**。
- 如果参数是 **引用类型**，复制的是 **引用的值**（也就是对象在堆里的地址）。

### 传递基本类型

```java
public class Test {
    public static void main(String[] args) {
        int x = 5;
        change(x);
        System.out.println(x); // 还是 5
    }
    static void change(int a) {
        a = 10; // 只改了副本
    }
}

```

### 传递引用复制

```java
class Person {
    String name;
    Person(String name) { this.name = name; }
}

public class Test {
    public static void main(String[] args) {
        Person p = new Person("Alice");
        change(p);
        System.out.println(p.name); // 输出 Bob
    }
    static void change(Person x) {
        x.name = "Bob"; // 修改的是同一个对象
    }
}

```

### 无法改变原引用的值

```java
public class Test {
    public static void main(String[] args) {
        Person p = new Person("Alice");
        reassign(p);
        System.out.println(p.name); // 还是 Alice
    }
    static void reassign(Person x) {
        x = new Person("Charlie"); // x 指向新对象，但不影响外部的 p
    }
}

```

真正的引用传递可以修改调用者的变量绑定。



## 泛型&通配符详解

### 一、泛型的基本概念

泛型（Generics）是Java 5引入的特性，允许在定义类、接口和方法时使用类型参数（Type Parameter），使得类型可以作为参数传递，提供了编译时的类型安全检查和代码重用。

#### 1.1 为什么需要泛型

在Java 5之前，容器类（如List、Set、Map）只能存储Object类型，使用时需要进行强制类型转换：

```java
List list = new ArrayList();
list.add("hello");
list.add(123);  // 编译时不会报错
String s = (String) list.get(0);  // 需要强制转换
Integer i = (Integer) list.get(1);  // 运行时可能抛出ClassCastException
```

泛型的引入解决了以下问题：
- **类型安全**：在编译时进行类型检查，避免运行时类型转换异常
- **消除强制转换**：代码更加简洁，不需要频繁进行类型转换
- **提高代码可读性**：代码意图更加明确，`List<String>`比`List`更清晰

### 二、泛型的基本用法

#### 2.1 泛型类

泛型类是指在定义类时使用类型参数的类。

```java
// 定义泛型类
public class Box<T> {
    private T value;
    
    public void setValue(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
}

// 使用泛型类
Box<String> stringBox = new Box<>();
stringBox.setValue("Hello");
String value = stringBox.getValue();  // 不需要强制转换

Box<Integer> intBox = new Box<>();
intBox.setValue(123);
Integer num = intBox.getValue();
```

#### 2.2 泛型接口

泛型接口与泛型类类似，接口定义时可以使用类型参数。

```java
// 定义泛型接口
public interface Comparable<T> {
    int compareTo(T other);
}

// 实现泛型接口
public class Student implements Comparable<Student> {
    private String name;
    private int age;
    
    @Override
    public int compareTo(Student other) {
        return this.age - other.age;
    }
}
```

#### 2.3 泛型方法

泛型方法可以在非泛型类中定义，方法可以有自己的类型参数。

```java
public class Utils {
    // 泛型方法：类型参数在返回类型之前
    public static <T> T getMiddle(T... args) {
        return args[args.length / 2];
    }
    
    // 多个类型参数
    public static <K, V> V getValue(Map<K, V> map, K key) {
        return map.get(key);
    }
}

// 使用泛型方法
String middle = Utils.getMiddle("a", "b", "c");  // 返回 "b"
Integer num = Utils.getMiddle(1, 2, 3, 4, 5);  // 返回 3
```

**类型推断**：在调用泛型方法时，通常不需要显式指定类型参数，编译器可以根据参数类型自动推断。

```java
// 显式指定类型参数（通常不需要）
String s = Utils.<String>getMiddle("a", "b", "c");

// 类型推断（推荐方式）
String s = Utils.getMiddle("a", "b", "c");
```

### 三、泛型的类型参数限制

#### 3.1 类型变量的限制（类型边界）

可以使用`extends`关键字限制类型参数必须是指定类的子类或实现指定接口。

```java
// 限制T必须是Number或其子类
public class NumberBox<T extends Number> {
    private T value;
    
    public double getDoubleValue() {
        return value.doubleValue();  // 可以安全调用Number的方法
    }
}

NumberBox<Integer> intBox = new NumberBox<>();  // 合法
NumberBox<Double> doubleBox = new NumberBox<>();  // 合法
NumberBox<String> stringBox = new NumberBox<>();  // 编译错误
```

#### 3.2 多个边界

可以使用`&`连接多个边界，但类只能有一个，接口可以有多个。

```java
// T必须同时是Number的子类和Comparable的实现
public class ComparableNumber<T extends Number & Comparable<T>> {
    private T value;
    
    public int compareTo(ComparableNumber<T> other) {
        return this.value.compareTo(other.value);
    }
}
```

#### 3.3 类型参数命名规范

- `T` - Type（类型）
- `E` - Element（元素，常用于集合）
- `K` - Key（键）
- `V` - Value（值）
- `N` - Number（数字）
- `S, U, V` - 第二个、第三个、第四个类型

### 四、通配符（Wildcards）

通配符用于表示未知类型，提供了更灵活的类型匹配方式。通配符使用`?`表示。

#### 4.1 无界通配符 `?`

无界通配符`List<?>`表示可以接受任何类型的List，但只能读取，不能写入（除了null）。

```java
public void printList(List<?> list) {
    for (Object obj : list) {
        System.out.println(obj);
    }
    // list.add("hello");  // 编译错误，不能写入
    // list.add(123);      // 编译错误，不能写入
    list.add(null);        // 唯一可以写入的值是null
}

List<String> stringList = new ArrayList<>();
List<Integer> intList = new ArrayList<>();
printList(stringList);  // 合法
printList(intList);     // 合法
```

**使用场景**：当方法只需要读取集合中的元素，而不关心具体类型时使用。

#### 4.2 上界通配符 `? extends T`

上界通配符`List<? extends T>`表示可以接受`T`及其子类型的List。

```java
// 可以接受Number及其子类型的List
public double sum(List<? extends Number> numbers) {
    double total = 0.0;
    for (Number num : numbers) {
        total += num.doubleValue();
    }
    return total;
}

List<Integer> intList = Arrays.asList(1, 2, 3);
List<Double> doubleList = Arrays.asList(1.1, 2.2, 3.3);
double sum1 = sum(intList);     // 合法
double sum2 = sum(doubleList);  // 合法
```

**特点**：
- **只能读取**：可以安全地读取元素并视为`T`类型
- **不能写入**：除了`null`之外，不能添加任何元素（因为不知道具体是哪个子类型）

```java
List<? extends Number> list = new ArrayList<Integer>();
Number num = list.get(0);  // 可以读取
// list.add(new Integer(1));  // 编译错误
// list.add(new Double(1.0)); // 编译错误
list.add(null);            // 只能添加null
```

**原理说明**：假设`List<? extends Number> list = new ArrayList<Integer>()`，如果允许`list.add(new Double(1.0))`，就会在`ArrayList<Integer>`中存入Double，破坏了类型安全。

#### 4.3 下界通配符 `? super T`

下界通配符`List<? super T>`表示可以接受`T`及其父类型的List。

```java
// 可以接受Integer及其父类型的List
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}

List<Number> numberList = new ArrayList<>();
List<Object> objectList = new ArrayList<>();
addNumbers(numberList);  // 合法
addNumbers(objectList);  // 合法
```

**特点**：
- **只能写入**：可以安全地添加`T`及其子类型的元素
- **读取受限**：只能读取为`Object`类型

```java
List<? super Integer> list = new ArrayList<Number>();
list.add(new Integer(1));      // 可以写入
list.add(2);                   // 可以写入
// Integer i = list.get(0);    // 编译错误
Object obj = list.get(0);      // 只能读取为Object
```

**原理说明**：假设`List<? super Integer> list = new ArrayList<Number>()`，可以添加Integer，因为Integer是Number的子类；但读取时只能保证是Number的父类Object，无法确定具体类型。

### 五、PECS原则（Producer Extends, Consumer Super）

PECS是使用通配符的重要原则，帮助决定何时使用`extends`还是`super`。

#### 5.1 原则说明

- **Producer Extends（生产者使用extends）**：如果参数是用来**产生/提供**元素的（只读），使用`? extends T`
- **Consumer Super（消费者使用super）**：如果参数是用来**消费/接收**元素的（只写），使用`? super T`

#### 5.2 实际应用示例

```java
// 生产者：从src读取元素
// 消费者：向dest写入元素
public static <T> void copy(List<? extends T> src, List<? super T> dest) {
    for (T item : src) {
        dest.add(item);  // 从extends读取，向super写入
    }
}

List<Integer> intList = Arrays.asList(1, 2, 3);
List<Number> numberList = new ArrayList<>();
copy(intList, numberList);  // 合法：Integer extends Number
```

#### 5.3 Collections.copy()的实现

Java标准库中的`Collections.copy()`方法就是PECS原则的典型应用：

```java
public static <T> void copy(List<? super T> dest, List<? extends T> src) {
    int srcSize = src.size();
    if (srcSize > dest.size())
        throw new IndexOutOfBoundsException("Source does not fit in dest");
    
    ListIterator<? super T> di = dest.listIterator();
    ListIterator<? extends T> si = src.listIterator();
    for (int i = 0; i < srcSize; i++) {
        di.next();
        di.set(si.next());  // 从extends读取，向super写入
    }
}
```

### 六、类型擦除（Type Erasure）

#### 6.1 什么是类型擦除

Java的泛型是通过**类型擦除**实现的，这意味着泛型信息只在编译时存在，在运行时会被擦除，所有的泛型参数都会被替换为它们的**边界类型**（如果没有边界，则替换为`Object`）。

```java
// 源代码
public class Box<T> {
    private T value;
    public void setValue(T value) { this.value = value; }
    public T getValue() { return value; }
}

// 编译后的字节码（伪代码）
public class Box {
    private Object value;  // T被擦除为Object
    public void setValue(Object value) { this.value = value; }
    public Object getValue() { return value; }
}

// 如果T extends Number
public class NumberBox<T extends Number> {
    private T value;
}

// 编译后
public class NumberBox {
    private Number value;  // T被擦除为Number（边界类型）
}
```

#### 6.2 类型擦除的影响

**1. 不能使用instanceof检查泛型类型**

```java
List<String> list = new ArrayList<>();
if (list instanceof List<String>) {  // 编译错误
    // ...
}
if (list instanceof List) {  // 合法，但失去了类型信息
    // ...
}
```

**2. 不能创建泛型数组**

```java
// 以下代码都不合法
List<String>[] array = new List<String>[10];  // 编译错误
T[] array = new T[10];  // 编译错误

// 可以创建通配符数组，但不安全
List<?>[] array = new List<?>[10];  // 合法但不推荐
```

**3. 不能抛出或捕获泛型类的实例**

```java
// 以下代码不合法
try {
    // ...
} catch (Exception<String> e) {  // 编译错误
    // ...
}
```

**4. 不能重载具有相同擦除类型的方法**

```java
// 以下代码不合法，因为擦除后都是相同的签名
public void method(List<String> list) { }
public void method(List<Integer> list) { }  // 编译错误，方法签名冲突
```

#### 6.3 桥方法（Bridge Method）

类型擦除可能导致方法签名不匹配，编译器会生成桥方法来保持多态性。

```java
// 父类
public class Parent<T> {
    public void setValue(T value) { }
}

// 子类
public class Child extends Parent<String> {
    @Override
    public void setValue(String value) {  // 重写父类方法
        // ...
    }
}
```

编译后，编译器会生成桥方法：

```java
// 编译器生成的桥方法（伪代码）
public class Child extends Parent {
    public void setValue(String value) {  // 重写的方法
        // ...
    }
    
    // 桥方法：保持多态性
    public void setValue(Object value) {
        setValue((String) value);  // 调用重写的方法
    }
}
```

### 七、泛型的实际应用场景

#### 7.1 集合框架

Java集合框架是泛型最典型的应用：

```java
// 类型安全的集合
List<String> stringList = new ArrayList<>();
Set<Integer> intSet = new HashSet<>();
Map<String, Integer> map = new HashMap<>();

// 避免了类型转换和运行时错误
stringList.add("hello");
String s = stringList.get(0);  // 不需要强制转换
```

#### 7.2 通用工具类

```java
public class ArrayUtils {
    // 交换数组中的两个元素
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // 查找数组中的最大值
    public static <T extends Comparable<T>> T max(T[] array) {
        if (array == null || array.length == 0) {
            return null;
        }
        T max = array[0];
        for (T item : array) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }
}
```

#### 7.3 设计模式中的应用

**工厂模式**：

```java
public interface Factory<T> {
    T create();
}

public class StringFactory implements Factory<String> {
    @Override
    public String create() {
        return "default";
    }
}
```

**建造者模式**：

```java
public class Builder<T> {
    private T instance;
    
    public Builder<T> setInstance(T instance) {
        this.instance = instance;
        return this;
    }
    
    public T build() {
        return instance;
    }
}
```

### 八、常见问题和注意事项

#### 8.1 原始类型（Raw Type）

原始类型是指不使用泛型参数的泛型类，应该避免使用：

```java
List list = new ArrayList();  // 原始类型，不推荐
List<String> list = new ArrayList<>();  // 推荐方式
```

使用原始类型会失去类型安全检查，可能引发`ClassCastException`。

#### 8.2 静态成员不能使用类型参数

```java
public class Box<T> {
    // private static T value;  // 编译错误
    // public static T getValue() { }  // 编译错误
    
    private static int count = 0;  // 合法
    public static <T> void method(T param) { }  // 泛型方法合法
}
```

原因：静态成员属于类，而不属于实例，但类型参数属于实例层面。

#### 8.3 基本类型不能作为类型参数

```java
// List<int> list;  // 编译错误
List<Integer> list;  // 必须使用包装类型
```

#### 8.4 类型推断的限制

在某些情况下，编译器无法推断类型，需要显式指定：

```java
// 类型推断失败
List<String> list = Collections.emptyList();  // 需要显式指定
// 或者
List<String> list = Collections.<String>emptyList();
```

#### 8.5 泛型与重载

由于类型擦除，不能仅通过泛型参数的不同来重载方法：

```java
// 编译错误：方法签名相同（擦除后都是List）
public void method(List<String> list) { }
public void method(List<Integer> list) { }

// 合法：类型参数不同
public <T> void method(List<T> list) { }
public void method(List<?> list) { }  // 通配符类型不同
```

### 九、获取泛型信息（反射）

虽然运行时类型被擦除，但可以通过反射API获取某些泛型信息（如字段、方法参数的泛型信息）。

```java
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public class GenericInfo {
    private List<String> stringList;
    
    public static void main(String[] args) throws NoSuchFieldException {
        Field field = GenericInfo.class.getDeclaredField("stringList");
        Type type = field.getGenericType();
        
        if (type instanceof ParameterizedType) {
            ParameterizedType pt = (ParameterizedType) type;
            Type[] actualTypes = pt.getActualTypeArguments();
            System.out.println("实际类型参数: " + actualTypes[0]);  // class java.lang.String
        }
    }
}
```
## Java反射
### 反射获取对象类的方式
#### 1. 类名.class
```Java
Class<String> clazz = String.class;
```
- 编译器就确定
- 不会触发类初始化，不执行static语句

#### 2. 对象.getClass()
```Java
String s = "hello";
Class<? extends String> clazz = s.getClass();
```
- 运行期获取
- 先存在对象，再获取类，一定会触发类初始化

#### 3. Class.forName("全限定类名")
```Java
Class<?> clazz = Class.forName("java.lang.String");
```
- 运行期动态获取
- 默认触发类初始化
- 如果类不存在会抛出`ClassNotFoundException`

#### 4. 通过ClassLoader加载
```Java
ClassLoader cl = Thread.currentThread().getContextClassLoader();
Class<?> clazz = cl.loadClass("java.lang.String");

```
- 只加载，不初始化
- 不会执行static块