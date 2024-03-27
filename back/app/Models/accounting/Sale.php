<?php

namespace App\Models\accounting;

use App\Models\contacts\Customer;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = ['store_id','customer_id','payment_type_id','date','reference','status','total_bails','subtotal','tax','total','observations'];
    
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_type_id');
    }

    public function details()
    {
        return $this->hasMany(SaleDetail::class);
    }
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
