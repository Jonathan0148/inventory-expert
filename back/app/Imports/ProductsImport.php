<?php

namespace App\Imports;

use App\Models\inventory\Category;
use App\Models\inventory\Product;
use App\Models\inventory\ProductCategory;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;

HeadingRowFormatter::default('none');

class ProductsImport implements ToModel, WithHeadingRow
{
    private $productsNoSaved = [];
    private $rows = 0;

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        if (!isset($row['Nombre']) || !isset($row['Unidad de medida']) || !isset($row['Cantidad']) || !isset($row['Cantidad minima']) || !isset($row['Costo']) || !isset($row['Precio'])){
            return null;
        }

        $reference = isset($row['Referencia']) && !empty($row['Referencia']) ? $row['Referencia'] : $this->getReference();

        $store_id = 1;
        $name = $row['Nombre'];
        $description = $row['Descripcion'];
        $applications = $row['Aplicaciones'];
        $measurement_unit = $row['Unidad de medida'];
        $stock = $row['Cantidad'];
        $stock_min = $row['Cantidad minima'];
        $cost = $row['Costo'];
        $price = $row['Precio'];
        $is_original = $row['Original'];
        $tax = $row['Impuesto'] ?? 0;
        $discount = $row['Descuento'] ?? 0;

        $price_total = $price + ($price * $tax / 100) - ($price * $discount / 100);
        
        ++$this->rows;

        $product = new Product([
            'store_id' => $store_id,
            'reference' => $reference,
            'name' => $name,
            'description' => $description,
            'applications' => $applications,
            'measurement_unit' => $measurement_unit,
            'stock' => $stock,
            'stock_min' => $stock_min,
            'cost' => $cost,
            'price' => $price,
            'is_original' => $is_original,
            'tax' => $tax,
            'discount' => $discount,
            'price_total' => $price_total,
            'images' => []
        ]);

        $product->save();

        $category = $row['Categoria'] ?? null;
        if ($category) {
            $existingCategory = Category::find($category);
            if ($existingCategory) {
                $product->categories()->attach($existingCategory);
            }
        }

        return $product;
    }

    public function getRowCount(): int
    {
        return $this->rows;
    }

    public function getReference()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        $length = 10;

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }

    public function getProductsNoSaved(): Object | Array
    {
        return $this->productsNoSaved;
    }
}