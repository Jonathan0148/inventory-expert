<?php

namespace App\Models\accounting;

use App\Models\PaymentMethod;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bail extends Model
{
    use HasFactory;

    protected $table = "bails";

    protected $fillable = ['id_sale','id_payment_method','price'];

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'id_payment_method');
    }

    public function sale()
    {
        return $this->belongsTo(Sale::class, 'id_sale');
    }

    public function saleNotPaid()
    {
        return $this->belongsTo(Sale::class, 'id_sale')->where('status', 2);
    }
    
}
