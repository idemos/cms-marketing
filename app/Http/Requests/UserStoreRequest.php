<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'phone' => 'required|numeric',
            'active' =>  'required|boolean',
            'photo' =>  'nullable|min:50',
            'doc' =>  'nullable|min:50',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email is required!',
            'phone.required' => 'phone is required!',
            'active.required' => 'active is required!'
        ];
    }
}