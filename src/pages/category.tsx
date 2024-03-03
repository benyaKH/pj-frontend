import '@mantine/core/styles.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell, Text, Stack, rem, Divider, SimpleGrid, Loader } from '@mantine/core';
import StoryCard from '../components/StoryCard';

export default function CategoryPage() {

    const params = useParams()

    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(false)

    const mainurl = 'https://pj-backend.up.railway.app/'

    const urlCategory = `${mainurl}stories/category/${params.id}`

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {

            await fetch(urlCategory, {
                method: "GET"
            })
                .then(response => response.json())
                .then(result => { setStories(result); setLoading(false) })
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])


    const items = stories.map((item) => (
        <StoryCard id={item['_id']} title={item['storyname']}
            category={item['category']} description={item['description']}
            Ep={item['episodeId']['length']} image={item['image']} isAdmin={false}></StoryCard>

    ));

    return (
        <AppShell.Main >
            <Stack py={rem(25)}>
                <Stack
                    h={300}
                    bg="var(--mantine-color-body)"
                    px={rem(100)}
                >
                    <Text size={rem(40)} fw={700}>{params.id}</Text>
                    <Divider my="md" />
                    {loading ? <Loader color="blue" size="xl" /> :
                        <SimpleGrid cols={4}>
                            {items}
                        </SimpleGrid>}
                </Stack>

            </Stack>

        </AppShell.Main >);

}