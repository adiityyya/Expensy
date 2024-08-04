import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
export const useGetTransactions = () =>{
    //made a variable which we will export at the end of the hook.
    const [transactions, setTransactions] = useState([]);
    const [transactionsTotals,setTransactionsTotals] = useState({
         balance: 0.0,
         income: 0.0,
         expenses: 0.0,
        });

    const transactionCollectionRef = collection(db,"transactions");

    const {userID} = useGetUserInfo();

    const getTransactions = async () =>{
        //get all the transactions from the db of the user.
        //firestore's db is to be called here.
        //we can get the reference to the collection.
        let unsubscribe;
        try{
            const queryTransactions = query(transactionCollectionRef, 
            where("userID","==",userID),
            orderBy("createdAt")
            ); 

            unsubscribe = onSnapshot(queryTransactions, (snapshot)=>{
                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;

                snapshot.forEach((doc)=>{ 
                    const data = doc.data();
                    const id = doc.id

                    docs.push({...data,id});

                    if(data.transactionType==="expense"){
                        totalExpenses+=Number(data.transactionAmount);
                    }
                    else{
                        totalIncome+=Number(data.transactionAmount);
                    }
                });
                setTransactions(docs);

                let balance = totalIncome-totalExpenses;
                setTransactionsTotals({
                    balance,
                    expenses: totalExpenses,
                    income: totalIncome, 
                })
            });
        }
        catch(err){
            console.error(err);
        }
        return ()=> unsubscribe();
    };
    useEffect(()=>{
        getTransactions();
    },[])

    return {transactions,transactionsTotals};
}