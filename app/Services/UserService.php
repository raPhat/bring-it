<?php

namespace App\Services;

use App\User;

class UserService
{
    /**
     * @var \App\User
     */
    private $model;

    function __construct(
        User $user
    )
    {
        $this->model = $user;
    }

    function getAllUsers() {
        return $this->model->get();
    }

    function update($user, $params) {
        foreach ($params as $key => $val) {
            $user[$key] = $val;
        }
        $user->save();
        return $user;
    }
}