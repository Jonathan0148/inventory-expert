<?php

namespace App\Models\settings;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Class User
 *
 * @property $id
 * @property $store_id
 * @property $role_id
 * @property $names
 * @property $surnames
 * @property $type_document
 * @property $document
 * @property $email
 * @property $password
 * @property $state
 * @property $avatar
 * @property $created_at
 * @property $updated_at
 * @property $deleted_at
 *
 * @property Audit[] $audits
 * @property Role $role
 * @property Store $store
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    // SoftDeletes;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['store_id','role_id','names','surnames','type_document','document','email','password','state', 'avatar'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function audits()
    {
        return $this->hasMany('App\Models\settings\Audit', 'user_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function role()
    {
        return $this->hasOne('App\Models\settings\Role', 'id', 'role_id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function store()
    {
        return $this->hasOne('App\Models\settings\Store', 'id', 'store_id');
    }
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}