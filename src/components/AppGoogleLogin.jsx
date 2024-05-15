'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

export default function AppGoogleLogin() {
    const [data, setData] = useState({})
    useGoogleOneTapLogin({
        onError: error => console.log(error),
        onSuccess: response => {
            //console.log(response)
            setData(response)
            postUserInfo(response)
            localStorage.setItem('auth', true)
            localStorage.setItem('name', response?.given_name)
            localStorage.setItem('email', response?.email)
            localStorage.setItem('picture', response?.picture)
        },
        googleAccountConfigs: {
            client_id: "636897135906-35r9a7k6o7udpfvug12paggfcs8lstqv.apps.googleusercontent.com"
        },
    });


    const postUserInfo = async (response) => {
        await axios.post('/api/v1/auth', response)

    }

    return (
        <div></div>
    )
}
