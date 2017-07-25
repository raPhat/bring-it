<?php

namespace App\Http\Controllers;

use JavaScript;
use App\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\UserPatch;

class UserController extends Controller
{

    protected $userService;

    function __construct(
        UserService $userService
    )
    {
        $this->userService = $userService;
    }

    public function all()
    {
        return view('user.list');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = $this->userService->getAllUsers();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        JavaScript::put([
            'user' => [
                'username' => '',
                'email' => '',
                'password' => '',
                'first_name' => '',
                'last_name' => '',
                'birth_date' => '',
                'phone' => '',
                'critizen_id' => '',
                'role' => 'BUYER',
            ],
            'mode' => 'CREATE'
        ]);

        return view('user.view');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $params = $request->only([
                'username',
                'email',
                'password',
                'first_name',
                'last_name',
                'birth_date',
                'phone',
                'critizen_id',
                'role'
            ]);
        $new_user = $this->userService->create($params);
        return response()->json($new_user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        JavaScript::put([
            'user' => $user,
            'mode' => 'VIEW'
        ]);

        return view('user.view');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        JavaScript::put([
            'user' => $user,
            'mode' => 'EDIT'
        ]);

        return view('user.view');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user_saved = $this->userService->update($user, $request->all());
        return response()->json($user_saved);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user_removed = $this->userService->delete($user);
        return response()->json($user_removed);
    }
}
