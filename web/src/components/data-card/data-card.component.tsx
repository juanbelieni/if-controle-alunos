import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

interface Props {
  title: string | number;
  description?: string | number;
  icon: string;
}

const DataCard: React.FC<Props> = ({ title, description, icon }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Icon>{icon}</Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={description} />
    </ListItem>
  );
};

export default DataCard;
