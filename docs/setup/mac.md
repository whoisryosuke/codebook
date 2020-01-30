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
