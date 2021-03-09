import { useProductQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetProductFromUrl = () => {

    // If you have an id of -1, we got a bad URL parameter -> so pause the query before it goes to the server
    const intId = useGetIntId();
    
    return useProductQuery({
        pause: intId == -1,
        variables: {
            id: intId
        },
    })
};