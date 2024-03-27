<?php

namespace App\Models\accounting;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = ['store_id','description','value'];
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
