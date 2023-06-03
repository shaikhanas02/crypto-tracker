import React, { useEffect, useState } from "react";
import LabTabs from "../components/Dashboard/Tabs";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";


function DashboardPage() {

const [coins,setCoins] = useState([]) ;
const [paginatedCoins,setPaginatedCoins] = useState([]) ;
const [search, setSearch]  = useState("") ;
const [page, setpage] = useState(1) ;
const [loading, setLoading] = useState(true) ;
const handlePageChange = (event, value) =>{
    setpage(value) ;
    var previousIndex = (value -1) *10 ;
    setPaginatedCoins(coins.slice(previousIndex,previousIndex+10)) ;
}

const onSearchChange =(e)=>{ 
    setSearch(e.target.value);
} ;
var filteredCoins = coins.filter((item)=> 
item.name.toLowerCase().includes(search.toLowerCase()) ||
item.symbol.toLowerCase().includes(search.toLowerCase()))  ;

useEffect(() => {
  getData() ;
}, []) ;

const getData = async () =>{
  const myCoins = await get100Coins() ;
  if(myCoins){
    setCoins(myCoins) ;
    setPaginatedCoins(myCoins.slice(0,10)) ;
    setLoading(false) ;
  }

}
    return (
        <>
        <Header />
        <BackToTop />
       {loading ? (
        <Loader />
       ) : (
        <div> 
        
        <Search search={search} onSearchChange={onSearchChange}/>
        <TabsComponent
        coins={search ? filteredCoins : paginatedCoins}
       
      />
      {!search && (
        <PaginationComponent
          page={page}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
       ) } 
       </>
    ) ;
      }


export default DashboardPage ;