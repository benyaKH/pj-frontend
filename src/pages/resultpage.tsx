import '@mantine/core/styles.css';



import {  AppShell, rem,  Text, Stack, Divider, SimpleGrid } from '@mantine/core';
import StoryCard from '../components/StoryCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ResultPage() {

    const params = useParams()

    const [stories, setStories] = useState([])

    const urlCategory = `http://localhost:3000/stories/search/${params.id}`

    useEffect(() => {
        const fetchData = async () => {

            await fetch(urlCategory, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => setStories(result))
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])


    const items = stories.map((item) => (
        <StoryCard id={item['_id']}title={item['storyname']} 
        category={item['category']} description={item['description']} 
        Ep={item['episodeId']['length']} isAdmin={false}></StoryCard>

    ));

    return (
        <AppShell.Main>
            <Stack py={rem(25)}>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                px={rem(100)}
            >
                <Text size={rem(40)} fw={700}>{params.id}</Text>
                <Divider my="md" />
                <SimpleGrid cols={4}>
                    {items}
                </SimpleGrid>
            </Stack>
                
            </Stack>
        </AppShell.Main>
    );

}