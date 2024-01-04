import '@mantine/core/styles.css';
import { Card, Image, Text } from '@mantine/core';

export default function StoryCard(
    props: {
        id: string,
        title: string;
        category: string;
        description: string
        Ep: string;
        isAdmin: boolean ;
    }) {
        const urlherf = () => {
            if (props.isAdmin){
                return `/Dashboard/${props.id}` 
            }else return `/Story/${props.id}`
        }
            

    return (

        <Card
            shadow="sm"
            padding="xl"
            component="a"
            href={urlherf()}
            target="_blank"
            bg="#521125"
        >
            <Card.Section>
                <Image
                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    h={160}
                    alt="No way!"
                />
            </Card.Section>

            <Text fw={500} size="md" mt="md" color='white'>
                {props.title}
            </Text>

            <Text mt="xs" size="sm" color='white'>
                {props.category}
            </Text>
            <Text mt="xs" size="xs" color='white'>
                {props.Ep} episodes
            </Text>
        </Card>


    );

}