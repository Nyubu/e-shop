import { useRouter } from "next/router";

export const useGetIntId = () => {

    const router = useRouter();

    // If you have an id of -1, we got a bad URL parameter -> so pause the query before it goes to the server
    const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
    
    return intId;
};