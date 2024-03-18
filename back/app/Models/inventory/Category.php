<?php

namespace App\Models\inventory;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['store_id','name','description'];
}