# 确保脚本抛出遇到的错误
set -e

cd dist/vue3-admin-ui

npm publish --registry=https://registry.npmjs.org/

cd -