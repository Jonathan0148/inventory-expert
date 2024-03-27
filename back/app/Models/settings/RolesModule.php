<?php

namespace App\Models\settings;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class RolesModule
 *
 * @property $id
 * @property $role_id
 * @property $module_id
 * @property $created_at
 * @property $updated_at
 * @property $deleted_at
 *
 * @property Module $module
 * @property Role $role
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class RolesModule extends Model
{
    // use SoftDeletes;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['role_id','module_id'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function module()
    {
        return $this->hasOne('App\Models\settings\Module', 'id', 'module_id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function role()
    {
        return $this->hasOne('App\Models\settings\Role', 'id', 'role_id');
    }
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}