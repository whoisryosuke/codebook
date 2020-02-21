---
id: devops
title: Ubuntu DevOps
sidebar_label: DevOps
---

# Stop job queue in production

Stop queue in production (great for deleting all jobs) - via https://github.com/laravel/ideas/issues/54#issuecomment-293552035

Usually Laravel queue in production is a process run by `supervisor` in Linux.

1. `sudo supervisorctl stop all`
2. Do necessary work (like deleting jobs)
3. `sudo supervisorctl start all`
