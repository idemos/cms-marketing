<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$user = User::all();
        $user = User::customer()->orderBy('id','desc')->get();
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

        $image = request()->photo;
        $namefile = '_'.time().'.png';
        $destinationPath = public_path('images') . '/'.$namefile;
        
        if(file_put_contents($destinationPath, $image)){
            request()->photo = $namefile;
        }
        // echo 'Uploaded file';

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
    public function update(Request $request, User $user)
    {
        // $request_field = $request->except(['csrt','method']);
        $image = request()->input('photo');
        //dd($user);
        if(!empty($image))
        {
            list(,$image) = explode(',',$image);
            $namefile = '_'.time().'.jpg';
            $destinationPath = public_path('images') . '/' . $namefile;
            
            if(file_put_contents($destinationPath, base64_decode($image))){
                $request->merge(['photo' => $namefile]);

                if($user['photo']){
                    @unlink(public_path('images') . '/' . $user['photo']);
                }
                //$request_field['photo'] = $namefile;
            }
        }

        // dd($request_field);
        $user_result = User::find($user['id'])->customer()->update(request()->all());
        //dd($user);
        
        return response()->json(array(
            'success' => $user_result,
            'userId' => $user['id']),
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
