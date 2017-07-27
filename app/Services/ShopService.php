<?php

namespace App\Services;

use App\Shop;

class ShopService
{
    /**
     * @var \App\Shop
     */
    private $model;

    function __construct(
        Shop $shop
    )
    {
        $this->model = $shop;
    }

    function getAllShops() {
        return $this->model->with([
            'Images',
            'User'
        ])->get();
    }

    function getShopById($id) {
        $shop = $this->model->with([
            'Images',
            'User'
        ])
        ->where('id', $id)
        ->first();
        return $shop;
    }

    function create($params) {
        $shop = new Shop();
        $shop['shop_name'] = $params['shop_name'];
        $shop['lat'] = $params['lat'];
        $shop['lng'] = $params['lng'];
        $shop['is_approved'] = ($params['is_approved']) ?: false;
        $shop['user_id'] = $params['user_id'];
        $shop->save();

        $shop->images()->detach($this->getImageIds($params['images']));
        $shop->save();

        return $shop;
    }

    function update($shop, $params) {
        foreach ($params as $key => $val) {
            if ($key == 'images') {
                $shop->images()->detach($this->getImageIds($val));
            } else if ($key == 'user') {
            } else {
                $shop[$key] = $val;
            }
        }
        $shop->save();
        return $shop;
    }

    function getImageIds($images) {
        $imageIds = [];
        foreach($images as $image) {
            $imageIds[] = $image['id'];
        }
        return $imageIds;
    }

    function delete($shop) {
        $shop->delete();
        return $shop;
    }
}