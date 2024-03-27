<?php

namespace App\Models\accounting;

use Illuminate\Database\Eloquent\Model;

class Bail extends Model
{
    protected $fillable = ['sale_id','payment_type_id','price'];

    public function sale()
    {
        return $this->belongsTo(Sale::class, 'sale_id');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_type_id');
    }

    public function saleNotPaid()
    {
        return $this->belongsTo(Sale::class, 'sale_id')->where('status', 2);
    }
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
