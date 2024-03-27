<?php

namespace App\Models\accounting;

use App\Models\inventory\Product;
use Illuminate\Database\Eloquent\Model;

class SaleDetail extends Model
{
    // protected $table = "sale_details";
    
    protected $fillable = ['sale_id','product_id', 'amount', 'price'];
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
