<?php   
namespace App\Models\accounting;

use App\Models\contacts\Customer;
use App\Models\PaymentMethod;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Sale extends Model{
    
    protected $table = "sales";

    protected $fillable = ['reference','id_customer','id_payment_method','status','total_bails','subtotal','tax','total','observations','date'];

    // public $timestamps = false;

    public function details()
    {
        return $this->hasMany(SalesDetail::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'id_payment_method');
    }

    public function bails()
    {
        return $this->hasMany(Bail::class,'id_sale');
    }

}