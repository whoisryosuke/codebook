---
id: snippets
title: Git Snippets
sidebar_label: Snippets
---

## Update fork with remote master

1. Clone forked repo
1. Checkout the `master` branch (or whichever branch you wanted to update)
1. Add the original repo as an upstream: `git remote add upstream git-url-here.git`
1. `git fetch upstream`
1. `git merge upstream/master`
