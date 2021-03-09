import { Button, Box, Checkbox, Stack, Heading } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import React from 'react'
import { CategoryContext } from './CategoryContext'
import { useCategoriesQuery } from '../generated/graphql'
import { useRouter } from 'next/router'

interface SidebarProps {

}

class CategoryCheckBox {
    
    name: string | undefined

    isChecked: boolean = false
}


export const Sidebar: React.FC<SidebarProps> = ({}) => {

    const router = useRouter();
    
    // Get categories from database
    const [{data, error, fetching}] = useCategoriesQuery();

    if (!fetching && !data) {
        return (
          <div>
            <div>Query Failed</div>
            <div>{error?.message}</div>
          </div>
        )
      }

    // Get setter from context
    const {setCategories} = useContext(CategoryContext);
    const [categoryCheckboxes, setCategoryCheckboxes] = useState([] as CategoryCheckBox[]);

    useEffect(() => {
        
        if (router.query.name !== undefined)
            setCategories(router.query.name as string[]);

        let categoryFromURL:string = router.query.name as string;
        let categories = data!.categories

        for (let i = 0; i < categories.length; i++) {
            categoryCheckboxes.push({
                name: categories[i].name,
                isChecked: categories[i].name == categoryFromURL ? true : false
            })
        }        

    }, [])
    
    // For clicking checkboxes
    const mapCheckedItems = (index) => {

        let newCheckedItems= [...categoryCheckboxes];
        newCheckedItems[index].isChecked = !categoryCheckboxes[index].isChecked;
        setCategoryCheckboxes(newCheckedItems);
    }

    const createCheckBoxes = () => {
        let checkBoxes: any = [];                   

        for (let i = 0; i < categoryCheckboxes.length; i++) {
            checkBoxes.push(
                <Checkbox
                    isChecked={ categoryCheckboxes[i].isChecked }
                    onChange={() => mapCheckedItems(i)}
                    key={i}
                >
                    {categoryCheckboxes[i].name}
                </Checkbox>
            )            
        }
        return checkBoxes;
    }

    const handleSearch = () => {      

        const c: any = [];
        categoryCheckboxes.forEach( checkBox => {
            if (checkBox.isChecked)
                c.push(checkBox.name);
        })
        setCategories(c);
    }

    return (
        <Box mr={8}>
            <Box 
                mx="auto" 
                maxW="400px"
                w="100%"
                borderRadius={15}
                bgGradient="linear-gradient(
                    to right bottom,
                    rgba(255, 255, 255, 0.6),
                    rgba(255, 255, 255, 0.3)
                )"
                paddingY={8}
                paddingX={8}
                style={{ boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.4)"}}
            >
                <Heading  mb={2} size="md">Category</Heading>
                <Stack spacing={1}>
                    {
                        createCheckBoxes()
                    }
                </Stack>
                <Button 
                    colorScheme="teal"
                    mt={4}
                    isLoading={fetching}
                    onClick={ () => {
                        handleSearch()
                    }}
                >
                    Search
                </Button>
            </Box>
        </Box>
    )
}