<?php

namespace App\Models\contacts;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['store_id','full_name','type_document','document','cell_phone','email','state'];
}
