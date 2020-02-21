---
id: mac-setup
title: Fresh Setup for MacOS
sidebar_label: MacOS
---

## NodeJS

[Download current version (not LTS)](https://nodejs.org/en/download/)

## Homebrew

[Download/Installation instructions](https://docs.brew.sh/Installation)

## Git

### Setup Git username + email

```bash
git config --global user.name "Ryosuke"
git config --global user.email "ryosuke.san.hana@gmail.com"
```

## PHP

### Update PHP to latest version

```bash
# Check version
php -v

# Update to 7.3 using install script
curl -s https://php-osx.liip.ch/install.sh | bash -s 7.3

# Check if updated
php -v
```

### Installing Laravel Globally

Install Laravel using Composer and edit the Bash profile:

```
composer global require laravel/installer
sudo nano ~/.bash_profile
```

Add the following line:

```
export PATH="$PATH:$HOME/.composer/vendor/bin"
```

Run the laravel command:

```
laravel new blog
```

> Make sure Composer is installed globally. Restart Terminal to see changes.

## Yarn

[Install using Homebrew](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

```bash
brew install yarn
```

## Chrome Extensions

- uBlock Origin
- React Developer Tools
- Speed Dial 2
- [Copy as Markdown](https://github.com/whoisryosuke/chrome-copy-as-markdown)
- [Notion Web Clipper](https://www.notion.so/web-clipper)
- [Stylus](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne?hl=en)

## Apps to Install

- [Hyper](https://hyper.is/)
- [Google Chrome](https://www.google.com/chrome/)
- [Firefox](https://www.mozilla.org/en-US/firefox/new/)
- [Figma](https://www.figma.com/downloads/)
- [Table Plus](https://tableplus.com/download)
- [VSCode](https://code.visualstudio.com/download)
- [Now](https://zeit.co/download)

### VSCode Configuration

- [Settings JSON](https://gist.github.com/whoisryosuke/18b6ae588bd12503b6dbd5cd5d367b91)
- [Extensions to Install](https://gist.github.com/whoisryosuke/38dc2ded807cf858ba76d79105bfd3f6)

## Fonts to Download

- [Fira Code](https://github.com/tonsky/FiraCode)

## Random Bash Commands

### Enable/show hidden files

```bash
defaults write com.apple.finder AppleShowAllFiles TRUE
```

### Don't have permission for folder

Adds current user to folder permissions. Usually happens since Mac user isn't technically root, and you shouldn't run any commands `sudo` if you can help it.

```bash
sudo chown -R $(whoami) /usr/local/lib/node_modules /supports/many/folders/ /as/many/folders/as/you/need
```

### Fix "this app is broken" message

Fix "this app is broken, trash it" message - http://osxdaily.com/2019/02/13/fix-app-damaged-cant-be-opened-trash-error-mac/

`xattr -cr /path/to/filename.app`

### Clean up node_modules

via: https://gist.github.com/zephraph/9169b9de4568b858f4b0e45fc41218b7

```sh
#!/bin/bash

DAYS_SINCE_LAST_CHANGE=14
SEARCH_PATH="./Git"
TOTAL_BYTES_REMOVED=0

Mb=1000000
Kb=1000

node_modules=$(find $SEARCH_PATH -name "node_modules" -type d -prune)

HAS_RECENTLY_CHANGED_FILES=false

check_for_changed_files () {
  local files=$(find $1 -ctime -$DAYS_SINCE_LAST_CHANGE -not -path "**/.git/**" -not -path "**/node_modules/**")

  if [ -z "$files" ]; then
    HAS_RECENTLY_CHANGED_FILES=false
  else
    HAS_RECENTLY_CHANGED_FILES=true
  fi
}

for path in $node_modules
do
  parent_path=$(dirname $path)

  check_for_changed_files $parent_path

  if [ "$HAS_RECENTLY_CHANGED_FILES" = false ]; then
    echo "Cleaning $path"
    removed=$(du -sh $path | cut -f1)
    rm -rf $path

    if [[ $removed == *"M" ]]; then
      TOTAL_BYTES_REMOVED=$(echo "$TOTAL_BYTES_REMOVED + (${removed/M/} * $Mb)" | bc)
    fi

    if [[ $removed == *"K" ]]; then
      TOTAL_BYTES_REMOVED=$(echo "$TOTAL_BYTES_REMOVED + (${removed/K/} * $Kb)" | bc)
    fi

    if [[ $removed == *"B" ]]; then
      TOTAL_BYTES_REMOVED=$(echo "$TOTAL_BYTES_REMOVED + ${removed/B/}" | bc)
    fi
  fi

done

if (( $(echo "$TOTAL_BYTES_REMOVED > $Mb" | bc -l) )); then
  formatted_bytes="$(echo "$TOTAL_BYTES_REMOVED / $Mb" | bc)M"
elif (( $(echo "$TOTAL_BYTES_REMOVED > $Kb" | bc -l) )); then
  formatted_bytes="$(echo "$TOTAL_BYTES_REMOVED / $Kb" | bc)K"
else
  formatted_bytes="${TOTAL_BYTES_REMOVED}B"
fi

echo "Bytes removed: $formatted_bytes"
```
