/* import {Button} from 'antd'

const Btn = props => {
  return (
    <div>
      <Button type="primary">Primary</Button>
    </div>
  )
}

export default Btn */

import { Button } from 'antd';

class Btn extends React.Component {
  state = {
    loading: false,
    iconLoading: false,
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

  render() {
    return (
      <span style={{float: 'right', padding: '25'}}>
        <br />
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading} size='large'>
          Anzeigen
        </Button>
      </span>
    );
  }
}

export default Btn
