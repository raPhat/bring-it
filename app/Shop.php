<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    public function Images() {
        return $this->belongsToMany('App\Image', 'shop_has_images', 'shop_id');
    }

    public function User() {
        return $this->belongsTo('App\User');
    }
}
