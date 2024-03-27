<?php

namespace App\Models\inventory;

use Illuminate\Database\Eloquent\Model;

class Losse extends Model
{
    protected $fillable = ['store_id','product_id','amount','description'];
}
