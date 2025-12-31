---
title: JDK各个版本特性总结
date: 2025-08-12 01:55:16
tags:
categories: 
  - java
---

# JDK8

## Lambda表达式

## StreamAPI

## 默认方法

## Optional类

# JDK11

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

## Switch 匹配



# JDK22

## 未命名变量

