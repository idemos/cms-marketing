<?php

namespace App\Http\Controllers;

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
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'email|unique:users',
            'phone' => 'number'
        ]);

        //request()->except(['csrt','method']);
        $user = User::create(request()->except(['csrt','method']));

        return Response::json(array(
            'error' => false,
            'userId' => $user->id),
            200
        );

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
        $request_field = $request->except(['csrt','method']);
        //dd($request_field);

        $user = User::find($id)->update($request_field);
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
