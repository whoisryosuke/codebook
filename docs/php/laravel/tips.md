---
id: tips
title: Laravel Tips
sidebar_label: Tips
---

# Models

## Add user via CLI

Adding a new user manually to database using `tinker` command. via: https://stackoverflow.com/questions/35753951/manually-register-a-user-in-laravel

Use `php artisan tinker` and enter the following code:

```php
$user = new App\User();
$user->password = Hash::make('the-password-of-choice');
$user->email = 'the-email@example.com';
$user->name = 'My Name';
$user->save();
```

## Enabling UUID for models

Enabling UUID for model (v6 tested) -- uses \Illuminate\Support\Str::uuid

### Migrations

Add UUID (or swap bigIncrement) and make sure to set as primary column:

```php
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary();
```

When using the column as a foreign key in a pivot table, create a UUID column and do the same foreign key assignment:

```php
            $table->uuid('organizer_id');
            $table->foreign('organizer_id')->references('id')->on('users')->onDelete('cascade');
```

### Model

1. Create a trait to add to models:

app/Traits/Uuids.php

```php
<?php
namespace App\Traits;

trait Uuids
{
    /**
     * Boot function from laravel.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) \Illuminate\Support\Str::uuid();
        });
    }
}
```

Then "use" that trait in your model:

app/Events.php

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Events extends Model
{
    /**
     * Generates and inserts uuid when creating new items
     */
    use Uuids;
}
```

2. Cast UUID as string inside model (or you'll get errors from foreign keys failing, or UUIDs cast as tiny integers that resemble classic IDs). [Reference](https://stackoverflow.com/a/42393762/10097916)

app/YourModel.php

```php
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'string',
    ];
```

# Blade

## VSCode - Enable emmet autocomplete for Blade syntax

Add to VSCode settings JSON. [via](https://github.com/onecentlin/laravel-blade-snippets-vscode/issues/18#issuecomment-322209682)

```json
"emmet.includeLanguages": {
"blade": "html"
},
```

## Mass Insert or Update

Mass (bulk) insert or update on duplicate for Laravel 4/5

```php
/**
* Mass (bulk) insert or update on duplicate for Laravel 4/5
*
* insertOrUpdate([
*   ['id'=>1,'value'=>10],
*   ['id'=>2,'value'=>60]
* ]);
*
*
* @param array $rows
*/
function insertOrUpdate(array $rows){
    $table = \DB::getTablePrefix().with(new self)->getTable();


    $first = reset($rows);

    $columns = implode( ',',
        array_map( function( $value ) { return "$value"; } , array_keys($first) )
    );

    $values = implode( ',', array_map( function( $row ) {
            return '('.implode( ',',
                array_map( function( $value ) { return '"'.str_replace('"', '""', $value).'"'; } , $row )
            ).')';
        } , $rows )
    );

    $updates = implode( ',',
        array_map( function( $value ) { return "$value = VALUES($value)"; } , array_keys($first) )
    );

    $sql = "INSERT INTO {$table}({$columns}) VALUES {$values} ON DUPLICATE KEY UPDATE {$updates}";

    return \DB::statement( $sql );
}
```

# CLI Commands

## Make New View

Command to make blade views using `php artisan make:view your.view.name`.

1. `php artisan make:command MakeViewCommand`

2. Add the following to the file:

_App\Console\Commands\MakeViewCommand.php_

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class MakeViewCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:view {view}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new blade template.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $view = $this->argument('view');

        $path = $this->viewPath($view);

        $this->createDir($path);

        if (File::exists($path))
        {
            $this->error("File {$path} already exists!");
            return;
        }

        File::put($path, $path);

        $this->info("File {$path} created.");
    }

     /**
     * Get the view full path.
     *
     * @param string $view
     *
     * @return string
     */
    public function viewPath($view)
    {
        $view = str_replace('.', '/', $view) . '.blade.php';

        $path = "resources/views/{$view}";

        return $path;
    }

    /**
     * Create view directory if not exists.
     *
     * @param $path
     */
    public function createDir($path)
    {
        $dir = dirname($path);

        if (!file_exists($dir))
        {
            mkdir($dir, 0777, true);
        }
    }

}
```

3. Register command in console Kernel:

_app\Console\Kernel.php_

```php

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        'App\Console\Commands\MakeViewCommand'
    ];
```
