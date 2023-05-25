rm -rf docs/.vitepress/dist &&
pnpm docs:build &&
cd docs/.vitepress/dist &&
git init &&
git add . &&
git commit -m 'update' &&
git branch -M main &&
git remote add origin https://gitee.com/hlccare/simple-ui-website.git &&
git push -f -u origin main &&
cd - &&
echo https://gitee.com/hlccare/simple-ui-website.git