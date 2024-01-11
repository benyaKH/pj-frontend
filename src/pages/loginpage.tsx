import '@mantine/core/styles.css';

import { AppShell, rem, Text,  } from '@mantine/core';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useEffect, useState } from 'react';

export default function LoginPage() {

    const [profile,setProfile] = useState(null)
    const [name, setName] = useState(() => {
        return localStorage.getItem('username')
    })

    const clientId = "708607628638-b2883fsl4fnpomcqh7uadlr0ae36l8n6.apps.googleusercontent.com"

    useEffect(() => {
        const intitClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
        gapi.load("client:auth2", intitClient)
    }, [])

    const onSuccess = (res: any) => {
        localStorage.setItem('username',res.profileObj.name)
        console.log('success',res)
        window.location.href = '/'
    }

    const onFailure = (res: any) => {
        console.log('failed',res)
    }

    const onLogout = () => {
        setProfile(null);
    }

    return (
        <AppShell.Main>
            <Text fw={500} py={rem(30)} size={rem(40)} color='black' >
                Login page
            </Text>
            {profile?
            <div>
                <GoogleLogout
                clientId={clientId}
                buttonText='Log out'
                onLogoutSuccess={onLogout}/>
            </div>:
            <GoogleLogin
            clientId={clientId}
            buttonText='Sign in with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy='single_host_origin'
            isSignedIn={true}/>}
        </AppShell.Main>
    );

}