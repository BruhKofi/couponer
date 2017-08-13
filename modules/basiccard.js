import {Card} from 'antd'

const BasicCard = props => {
  return (
    <div>
      <style jsx>
        { `
    #cardOuter {
    }
    #leftBox {
      float:left;
      width:88px;
      height: auto;
      margin-right: 13px;
      vertical-align: middle;
    }
    #rightBox {
    float: right;
    width:60%;
    height: 38px;
    max-width: calc(100% - 110px);
    overflow: hidden;
    }
    
  ` }
      </style>
      <Card bordered style={{padding: '5px 5px', width: '100%', zIndex: '20', position: 'relative', height: '100px'}}>
        <div id="cardOuter">
          <div id="leftBox"><img src="http://static-1.gutscheine.de/images/albelli-logo-1-60312.png?v=1" alt="logo"/></div>
          <div id="rightBox">
            <b>{props.title}</b>
            <p>{props.description}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BasicCard
