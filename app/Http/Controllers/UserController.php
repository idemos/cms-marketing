<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$user = User::all();
        $user = User::orderBy('id','desc')->get();
        // return response()->json('User: Successfully.');
        return $user;
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //public function store(Request $request)
    public function store(UserStoreRequest $request)
    {
        //request()->except(['csrt','method']);
        $user = User::create(request()->all());
        return response()->json($user, 201);

        //return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //$request_field = $request->except(['csrt','method']);
        //dd($request_field);

        $user = User::find($id)->update(request()->all());
        //dd($user);
        
        return response()->json(array(
            'success' => $user,
            'userId' => $id),
            200
        );
        // return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $done = User::find($id)->delete();
        //return $done;
        return response()->json('User:'.$id.' Deleted Successfully.');
    }
}
