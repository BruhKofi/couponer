import { Card } from 'antd';

const SmCard = (props) => {
  return (
    <Card loading title={props.title} style={ { width: 'auto' } }>
      Whatever content
    </Card>
    );
}

export default SmCard;
