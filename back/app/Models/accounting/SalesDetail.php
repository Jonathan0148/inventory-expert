<?php

namespace App\Models\accounting;

use App\Models\inventory\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesDetail extends Model
{
    use HasFactory;

    protected $table = "sales_detail";
    
    protected $fillable = ['product_id','sale_id', 'amount', 'price'];
   
    public $timestamps = true;
    
    // Relación uno a muchos rol con tabla pivote (inversa)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // //Relación uno a muchos modulo con tabla pivote (inversa)
    // public function module()
    // {
    //     return $this->belongsTo('App\Models\Module');
    // }
}
