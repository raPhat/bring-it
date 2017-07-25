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

    function create($params) {
        $user = new User();
        $user['username'] = $params['username'];
        $user['email'] = $params['email'];
        $user['password'] = bcrypt($params['password']);
        $user['first_name'] = $params['first_name'];
        $user['last_name'] = $params['last_name'];
        $user['birth_date'] = $params['birth_date'];
        $user['phone'] = $params['phone'];
        $user['critizen_id'] = $params['critizen_id'];
        $user['role'] = $params['role'];
        $user->save();
        return $user;
    }

    function update($user, $params) {
        foreach ($params as $key => $val) {
            if ($key == 'password') {
                $user['password'] = bcrypt($val);
            } else {
                $user[$key] = $val;
            }
        }
        $user->save();
        return $user;
    }

    function delete($user) {
        $user->delete();
        return $user;
    }
}