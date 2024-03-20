<?php

namespace App\Models\contacts;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = ['store_id','business_name','nit','cell_phone','landline','email','country','department','city','address','state'];
}
