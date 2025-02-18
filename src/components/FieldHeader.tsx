import { Typography } from '@mui/material';
import React from 'react';

const FieldHeader = ({ title, ...rest }: { title: string }) => {
  return (
    <Typography
      color="textSecondary"
      sx={{ fontSize: `14px`, letterSpacing: '1px' }}
      variant="caption"
      {...rest}
    >
      {title}
    </Typography>
  );
};

export default React.memo(FieldHeader);
