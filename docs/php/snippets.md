---
id: snippets
title: PHP Snippets
sidebar_label: Snippets
---

## Date / Time

### Get number of "working" days in month

Get number of "working" days in month (in this example's case, skips Sunday and Saturday or 0 and 6)

```php
/**
 * @param number $ignore - 0 is sunday, ..., 6 is saturday
 */
function countDays($year, $month, $ignore) {
    $count = 0;
    $counter = mktime(0, 0, 0, $month, 1, $year);
    while (date("n", $counter) == $month) {
        if (in_array(date("w", $counter), $ignore) == false) {
            $count++;
        }
        $counter = strtotime("+1 day", $counter);
    }
    return $count;
}
echo countDays(2013, 1, array(0, 6)); // 23
```

#### References

- https://stackoverflow.com/a/14186057/10097916
