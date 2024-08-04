//its a custom hook, it has a function and we are 
//exporting a function from this file.
//dealing with the db here. we have to add Transaction whenever we click on add okay.
import { addDoc,collection,serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


export const useAddTransaction = () => {
    //telling it in which db and which collection.
    const transactionCollectionRef = collection(db,"transactions");
    const {userID} = useGetUserInfo();

    
    const addTransaction = async ({description,transactionAmount,transactionType}) => {
        //tell it which collection we refer to.
        //and what type of object we want to add.
        await addDoc(transactionCollectionRef,{
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
    };

    return {addTransaction};
};