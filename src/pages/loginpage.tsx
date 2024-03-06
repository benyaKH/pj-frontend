import '@mantine/core/styles.css';

import { AppShell, Box, Button, Card, rem, Stack, Text, } from '@mantine/core';
import { GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script'
import { useEffect, useState } from 'react';

import { IconBrandGoogleFilled } from '@tabler/icons-react';

export default function LoginPage() {

    const [profile, setProfile] = useState(null)
    const [name, setName] = useState(() => {
        return localStorage.getItem('username')
    })

    const clientId = "708607628638-b2883fsl4fnpomcqh7uadlr0ae36l8n6.apps.googleusercontent.com"

    // useEffect(() => {
    //     const intitClient = () => {
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ''
    //         })
    //     }
    //     gapi.load("client:auth2", intitClient)
    // }, [])

    const onSuccess = (res: any) => {
        window.location.href = '/'
        localStorage.setItem('username', res.profileObj.googleId)
        console.log('success', res)
    }

    const onFailure = (res: any) => {
        console.log('failed', res)
    }

    const onLogout = () => {
        setName(null)
        localStorage.removeItem('username')
    }

    const icon = <IconBrandGoogleFilled size={14} />;

    return (
        <AppShell.Main>
            <Stack align="center" py={rem(100)} >
                <Card shadow="sm" radius="md" withBorder >
                    <Card.Section bg="#521125">
                        <Text fw={500} px={rem(30)} py="lg" size={rem(40)} color='white'  >
                            Login page
                        </Text>
                    </Card.Section>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />

                    {/* {name ?
                        <Box py={rem(80)}>
                            <GoogleLogout
                                clientId={clientId}
                                buttonText='Log out'
                                onLogoutSuccess={onLogout}
                            />
                        </Box> :
                        <Box py={rem(50)}>
                            <GoogleLogin
                                render={renderProps => (
                                    <Button justify="center" fullWidth leftSection={icon} mt="md" variant="outline" color="#521125" onClick={renderProps.onClick}>
                                        Sign in with Google
                                    </Button>

                                )}
                                clientId={clientId}
                                buttonText='Sign in with Google'
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy='single_host_origin'
                                isSignedIn={true} />
                        </Box>} */}
                </Card>

            </Stack>
        </AppShell.Main>
    );

}