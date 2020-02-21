---
id: permissions
title: Ubuntu Permissions
sidebar_label: Permissions
---

# Setting up user and group permissions

Setting up permissions for Laravel project (solves issue with log being created by www-data for web or root for CLI) -- via: https://askubuntu.com/a/365108

If we check ownership of site1, we will find something like this,

    ls -ld /var/www/laravel-app/
    drwxr-xr-x 2 root root 4096 Oct 24 21:06 laravel-app/

This means that the directory is owned by user root, group root. While user root has write permission (plus read and execute permissions) to the directory, group root has only read and execute permissions.

We will want to change the group ownership to another _(new)_ group and add user1 to that particular group. We will give write permission to that particular group as well.

Create a new group,

    sudo addgroup laravel

Add user1 to the newly created group,

    sudo adduser user1 laravel

Check that user1 is really in that group,

    groups user1

The output should be a list something like,

    user1 : <other-groups> laravel

Now we can change the group ownership of your intended directory.

    sudo chown -vR :laravel /var/www/laravel-app/
    changed ownership of `/var/www/laravel-app/' from root:root to :laravel

Grant write permission to this new group owner,

    sudo chmod -vR g+w /var/www/laravel-app/
    mode of `/var/www/laravel-app/' changed from 0755 (rwxr-xr-x) to 0775 (rwxrwxr-x)

Check that all the changes are indeed there,

    ls -ld /var/www/laravel-app/
    drwxrwxr-x 2 root laravel-app 4096 Oct 24 21:06 /var/www/laravel-app/

So, the directory now is owned by user root, group laravel-app\. Both user root and group laravel have write permission (plus read and execute permissions) to the directory. Any user belonging to group laravel will enjoy all the privileges granted to that group.
