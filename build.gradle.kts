plugins {
    kotlin("multiplatform") version "1.8.20-RC"
    id("org.jetbrains.compose") version "1.4.0-dev-wasm01"
}

group = "com.yt8492"
version = "1.0.0"

repositories {
    google()
    mavenCentral()
    maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    maven("https://maven.pkg.jetbrains.space/kotlin/p/wasm/experimental")
    maven("https://packages.jetbrains.team/maven/p/karpovich-sandbox/ksandbox")
}

kotlin {
    wasm {
        binaries.executable()
        browser {
            webpackTask {
                outputFileName = "main.js"
            }
            runTask {
                outputFileName = "main.js"
            }
        }
        applyBinaryen()
    }
    sourceSets {
        val wasmMain by getting {
            dependencies {
                implementation(compose.web.core)
                implementation(compose.runtime)
            }
        }
    }
}

// ワークアラウンド
// https://youtrack.jetbrains.com/issue/KT-57203
tasks.named("wasmDevelopmentExecutableCompileSync") {
    dependsOn("wasmBrowserProductionWebpack")
}
