import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { coinObject } from '../functions/convertObject';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import { convertDate } from '../functions/convertDate';
import PriceToggle from '../components/Coin/PriceToggle';

function CoinPage() {
  const {id} = useParams() ;
  const [loading , setLoading] = useState(true) ;
  const [coinData, setCoinData] = useState() ;
  const [days, setDays] = useState(30) ;
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices") ;


  useEffect(()=>{
    if(id){
    getData() ;
    }
  }, [id]) ;
  
  async function getData(){
    const data = await getCoinData(id) ;
    if(data){
      coinObject(setCoinData, data)
      const prices = await getCoinPrices(id, days , priceType ) ;
      if(prices.length > 0){ 
      settingChartData(setChartData, prices) ;
      setLoading(false) ;

    }
  }
}

const handleDaysChange = async (event) =>{
  setLoading(true) ;
  setDays(event.target.value) ;
  const prices = await getCoinPrices(id, event.target.value, priceType) ;
      if(prices.length > 0){ 
        settingChartData(setChartData, prices) ;
        setLoading(false) ;
      
      }
}; 
const handlePriceTypeChange = async (event, newType) =>{
  setLoading(true) ;
  setPriceType(newType) ;
  const prices = await getCoinPrices(id, days, newType);
  if (prices) {
    settingChartData(setChartData, prices);
  setLoading(false);

  }
};

  return (
    <div>
      <Header />
      {loading ? (
       <Loader /> 
      ) : (
        <>
        <div className='grey-wrapper' style={{padding:"0rem 1rem"}}>
          <List coin={coinData}  />
        </ div>
      <div className='grey-wrapper'>
      <SelectDays days={days} handleDaysChange={handleDaysChange} />
      <PriceToggle priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
        <LineChart chartData={chartData} priceType={priceType}/>
      </div>
        <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}

        </div>
  ) 
}

export default CoinPage ;