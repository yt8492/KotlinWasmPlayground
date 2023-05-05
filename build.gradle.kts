plugins {
    kotlin("multiplatform") version "1.8.20"
}

group = "com.yt8492"
version = "1.0.0"

repositories {
    mavenCentral()
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
        val wasmMain by getting
    }
}

// ワークアラウンド
// https://youtrack.jetbrains.com/issue/KT-57203
tasks.named("wasmDevelopmentExecutableCompileSync") {
    dependsOn("wasmBrowserProductionWebpack")
}
