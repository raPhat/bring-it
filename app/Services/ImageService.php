<?php

namespace App\Services;

use App\Image;
use Carbon\Carbon;

class ImageService
{
    /**
     * @var \App\Image
     */
    private $model;

    function __construct(
        Image $image
    )
    {
        $this->model = $image;
    }

    function create($image) {
        $path = $this->store($image);

        $image = new Image();
        $image['path'] = $path;
        $image->save();

        return $image;
    }

    function store($image) {
        $current_time = Carbon::now()->timestamp;
        $path = $image->storeAs('images', $this->generateRandomString() . '-' . $current_time . '.jpg');

        return $path;
    }

    function delete($image) {
        $image->delete();
        return $image;
    }

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}