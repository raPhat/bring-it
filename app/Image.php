<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function Shops() {
        return $this->belongsToMany('App\Shop', 'shop_has_images', 'image_id');
    }
}
