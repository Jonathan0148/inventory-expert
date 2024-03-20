<?php

namespace App\Models\inventory;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    protected $fillable = ['shelf_id','name'];
}