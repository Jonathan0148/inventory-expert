<?php

namespace App\Models\inventory;

use Illuminate\Database\Eloquent\Model;

class Losse extends Model
{
    protected $fillable = ['store_id','product_id','amount','description'];
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
