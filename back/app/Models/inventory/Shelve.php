<?php

namespace App\Models\inventory;

use Illuminate\Database\Eloquent\Model;

class Shelve extends Model
{
    protected $fillable = ['store_id','name','description'];
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}