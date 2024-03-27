<?php

namespace App\Models\inventory;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = "products_categories";

    protected $fillable = ['product_id','category_id'];
}