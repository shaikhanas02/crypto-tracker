import React from "react";
import "./style.css" ;
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from "@mui/material";
import { convertNumbers } from "../../../functions/convertNumbers";
import { Link } from "react-router-dom";

function List({coin}){
    return (
        <Link to={`./coin/${coin?.id}`} >
    <tr className="list-row">
        <Tooltip title="Coin logo">
        <td className="td-image">
            <img src={coin.image} className="coin-logo" />
            </td></Tooltip>

            <Tooltip title="Coin Info">
            <td>
            <div className="name-col">
                <p className="coin-symbol">{coin.symbol}</p>
                <p className="coin-name">{coin.name}</p>
                </div>
                </td></Tooltip>

                <Tooltip title="Price Change IN 24Hrs ">
                {coin.price_change_percentage_24h>0 ? (
                <td className="chip-flex">
                    <div className="price-chip">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                    <div className="icon-chip td-icon"> <TrendingUpRoundedIcon /> </div>
                </td> ) : ( 
                    <td className="chip-flex">
                    <div className="price-chip chip-red ">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                    <div className="icon-chip chip-red td-icon"> <TrendingDownRoundedIcon /> </div>
                </td> )
                }</Tooltip>
                <Tooltip title="Current price">
                <td className="info-container">
                <h3 className="coin-price td-center-align " style={{color:coin.price_change_percentage_24h<0 ? "var(--red)" : "var(--green)"}}>${coin.current_price.toLocaleString()}</h3> 
                </td></Tooltip>
                <Tooltip title="Total Volume"><td>
                <p className="total_volume td-right-align td-total-volume">${coin.total_volume.toLocaleString()}</p>
                </td></Tooltip>

                <Tooltip title="Market Cap"><td className="desktop-td-mkt">
                <p className="total_volume td-right-align">${coin.market_cap.toLocaleString()}</p>
                </td></Tooltip>

                <Tooltip title="Market Cap"><td className="mobile-td-mkt">
                <p className="total_volume td-right-align">${convertNumbers(coin.market_cap)}</p>
                </td></Tooltip>

    </tr>
    </Link>
)}

export default List ;