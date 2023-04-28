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
        browser()
        applyBinaryen()
    }
    sourceSets {
        val commonMain by getting
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }
        val wasmMain by getting
        val wasmTest by getting
    }
}
