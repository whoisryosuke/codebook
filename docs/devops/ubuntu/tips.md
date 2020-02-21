---
id: tips
title: Ubuntu Tips
sidebar_label: Tips
---

# Copy contents of file to clipboard (SSH key example)

Copy SSH key to clipboard

```bash
pbcopy < ~/.ssh/id_rsa.pub
```

# Check disk space and RAM

How to check disk space and RAM usage of current server. via: https://www.digitalocean.com/community/questions/how-can-i-tell-how-much-disk-space-is-available-on-my-droplet

`df -h`

Reports disk space usage

`free -m`

Reports RAM usage

`sudo apt-get install ncdu && sudo ncdu /`

See more detailed disk space (navigate sub-folders and see their size)
