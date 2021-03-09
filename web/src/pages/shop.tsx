import { withUrqlClient } from "next-urql";
import React from 'react';
import { CategoryContextProvider } from "../components/CategoryContext";
import { Layout } from "../components/Layout";
import { ProductSection } from "../components/ProductSection";
import { Sidebar } from "../components/Sidebar";
import { createUrqlClient } from "../utils/createUrqlClient";


const Shop = () => {

    return (    
        
        <Layout>
            <CategoryContextProvider>
                <Sidebar />
                <ProductSection />    
            
            </ CategoryContextProvider>
        </Layout>
    )
}


export default withUrqlClient(createUrqlClient, {ssr: true})(Shop);
