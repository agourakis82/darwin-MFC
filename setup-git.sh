#!/bin/bash

echo "# darwin-MFC" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/agourakis82/darwin-MFC.git
git push -u origin main

