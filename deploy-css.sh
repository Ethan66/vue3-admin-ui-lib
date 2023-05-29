# 确保脚本抛出遇到的错误
set -e

cd dist/global-css-files

npm publish

cd -