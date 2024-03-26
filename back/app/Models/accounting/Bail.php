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
}
