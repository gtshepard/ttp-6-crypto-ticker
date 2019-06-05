import React, {Component} from 'react'
import './tickers.css'
import Cryptocurrency from './cryptocurrency.js'
import axios from 'axios'
class Tickers extends Component {

  constructor(props) {
    super(props)

    this.state = {
        data: [
          {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            price_usd: '1',
            percent_change_1h: "0",
            percent_change_24h: "0",
            percent_change_7d: "0"
          },
          {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'ETH',
            price_usd: '1',
            percent_change_1h: "0",
            percent_change_24h: "0",
            percent_change_7d: "0"
          },
          {
            id: 'litecoin',
            name: 'Litecoin',
            symbol: 'LTC',
            price_usd: '1',
            percent_change_1h: "0",
            percent_change_24h: "0",
            percent_change_7d: "0"
          }
      ]
    };
  }

  async fetchCryptoCurrenceyData(){
    try{
      let {data} = await axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10");
      let wanted = [ 'bitcoin','ethereum','litecoin' ];
      let result = data.filter(currency => wanted.includes(currency.id));
      this.setState({data: result});
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount(){
    this.fetchCryptoCurrenceyData();
    this.interval = setInterval( () => this.fetchCryptoCurrenceyData(), 60 *100);
  }

  render(){
      let tickers = this.state.data.map( (currency) =>
        <Cryptocurrency data={currency} key={currency.id}/>
      );

      return(
          <div className="tickers-contianer">
            <ul className="tickers"> {tickers}</ul>
            <p>info every minute corutesy of coinmarketcap.com</p>
          </div>
      );
  }
}
export default Tickers;
