
val kotlin_version: String by project
val logback_version: String by project
val exposed_version: String by project

plugins {
    kotlin("jvm") version "2.0.21"
    kotlin("plugin.serialization") version "1.8.10"
    id("io.ktor.plugin") version "3.0.0"
}

group = "com.example"
version = "0.0.1"

application {
    mainClass.set("io.ktor.server.netty.EngineMain")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-auth-jvm")
    implementation("io.ktor:ktor-server-core-jvm")
    implementation("io.ktor:ktor-server-netty-jvm")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("io.ktor:ktor-server-config-yaml")
    testImplementation("io.ktor:ktor-server-test-host-jvm")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
    implementation("io.ktor:ktor-server-cors:1.2.1")
    implementation("org.jetbrains.exposed:exposed-dao:$exposed_version")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.0") // Replace with your Ktor version
    implementation("io.ktor:ktor-server-content-negotiation:2.3.0") // Core content negotiation plugin
    implementation("io.ktor:ktor-server-core:2.3.0") // Or your version of Ktor
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.0") // Or your version of Ktor
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.0") // Or your version of kotlinx.serialization
}
