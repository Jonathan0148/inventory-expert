<?php

namespace App\Models\accounting;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = ['store_id','customer_id','reference','payment_type','state','subtotal','tax','total','observations'];
}
