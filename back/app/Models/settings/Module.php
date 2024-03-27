<?php

namespace App\Models\settings;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Module
 *
 * @property $id
 * @property $code
 * @property $name
 * @property $description
 * @property $created_at
 * @property $updated_at
 * @property $deleted_at
 *
 * @property RolesModule[] $rolesModules
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Module extends Model
{
    // use SoftDeletes;
    
    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['code','name','description'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rolesModules()
    {
        return $this->hasMany('App\Models\settings\RolesModule', 'module_id', 'id');
    }
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}