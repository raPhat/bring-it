<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Shop;
use JavaScript;
use Illuminate\Support\Facades\Auth;
use App\Services\ShopService;

class ShopController extends Controller
{
    protected $shopService;

    function __construct(
        ShopService $shopService
    )
    {
        $this->shopService = $shopService;
    }

    public function all()
    {
        $token = Auth::user()->createToken('MyApp')->accessToken;

        JavaScript::put([
            'token' => $token
        ]);

        return view('shop.list');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shops = $this->shopService->getAllShops();
        return response()->json($shops);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Shop a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $params = $request->only([
                'shop_name',
                'lat',
                'lng',
                'is_approved',
                'user_id',
                'images'
            ]);
        $new_shop = $this->shopService->create($params);
        return response()->json($new_shop);
    }

    public function createWithUser(User $user)
    {
        $token = Auth::user()->createToken('MyApp')->accessToken;

        JavaScript::put([
            'user' => $user,
            'mode' => 'ADD',
            'token' => $token
        ]);

        return view('shop.view');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, User $user)
    {
        $token = Auth::user()->createToken('MyApp')->accessToken;

        JavaScript::put([
            'user' => $user,
            'mode' => 'VIEW',
            'token' => $token,
            'shop' => $this->shopService->getShopById($id)
        ]);

        return view('shop.view');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, User $user)
    {
        $token = Auth::user()->createToken('MyApp')->accessToken;

        JavaScript::put([
            'user' => $user,
            'mode' => 'EDIT',
            'token' => $token,
            'shop' => $this->shopService->getShopById($id)
        ]);

        return view('shop.view');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Shop $shop)
    {
        $shop_saved = $this->shopService->update($shop, $request->all());
        return response()->json($shop_saved);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shop $shop)
    {
        $shop_removed = $this->shopService->delete($shop);
        return response()->json($shop_removed);
    }
}
