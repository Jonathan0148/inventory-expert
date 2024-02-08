<?php

namespace App\Helpers;

use Symfony\Component\HttpFoundation\Response;

class ResponseHelper
{
    public static function NoExits($message)
    {
        return response([
            'success' => false,
            'message' => $message,
        ], Response::HTTP_BAD_REQUEST);
    }

    public static function Message($message)
    {
        return response([
            'message' => $message,
        ], Response::HTTP_ACCEPTED);
    }

    public static function Error($error, $message)
    {
        return response([
            'success' => false,
            'message' => $message,
            'error' => $error
        ], Response::HTTP_BAD_REQUEST);
    }

    public static function CreateOrUpdate($data, $message)
    {
        return response([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], Response::HTTP_CREATED);
    }

    public static function Get($data)
    {
        return response([
            'success' => true,
            'data' =>  $data
        ], Response::HTTP_OK);
    }

    
    public static function GetTwo($data, $dataTwo)
    {
        return response([
            'success' => true,
            'data' => $data,
            'dataTwo' => $dataTwo
        ], Response::HTTP_OK);
    }

    public static function Delete($message)
    {
        return response([
            'success' => true,
            'message' => $message,
        ], Response::HTTP_OK);
    }

    public static function Unauthorized($message)
    {
        return response([
            'success' => false,
            'message' => $message,
        ], Response::HTTP_UNAUTHORIZED);
    }
    
}
