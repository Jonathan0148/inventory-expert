<?php

namespace App\Models\settings;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Role
 *
 * @property $id
 * @property $name
 * @property $description
 * @property $created_at
 * @property $updated_at
 * @property $deleted_at
 *
 * @property RolesModule[] $rolesModules
 * @property User[] $users
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Role extends Model
{
    // use SoftDeletes;
    
    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name','description', 'is_super'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function modules()
    {
        return $this->belongsToMany(Module::class, 'roles_modules')->withPivot('has_admin','selected','created_at','updated_at');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users()
    {
        return $this->hasMany('App\Models\settings\User', 'role_id', 'id');
    }
    
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}