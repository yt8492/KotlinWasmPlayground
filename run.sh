./gradlew wasmBrowserDistribution
cp build/compileSync/wasm/main/productionExecutable/kotlin/* build/distributions
cd build/distributions
docker run --name kotlin-wasm-nginx -p 8080:80 -v $(pwd):/usr/share/nginx/html:ro --rm nginx
