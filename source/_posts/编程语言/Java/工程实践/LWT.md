---
title: LTW加载时织入
date: 2026-01-29 08:50:01
tags:
categories:
    - Java
---
# 导言
Spring Boot 应用中，基于注解的 AOP 切面只能作用于由 Spring 容器管理的 Bean。对于第三方 JAR 包中的类（未被 Spring 管理），常规 AOP 无法生效。为此，可引入 LTW（Load-Time Weaving），在类加载时动态织入切面逻辑，从而修改第二方或第三方代码的行为。


# 引入依赖
```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-instrument</artifactId>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <scope>runtime</scope>
</dependency>
```
# 定义切面

```java
import org.apache.commons.lang3.StringUtils; 
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Aspect public class LTWAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(LTWAspect.class);
    // 在第三方jar包workflow.service下的所有类调用函数MessageClient.update时切入
    @Around("call (* com.mbms.message.api.client.MessageClient.update(String)) && within(com.mbms.workflow.service..*)")
    public Object changeMessage(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        LOGGER.info("start change message");
        Object[] args = proceedingJoinPoint.getArgs();
        if(args[0] instanceof String messgae){
            args[0] = StringUtils.replace(message, "source", "replacement");
        }
        return proceedingJoinPoint.proceed(args);
    }
}

```
# 配置
```java
import org.springframework.context.annotation.Configuration;
import org.springframework.context.EnabledLoadTimeWeaving;

@Configuration
@EnableLoadTimeWeaving(aspectjWeaving = EnableLoadTimeWeaving.AspectJWeaving.ENABLED)
public class LTWConfig {
}
```
# 添加虚拟机启动参数
```bash
-javaagent:lib/aspectjweaver-1.8.21.jar
-javaagent:lib/spring-instrument-3.2.7.RELEASE.jar
--add-opens java.base/java.lang=ALL-UNNAMED
```

# aop.xml
在src/main/resources/META-INF/下添加aop.xml
```xml
<aspectj>
    <aspects>
        <aspect name="com.mbms.aop.LTWAspect"/>
        <weaver option="-verbose -showWeaveInfo">
            <include within="com.mbms.aop..*"/>
            <include within="com.mbms.message.api.client..*"/>
            <include within="com.mbms.workflow.service..*"/>
        </weaver>
    </aspects>
</aspectj>
```
# JavaAgent

-javaagent 是 Java 虚拟机（JVM）的一个启动参数，用于在 JVM 启动时加载一个 Java Agent（Java 代理）。Java Agent 是一种特殊的程序，可以在 类加载期间动态修改字节码（bytecode），从而实现监控、性能分析、代码覆盖、日志增强、APM（应用性能监控）等功能。

# 参考资料
> https://github.com/indrabasak/spring-loadtime-weaving-example/tree/master