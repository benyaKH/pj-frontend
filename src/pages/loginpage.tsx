import '@mantine/core/styles.css';

import { AppShell, Card, rem, Stack, Text, } from '@mantine/core';
import { GoogleLogin } from '@react-oauth/google';



export default function LoginPage() {



    // useEffect(() => {
    //     const intitClient = () => {
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ''
    //         })
    //     }
    //     gapi.load("client:auth2", intitClient)
    // }, [])


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