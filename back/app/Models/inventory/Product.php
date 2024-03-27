<?php

namespace App\Models\inventory;

use App\Models\accounting\SaleDetail;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $casts = [
        'images' => 'array'
    ];

    protected $fillable = ['store_id','brand_id','shelf_id','column_id','row_id','reference','name','description','applications','measurement_unit','stock','stock_min','cost','price','is_original','tax','discount','price_total','status','images','barcode'];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'products_categories')->withPivot('product_id');
    }

    public function sales_detail()
    {
        return $this->hasMany(SaleDetail::class);
    }
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
