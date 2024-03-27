<?php

namespace App\Models\inventory;

use Illuminate\Database\Eloquent\Model;

class Row extends Model
{
    protected $fillable = ['shelf_id','name'];
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}