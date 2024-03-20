<?php

namespace App\Models\contacts;

use App\Models\accounting\Sale;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['store_id','full_name','type_document','document','cell_phone','email','state'];

    public function sales()
    {
        return $this->hasMany(Sale::class,'id_customer');
    }

    public function salesPending()
    {
        return $this->hasMany(Sale::class,'id_customer')->where('status', 2);
    }
}
