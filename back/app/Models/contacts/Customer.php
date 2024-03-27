<?php

namespace App\Models\contacts;

use App\Models\accounting\Sale;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['store_id','full_name','type_document','document','cell_phone','email','state'];
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function sales()
    {
        return $this->hasMany(Sale::class,'customer_id');
    }

    public function salesPending()
    {
        return $this->hasMany(Sale::class,'customer_id')->where('status', 2);
    }
}
